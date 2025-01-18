import { useState, useEffect } from 'react';
    import { dummySlotRequests, dummyExtensionRequests, dummyCancellationRequests, dummyCompanionCancellations } from '../data/dummy';
    import { useNavigate, useLocation, useParams } from 'react-router-dom';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
    import { Button } from './ui/button';
    import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
    import 'leaflet/dist/leaflet.css';
    import { Avatar } from './ui/avatar';

    // Define types
    type RequestTab = 'slots' | 'extensions' | 'cancellations';
    type CancellationTab = 'user-cancellations' | 'companion-cancellations';
    type RequestType = 'slot' | 'extension' | 'user-cancellation' | 'companion-cancellation';

    interface Request {
      id: number;
      username?: string;
      companionName?: string;
      email?: string;
      location?: string;
      gender?: string;
      age?: number;
      purpose?: string;
      area?: string;
      bookingTime: string;
      meetupLocation?: string;
      extensionDuration?: number;
      cancellationType?: 'user' | 'companion';
      cancellationTime?: string;
      type?: string;
      reason?: string;
      clientName?: string;
    }

    // Define coordinates for areas
    const areaCoordinates: { [area: string]: [number, number] } = {
      'Bandra': [19.05, 72.83],
      'Connaught Place': [28.63, 77.22],
      'Nungambakkam': [13.06, 80.25],
      'Park Street': [22.54, 88.35],
      'Indiranagar': [12.97, 77.64],
      'Jubilee Hills': [17.42, 78.40],
    };

    export function Requests() {
      const [activeTab, setActiveTab] = useState<RequestTab>('slots');
      const [activeCancellationTab, setActiveCancellationTab] = useState<CancellationTab>('user-cancellations');
      const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
      const [requestType, setRequestType] = useState<RequestType>('slot');
      const navigate = useNavigate();
      const location = useLocation();
      const { requestId } = useParams<{ requestId: string }>();

      useEffect(() => {
        if (requestId) {
          const allRequests = [
            ...dummySlotRequests,
            ...dummyExtensionRequests,
            ...dummyCancellationRequests,
            ...dummyCompanionCancellations,
          ];
          const foundRequest = allRequests.find((req) => String(req.id) === requestId);
          if (foundRequest) {
            setSelectedRequest(foundRequest);
            if (dummySlotRequests.find((req) => String(req.id) === requestId)) {
              setActiveTab('slots');
              setRequestType('slot');
            } else if (dummyExtensionRequests.find((req) => String(req.id) === requestId)) {
              setActiveTab('extensions');
              setRequestType('extension');
            } else if (dummyCancellationRequests.find((req) => String(req.id) === requestId)) {
              setActiveTab('cancellations');
              setActiveCancellationTab('user-cancellations');
              setRequestType('user-cancellation');
            } else if (dummyCompanionCancellations.find((req) => String(req.id) === requestId)) {
              setActiveTab('cancellations');
              setActiveCancellationTab('companion-cancellations');
              setRequestType('companion-cancellation');
            }
          }
        }
      }, [requestId]);

      const renderDetailCard = () => {
        if (!selectedRequest) return null;

        const handleBack = () => {
          setSelectedRequest(null);
          navigate(location.pathname.split('/').slice(0, -1).join('/'));
        };

        const coordinates = selectedRequest.area ? areaCoordinates[selectedRequest.area] : null;

        switch (requestType) {
          case 'slot':
            return (
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full mx-auto">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl font-bold text-gray-900">Slot Request Details</CardTitle>
                    </div>
                    <CardDescription className="text-gray-500">Details for the selected slot request</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-6 mb-4">
                      <Avatar className="h-20 w-20" />
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-gray-900">{selectedRequest.username}</p>
                        <p className="text-sm text-gray-500">Email: {selectedRequest.email}</p>
                        <div className="flex gap-2">
                          <p className="text-sm text-gray-500">Gender: {selectedRequest.gender}</p>
                          <p className="text-sm text-gray-500">Age: {selectedRequest.age}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Companion Name</label>
                        <p className="text-gray-900">{selectedRequest.companionName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Purpose</label>
                        <p className="text-gray-900">{selectedRequest.purpose}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Area</label>
                        <p className="text-gray-900">{selectedRequest.area}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Booking Time</label>
                        <p className="text-gray-900">{new Date(selectedRequest.bookingTime).toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Meetup Location</label>
                        <p className="text-gray-900">{selectedRequest.meetupLocation}</p>
                      </div>
                    </div>
                    {coordinates && (
                      <MapContainer
                        center={coordinates}
                        zoom={13}
                        style={{ height: '300px', width: '100%', marginTop: '1rem', borderRadius: '0.5rem' }}
                        scrollWheelZoom={false}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={coordinates}>
                          <Popup>{selectedRequest.meetupLocation}</Popup>
                        </Marker>
                      </MapContainer>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-4">
                    <Button onClick={handleBack} variant="destructive" className="bg-red-600 hover:bg-red-700">
                      Reject
                    </Button>
                    <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
                      Accept
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );

          case 'extension':
            return (
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full mx-auto">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl font-bold text-gray-900">Extension Request Details</CardTitle>
                    </div>
                    <CardDescription className="text-gray-500">Details for the selected extension request</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-6 mb-4">
                      <Avatar className="h-20 w-20" />
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-gray-900">{selectedRequest.username}</p>
                        <p className="text-sm text-gray-500">Email: {selectedRequest.email}</p>
                        <div className="flex gap-2">
                          <p className="text-sm text-gray-500">Gender: {selectedRequest.gender}</p>
                          <p className="text-sm text-gray-500">Age: {selectedRequest.age}</p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Companion Name</label>
                        <p className="text-gray-900">{selectedRequest.companionName}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Area</label>
                        <p className="text-gray-900">{selectedRequest.area}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Booking Time</label>
                        <p className="text-gray-900">{new Date(selectedRequest.bookingTime).toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Meetup Location</label>
                        <p className="text-gray-900">{selectedRequest.meetupLocation}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 font-medium">Extension Duration</label>
                        <p className="text-gray-900">{selectedRequest.extensionDuration} hours</p>
                      </div>
                    </div>
                    {coordinates && (
                      <MapContainer
                        center={coordinates}
                        zoom={13}
                        style={{ height: '300px', width: '100%', marginTop: '1rem', borderRadius: '0.5rem' }}
                        scrollWheelZoom={false}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={coordinates}>
                          <Popup>{selectedRequest.meetupLocation}</Popup>
                        </Marker>
                      </MapContainer>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-4">
                    <Button onClick={handleBack} variant="destructive" className="bg-red-600 hover:bg-red-700">
                      Reject
                    </Button>
                    <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
                      Accept
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );

          case 'user-cancellation':
            return (
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-auto">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl font-bold text-gray-900">User Cancellation Details</CardTitle>
                    </div>
                    <CardDescription className="text-gray-500">Details for the selected user cancellation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-6 mb-4">
                      <Avatar className="h-20 w-20" />
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-gray-900">{selectedRequest.username}</p>
                        <p className="text-sm text-gray-500">Gender: {selectedRequest.gender}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Cancellation Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">Cancellation Time</label>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedRequest.cancellationTime || '').toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Booking Time</label>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedRequest.bookingTime).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Cancellation Type</label>
                        <p className="font-medium text-gray-900">{selectedRequest.type}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-4">
                    <Button onClick={handleBack} variant="destructive" className="bg-red-600 hover:bg-red-700">
                      Reject
                    </Button>
                    <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
                      Accept
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );

          case 'companion-cancellation':
            return (
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full mx-auto">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl font-bold text-gray-900">Companion Cancellation Details</CardTitle>
                    </div>
                    <CardDescription className="text-gray-500">Details for the selected companion cancellation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start gap-6 mb-4">
                      <Avatar className="h-20 w-20" />
                      <div className="space-y-1">
                        <p className="text-lg font-semibold text-gray-900">{selectedRequest.companionName}</p>
                        <p className="text-sm text-gray-500">Client: {selectedRequest.clientName}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900">Cancellation Information</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">Cancellation Time</label>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedRequest.cancellationTime || '').toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Booking Time</label>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedRequest.bookingTime).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Cancellation Reason</label>
                        <p className="font-medium text-gray-900">{selectedRequest.reason}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-4">
                    <Button onClick={handleBack} variant="destructive" className="bg-red-600 hover:bg-red-700">
                      Reject
                    </Button>
                    <Button onClick={handleBack} className="bg-blue-600 hover:bg-blue-700">
                      Accept
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
        }
      };

      const getRequestsForTab = (): Request[] => {
        switch (activeTab) {
          case 'slots':
            return dummySlotRequests;
          case 'extensions':
            return dummyExtensionRequests;
          case 'cancellations':
            switch (activeCancellationTab) {
              case 'user-cancellations':
                return dummyCancellationRequests;
              case 'companion-cancellations':
                return dummyCompanionCancellations;
              default:
                return [];
            }
          default:
            return [];
        }
      };

      const handleRequestClick = (request: Request) => {
        setSelectedRequest(request);
        switch (activeTab) {
          case 'slots':
            setRequestType('slot');
            break;
          case 'extensions':
            setRequestType('extension');
            break;
          case 'cancellations':
            if (activeCancellationTab === 'user-cancellations') {
              setRequestType('user-cancellation');
            } else {
              setRequestType('companion-cancellation');
            }
            break;
        }
      };

      const tabs = [
        { id: 'slots' as const, label: 'Slots' },
        { id: 'extensions' as const, label: 'Extensions' },
        { id: 'cancellations' as const, label: 'Cancellations' },
      ];

      const cancellationTabs = [
        { id: 'user-cancellations' as const, label: 'User Cancellations' },
        { id: 'companion-cancellations' as const, label: 'Companion Cancellations' },
      ];

      return (
        <div className="space-y-8 p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-4 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedRequest(null);
                }}
                className={`py-2 px-4 border-b-2 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'cancellations' && (
            <div className="flex space-x-4 border-b border-gray-200">
              {cancellationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveCancellationTab(tab.id);
                    setSelectedRequest(null);
                  }}
                  className={`py-2 px-4 border-b-2 text-sm font-medium ${
                    activeCancellationTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          {selectedRequest ? (
            <div className="flex flex-col h-full">
              {renderDetailCard()}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {activeTab.includes('companion') ? 'Companion' : 'User'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getRequestsForTab().map((request) => (
                      <tr
                        key={request.id}
                        onClick={() => handleRequestClick(request)}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {request.username || request.companionName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {request.location || request.area}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.gender}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      );
    }
