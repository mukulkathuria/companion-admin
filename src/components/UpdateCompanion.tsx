import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { dummyUpdateRequests } from '../data/dummy';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandItem } from './ui/command';
import { SearchIcon } from 'lucide-react';
import { CompanionForm } from './CompanionForm';

interface Companion {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'Male' | 'Female' | 'OTHER';
  skinTone: 'Fair' | 'Brown' | 'Dark';
  bodyType: string;
  eatingHabits: string;
  smokingHabit: string;
  drinkingHabit: string;
  location: string;
  email: string;
  bookingRate: number;
  description: string[]; // Updated to string array
  password?: string;
  height: number;
}

interface UpdateRequest {
  id: number;
  companionId: number;
  oldProfile: Companion;
  newProfile: Partial<Companion>;
  status: 'pending' | 'approved' | 'rejected';
}

export function UpdateCompanion() {
  const [selectedRequest, setSelectedRequest] = useState<UpdateRequest | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { requestId } = useParams<{ requestId: string }>();
  const [open, setOpen] = useState(false);
  const [filteredRequests, setFilteredRequests] = useState<UpdateRequest[]>(dummyUpdateRequests);
  const [selectedCompanion, setSelectedCompanion] = useState<Companion | null>(null);

  useEffect(() => {
    if (requestId) {
      const foundRequest = dummyUpdateRequests.find((req) => String(req.id) === requestId);
      if (foundRequest) {
        setSelectedRequest(foundRequest);
      }
    }
  }, [requestId]);

  const handleApprove = (request: UpdateRequest) => {
    setSelectedRequest({ ...request, status: 'approved' });
    toast({
      title: 'Approved',
      description: `Update request for ${request.oldProfile.firstName} approved`,
    });
  };

  const handleReject = (request: UpdateRequest) => {
    setSelectedRequest({ ...request, status: 'rejected' });
    toast({
      title: 'Rejected',
      description: `Update request for ${request.oldProfile.firstName} rejected`,
    });
  };

  const handleDelete = (companionId: number) => {
    // Implement delete logic here
    toast({
      title: 'Deleted',
      description: `Companion with ID ${companionId} deleted`,
    });
  };

  const handleBack = () => {
    setSelectedRequest(null);
    setSelectedCompanion(null);
    navigate(location.pathname.split('/').slice(0, -1).join('/'));
  };

  const handleSearchCompanion = (value: string) => {
    const searchTerm = value.toLowerCase();
    const filtered = dummyUpdateRequests.filter((request) => {
      const idMatch = String(request.id).includes(value);
      const nameMatch =
        request.oldProfile.firstName.toLowerCase().includes(searchTerm) ||
        request.oldProfile.lastName.toLowerCase().includes(searchTerm);
      return idMatch || nameMatch;
    });
    setFilteredRequests(filtered);
    setSelectedRequest(null);
    setOpen(false);
  };

  const handleSelectCompanion = (companion: Companion) => {
    setSelectedCompanion(companion);
    setSelectedRequest(null);
    setOpen(false);
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
<CommandDialog open={open} onOpenChange={setOpen}>
  {/* Dialog content with a clean, modern design */}
  <div className="bg-white rounded-lg shadow-xl overflow-hidden">
    <CommandInput 
      placeholder="Search Request ID or Companion Name" 
      className="text-lg placeholder:text-gray-400 text-gray-900 border-none focus:ring-0 p-4 w-full" 
    />
    <CommandList className="border-t border-gray-200 max-h-96 overflow-y-auto">
      <CommandEmpty className="text-gray-500 p-4">No results found.</CommandEmpty>
      {filteredRequests.map((request) => (
        <CommandItem
          key={request.id}
          value={String(request.id)}
          onSelect={handleSearchCompanion}
          className="text-gray-900 hover:bg-gray-100 p-4 cursor-pointer flex items-center"
        >
          <SearchIcon className="mr-2 h-4 w-4 text-gray-500" />
          {request.id} - {request.oldProfile.firstName} {request.oldProfile.lastName}
        </CommandItem>
      ))}
      {dummyUpdateRequests.map((request) => (
        <CommandItem
          key={request.oldProfile.id}
          value={String(request.oldProfile.id)}
          onSelect={() => handleSelectCompanion(request.oldProfile)}
          className="text-gray-900 hover:bg-gray-100 p-4 cursor-pointer flex items-center"
        >
          <SearchIcon className="mr-2 h-4 w-4 text-gray-500" />
          {request.oldProfile.firstName} {request.oldProfile.lastName}
        </CommandItem>
      ))}
    </CommandList>
  </div>
</CommandDialog>
      {selectedRequest ? (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-9xl w-full mx-auto">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Update Request Details</h3>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">Original Profile</CardTitle>
                <CardDescription className="text-gray-500">Current profile data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Avatar />
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{selectedRequest.oldProfile.firstName} {selectedRequest.oldProfile.lastName}</p>
                    <p className="text-sm text-gray-500">{selectedRequest.oldProfile.email}</p>
                  </div>
                </div>
                <p><strong className="text-gray-700">Location:</strong> {selectedRequest.oldProfile.location}</p>
                <p><strong className="text-gray-700">Booking Rate:</strong> {selectedRequest.oldProfile.bookingRate}</p>
                <p><strong className="text-gray-700">Description:</strong> {selectedRequest.oldProfile.description.join(', ')}</p> {/* Updated */}
                <p><strong className="text-gray-700">Age:</strong> {selectedRequest.oldProfile.age}</p>
                <p><strong className="text-gray-700">Gender:</strong> {selectedRequest.oldProfile.gender}</p>
                <p><strong className="text-gray-700">Skin Tone:</strong> {selectedRequest.oldProfile.skinTone}</p>
                <p><strong className="text-gray-700">Body Type:</strong> {selectedRequest.oldProfile.bodyType}</p>
                <p><strong className="text-gray-700">Eating Habits:</strong> {selectedRequest.oldProfile.eatingHabits}</p>
                <p><strong className="text-gray-700">Smoking Habit:</strong> {selectedRequest.oldProfile.smokingHabit}</p>
                <p><strong className="text-gray-700">Drinking Habit:</strong> {selectedRequest.oldProfile.drinkingHabit}</p>
                <p><strong className="text-gray-700">Height:</strong> {selectedRequest.oldProfile.height}</p>
              </CardContent>
            </Card>
            <div className="flex-1">
              <CompanionForm
                initialForm={selectedRequest.oldProfile}
                buttonText="Update Companion"
              />
            </div>
          </div>
          <CardFooter className="flex justify-between items-center mt-6">
            <Button onClick={handleBack} variant="outline" className="border-gray-300 hover:bg-gray-50">
              Back
            </Button>
            <div className="flex space-x-4">
              <Button onClick={() => handleDelete(selectedRequest.oldProfile.id)} variant="destructive" className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>
              <Button onClick={() => handleReject(selectedRequest)} variant="destructive" className="bg-red-600 hover:bg-red-700">
                Reject
              </Button>
              <Button onClick={() => handleApprove(selectedRequest)} className="bg-blue-600 hover:bg-blue-700">
                Approve
              </Button>
            </div>
          </CardFooter>
        </div>
      ) : selectedCompanion ? (
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-6xl w-full mx-auto">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Update Companion Details</h3>
          </div>
          <CompanionForm
            initialForm={selectedCompanion}
            buttonText="Update Companion"
          />
          <CardFooter className="flex justify-between items-center mt-6">
            <Button onClick={handleBack} variant="outline" className="border-gray-300 hover:bg-gray-50">
              Back
            </Button>
            <div className="flex space-x-4">
              <Button onClick={() => handleDelete(selectedCompanion.id)} variant="destructive" className="bg-red-600 hover:bg-red-700">
                Delete
              </Button>
            </div>
          </CardFooter>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Update Requests</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Companion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Changes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      onClick={() => {
                        setSelectedRequest(request);
                        navigate(`/update/${request.id}`);
                      }}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Avatar />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {request.oldProfile.firstName} {request.oldProfile.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {Object.keys(request.newProfile).join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {request.status}
                        </div>
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