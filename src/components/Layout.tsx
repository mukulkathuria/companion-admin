import { Bell, LogOut, Menu, User, List, PlusSquare, RotateCw, Calendar, Ticket, BarChart, MoreVertical , Trash } from 'lucide-react';
import type { Tab } from '../App';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import image from '../asset/featureimage.jpg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { dummySlotRequests, dummyExtensionRequests, dummyCompanionCancellations, dummyUpdateRequests } from '../data/dummy';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

interface Notification {
  id: number;
  type: 'slot' | 'extension' | 'companionCancellation' | 'userCancellation' | 'booking' | 'ticket' | 'updateCompanion';
  message: string;
  time: string;
  requestId?: number;
  ticketId?: string;
  purpose?: string;
  extensionDuration?: number;
  cancellationReason?: string;
  updateId?: number;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const bellRef = useRef<HTMLButtonElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync activeTab with the current URL path
  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'requests';
    onTabChange(path as Tab);
  }, [location.pathname, onTabChange]);

  // Load notifications
  useEffect(() => {
    const newNotifications: Notification[] = [];

    dummySlotRequests.forEach(request => {
      newNotifications.push({
        id: request.id,
        type: 'slot',
        message: `New slot request from ${request.username}`,
        time: new Date().toLocaleTimeString(),
        requestId: request.id,
        purpose: request.purpose,
      });
    });

    dummyExtensionRequests.forEach(request => {
      newNotifications.push({
        id: request.id,
        type: 'extension',
        message: `New extension request from ${request.username}`,
        time: new Date().toLocaleTimeString(),
        requestId: request.id,
        extensionDuration: request.extensionDuration,
      });
    });

    dummyCompanionCancellations.forEach(request => {
      newNotifications.push({
        id: request.id,
        type: 'companionCancellation',
        message: `Cancellation request from ${request.companionName}`,
        time: new Date().toLocaleTimeString(),
        requestId: request.id,
        cancellationReason: request.reason,
      });
    });

    dummyUpdateRequests.forEach(request => {
      newNotifications.push({
        id: request.id,
        type: 'updateCompanion',
        message: `Update request from ${request.oldProfile.firstName}`,
        time: new Date().toLocaleTimeString(),
        updateId: request.id,
      });
    });

    setNotifications(newNotifications);
  }, []);

  const tabs = [
    { id: 'requests' as const, label: 'Requests', icon: List },
    { id: 'create' as const, label: 'Create Companion', icon: PlusSquare },
    { id: 'update' as const, label: 'Update Companion', icon: RotateCw },
    { id: 'track' as const, label: 'Track Bookings', icon: Calendar },
    { id: 'tickets' as const, label: 'Tickets', icon: Ticket },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart },
  ];

  // Handle tab change
  const handleTabChange = (tab: Tab) => {
    onTabChange(tab);
    navigate(`/${tab}`);
  };

  // Handle notification actions
  const handleNotificationAction = (notification: Notification, action: 'approve' | 'reject' | 'forward' | 'delete') => {
    setNotifications(prev => prev.filter(n => n.id !== notification.id));
    if (action === 'forward' && notification.type === 'updateCompanion' && notification.updateId) {
      navigate(`/update/${notification.updateId}`);
    } else {
      toast({
        title: 'Notification Action',
        description: `Request ${notification.id} ${action}ed`,
      });
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-white shadow-lg transition-all duration-300 ease-in-out border-r border-gray-200`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`text-xl font-bold ${
              !isSidebarOpen && 'hidden'
            } text-primary`}
          >
            Zesty Amigos
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`w-full p-4 text-left hover:bg-gray-100 transition-colors ${
                activeTab === tab.id ? 'bg-gray-100 font-semibold text-primary' : 'text-gray-700'
              } ${!isSidebarOpen ? 'justify-center' : ''} flex items-center gap-2`}
            >
              {isSidebarOpen && <tab.icon className="h-4 w-4" />}
              <span className={!isSidebarOpen ? 'hidden' : ''}>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>
            <div className="flex items-center space-x-4">
              <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <button ref={bellRef} className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Bell className="w-6 h-6 text-gray-700" />
                    {notifications.length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-96 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
                  <ScrollArea className="max-h-[400px] overflow-y-auto">
                    <div className="flex flex-col">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className="flex flex-col p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage
                                    // src={`https://source.unsplash.com/random/100x100/?portrait&${notification.id}`}
                                    src={image}
                                  />
                                  <AvatarFallback>
                                    {notification.message[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-semibold text-gray-900">{notification.message}</p>
                                  <p className="text-xs text-gray-400">{notification.time}</p>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                                    <MoreVertical className="w-4 h-4 text-gray-500" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48 bg-white border border-gray-100 shadow-lg rounded-lg">
                                  <DropdownMenuItem
                                    className="text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleNotificationAction(notification, 'delete')}
                                  >
                                    <Trash className="w-4 h-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {/* Additional details based on notification type */}
                            {notification.type === 'slot' && notification.purpose && (
                              <p className="text-xs text-gray-500 mt-1">Purpose: {notification.purpose}</p>
                            )}
                            {notification.type === 'extension' && notification.extensionDuration && (
                              <p className="text-xs text-gray-500 mt-1">Extension: {notification.extensionDuration} hours</p>
                            )}
                            {notification.type === 'companionCancellation' && notification.cancellationReason && (
                              <p className="text-xs text-gray-500 mt-1">Reason: {notification.cancellationReason}</p>
                            )}

                            {/* Action buttons */}
                            {(notification.type === 'slot' || notification.type === 'extension' || notification.type === 'companionCancellation') && (
                              <div className="flex justify-end space-x-2 mt-3">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() => handleNotificationAction(notification, 'reject')}
                                >
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-blue-500 hover:bg-blue-600 text-white"
                                  onClick={() => handleNotificationAction(notification, 'approve')}
                                >
                                  Approve
                                </Button>
                              </div>
                            )}

                            {notification.type === 'updateCompanion' && notification.updateId && (
                              <div className="flex justify-end space-x-2 mt-3">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  className="bg-red-500 hover:bg-red-600 text-white"
                                  onClick={() => handleNotificationAction(notification, 'reject')}
                                >
                                  Reject
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-blue-500 hover:bg-blue-600 text-white"
                                  onClick={() => handleNotificationAction(notification, 'approve')}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600 text-white"
                                  onClick={() => handleNotificationAction(notification, 'forward')}
                                >
                                  Forward
                                </Button>
                              </div>
                            )}
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <DropdownMenuItem disabled className="text-sm text-gray-400 p-4">
                          No new notifications
                        </DropdownMenuItem>
                      )}
                    </div>
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <LogOut className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}