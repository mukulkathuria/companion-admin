import { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useLocation } from 'react-router-dom';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandItem } from './ui/command';
import { useToast } from '@/hooks/use-toast';
import { SearchIcon, Paperclip, Image, User, FileText } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import image from '../asset/featureimage.jpg';
import pdf from '../asset/Typhoid.pdf';

interface Ticket {
  id: string;
  topic: string;
  status: 'Pending' | 'Resolved' | 'Denied';
  messages: {
    time: string;
    message: string;
    sender: 'user' | 'companion';
    attachments?: string[];
  }[];
  subject: string;
  description: string;
  attachments: string[];
}

const dummyTickets: Ticket[] = [
  {
    id: 'TKT-1001',
    topic: 'Login Issue',
    status: 'Pending',
    subject: 'User unable to log in',
    description: 'When I enter credentials, it redirects to an error page.',
    attachments: [image, pdf],
    messages: [
      {
        time: '10:00 AM',
        message: 'I am having trouble with my booking.',
        sender: 'user',
        attachments: [image, pdf],
      },
      {
        time: '10:05 AM',
        message: 'We are looking into it.',
        sender: 'companion',
      },
    ],
  },
  {
    id: 'TKT-1002',
    topic: 'UI Bug in Dashboard',
    status: 'Resolved',
    subject: 'Misalignment of buttons',
    description: 'Buttons overlap when viewed on mobile.',
    attachments: [image],
    messages: [
      {
        time: '11:00 AM',
        message: 'My payment is not going through.',
        sender: 'user',
      },
      {
        time: '11:10 AM',
        message: 'Please try again.',
        sender: 'companion',
      },
    ],
  },
  {
    id: 'TKT-1003',
    topic: 'Payment Issue',
    status: 'Denied',
    subject: 'Payment not processed',
    description: 'The payment was not processed due to insufficient funds.',
    attachments: [],
    messages: [
      {
        time: '12:00 PM',
        message: 'My payment failed.',
        sender: 'user',
      },
      {
        time: '12:10 PM',
        message: 'Your payment was denied due to insufficient funds.',
        sender: 'companion',
      },
    ],
  },
];

export function Tickets() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State for full-screen image
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    if (location.pathname === '/tickets') {
      setSelectedTicket(null);
    }
  }, [location.pathname]);

  const filteredTickets = dummyTickets.filter((ticket) =>
    String(ticket.id).includes(searchQuery)
  );

  const pendingTickets = filteredTickets.filter(ticket => ticket.status === 'Pending');

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleStatusChange = (ticket: Ticket, status: 'Pending' | 'Resolved' | 'Denied') => {
    setSelectedTicket({
      ...ticket,
      status: status,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyMessage(e.target.value);
  };

  const handleReplySubmit = () => {
    if (!selectedTicket || (!replyMessage && attachments.length === 0)) return;

    const newMessage = {
      time: new Date().toLocaleTimeString(),
      message: replyMessage,
      sender: 'companion' as const,
      attachments: attachments.map(file => file.name),
    };

    setSelectedTicket({
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessage],
    });

    setReplyMessage('');
    setAttachments([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB limit

    const validFiles = files.filter(file => {
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: 'Invalid File Type',
          description: 'Only PNG, JPEG images, and PDF files are allowed.',
        });
        return false;
      }
      if (file.size > maxSize) {
        toast({
          title: 'File Too Large',
          description: 'Files must be less than 5MB.',
        });
        return false;
      }
      return true;
    });

    setAttachments(validFiles);
  };

  const renderAttachmentPreview = (attachment: string | File) => {
    const fileType = typeof attachment === 'string' ? attachment.split('.').pop()?.toLowerCase() : attachment.name.split('.').pop()?.toLowerCase();

    const handleDownload = () => {
      const url = typeof attachment === 'string' ? attachment : URL.createObjectURL(attachment);
      const link = document.createElement('a');
      link.href = url;
      link.download = typeof attachment === 'string' ? attachment.split('/').pop() || 'file' : attachment.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handleImageClick = () => {
      const src = typeof attachment === 'string' ? attachment : URL.createObjectURL(attachment);
      setSelectedImage(src); // Set the selected image for full-screen view
    };

    if (['png', 'jpeg', 'jpg'].includes(fileType || '')) {
      const src = typeof attachment === 'string' ? attachment : URL.createObjectURL(attachment);
      return (
        <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <img
            src={src}
            alt={typeof attachment === 'string' ? attachment : attachment.name}
            className="h-32 w-32 object-cover rounded-lg border border-gray-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
            <Image className="h-32 w-32 text-white opacity-0 group-hover:opacity-100" />
          </div>
        </div>
      );
    } else if (fileType === 'pdf') {
      return (
        <div className="relative group cursor-pointer" onClick={handleDownload}>
          <div className="h-32 w-32 rounded-lg border border-gray-200 flex items-center justify-center">
            <FileText className="h-32 w-32 text-gray-500" />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity rounded-lg flex items-center justify-center">
            <FileText className="h-32 w-32 text-white opacity-0 group-hover:opacity-100" />
          </div>
        </div>
      );
    }
    return null;
  };

  const handleSearchTicket = (value: string) => {
    const foundTicket = dummyTickets.find((ticket) => ticket.id === value);
    if (foundTicket) {
      handleViewTicket(foundTicket);
      setOpen(false);
    } else {
      toast({
        title: 'Error',
        description: 'Sorry, this is not a valid Ticket ID',
      });
    }
  };

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'S') {
      event.preventDefault();
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="space-y-6 p-6">
      {/* Full-screen image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // Close modal on click outside
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedImage}
              alt="Full-screen attachment"
              className="max-w-full max-h-full"
            />
            <button
              className="absolute top-0 right-0 bg-white rounded-full p-2 hover:bg-red-500"
              onClick={() => setSelectedImage(null)} // Close modal on button click
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Rest of the component */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <CommandInput
            placeholder="Search Ticket ID"
            className="text-lg placeholder:text-gray-400 text-gray-900 border-none focus:ring-0 p-4 w-full"
          />
          <CommandList className="border-t border-gray-200 max-h-96 overflow-y-auto">
            <CommandEmpty className="text-gray-500 p-4">No results found.</CommandEmpty>
            {dummyTickets.map((ticket) => (
              <CommandItem
                key={ticket.id}
                value={String(ticket.id)}
                onSelect={handleSearchTicket}
                className="text-gray-900 hover:bg-gray-100 p-4 cursor-pointer flex items-center"
              >
                <SearchIcon className="mr-2 h-4 w-4 text-gray-500" />
                {ticket.id}
              </CommandItem>
            ))}
          </CommandList>
        </div>
      </CommandDialog>

      {selectedTicket ? (
        <Card className="bg-white rounded-lg shadow-lg">
          <CardHeader className="border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedTicket(null)}
                  className="p-2 bg-blue-300 hover:bg-green-300"
                >
                  ←
                </Button>
                <div>
                  <CardTitle className="text-2xl font-semibold">
                    Ticket #{selectedTicket.id}
                  </CardTitle>
                  <CardDescription>{selectedTicket.topic}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">User Name</span>
                  </div>
                  <span className="text-sm text-gray-500">user@example.com</span>
                </div>
                <Badge variant={selectedTicket.status === 'Pending' ? 'outline' : selectedTicket.status === 'Resolved' ? 'secondary' : 'destructive'}>
                  {selectedTicket.status}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    className='bg-red-600'
                    size="sm"
                    variant="destructive"
                    onClick={() => handleStatusChange(selectedTicket, 'Denied')}
                  >
                    Deny
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleStatusChange(selectedTicket, 'Resolved')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Resolve
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Subject</h3>
                  <p className="text-gray-700">{selectedTicket.subject}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-gray-700">{selectedTicket.description}</p>
                </div>
                {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-2">Attachments</h3>
                    <div className="flex gap-4 flex-wrap">
                      {selectedTicket.attachments.map((attachment, index) => (
                        <div key={index}>
                          {renderAttachmentPreview(attachment)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <ScrollArea className="h-96 rounded-md border p-4">
                <div className="space-y-4">
                  {selectedTicket.messages.map((message, index) => (
                    <div key={index} className={`flex ${message.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`flex flex-col max-w-[70%] ${message.sender === 'user' ? 'items-start' : 'items-end'}`}>
                        <span className="text-xs text-gray-500 mb-1">{message.time}</span>
                        <div className={`rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-blue-600 text-white'
                        }`}>
                          {message.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex items-center gap-4">
                <Textarea
                  placeholder="Reply to user..."
                  value={replyMessage}
                  onChange={handleReplyChange}
                  className="flex-1"
                  rows={3}
                />
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/png,image/jpeg,image/jpg,application/pdf"
                    />
                    <Paperclip className="h-5 w-5 text-gray-500" />
                  </label>
                  <Button onClick={handleReplySubmit} className="bg-blue-600 hover:bg-blue-700">
                    Send
                  </Button>
                </div>
              </div>
              {attachments.length > 0 && (
                <div className="flex gap-4 flex-wrap">
                  {attachments.map((file, index) => (
                    <div key={index}>
                      {renderAttachmentPreview(file)}
                      <span className="text-sm text-gray-500 mt-1 block text-center">
                        {file.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="bg-white rounded-xl shadow">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-8">Tickets</h2>
            <div className="flex justify-end mb-6">
              <Input
                type="text"
                placeholder="Search Ticket Number"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-64"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ticket No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Topic
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Check
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pendingTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      onClick={() => handleViewTicket(ticket)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {ticket.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ticket.topic}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={ticket.status === 'Pending' ? 'outline' : ticket.status === 'Resolved' ? 'secondary' : 'destructive'}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Button onClick={() => handleViewTicket(ticket)} variant="outline">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}