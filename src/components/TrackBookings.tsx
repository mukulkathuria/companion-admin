import { useState } from 'react';
    import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
    import 'leaflet/dist/leaflet.css';
    import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
    import { Badge } from './ui/badge';

    interface Booking {
      id: number;
      username: string;
      companionName: string;
      bookingDate: string;
      bookingTime: string;
      status: 'Completed' | 'Failed';
      userImage: string;
      companionImage: string;
      companionId: string;
      purpose: string;
      location: string;
      canceledBy?: 'User' | 'Companion';
      cancellationTime?: string;
      cancellationReason?: string;
      transactionId?: string;
      amountPaid: number;
      extensionDuration?: number;
      userReview?: string;
      companionReview?: string;
      rejectionReason?: string;
    }

    const dummyBookings: Booking[] = [
      {
        id: 1,
        username: 'John Doe',
        companionName: 'Sarah Wilson',
        bookingDate: '2024-03-20',
        bookingTime: '19:00',
        status: 'Completed',
        userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        companionImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        companionId: 'COMP001',
        purpose: 'Dinner Date',
        location: 'The Taj Mahal Palace',
        transactionId: 'TXN123456',
        amountPaid: 5000,
        userReview: 'Great company, very professional',
        companionReview: 'Respectful and punctual client',
      },
      {
        id: 2,
        username: 'Alice Smith',
        companionName: 'James Brown',
        bookingDate: '2024-03-21',
        bookingTime: '10:00',
        status: 'Failed',
        userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        companionImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        companionId: 'COMP002',
        purpose: 'City Tour',
        location: 'India Gate',
        canceledBy: 'Companion',
        cancellationTime: '2024-03-20T20:00:00',
        cancellationReason: 'Emergency medical appointment',
        transactionId: 'TXN123457',
        amountPaid: 3000,
      },
    ];

    const areaCoordinates: { [area: string]: [number, number] } = {
      'The Taj Mahal Palace': [18.9220, 72.8347],
      'India Gate': [28.6129, 77.2295],
    };

    export function TrackBookings() {
      const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

      return (
        <div className="space-y-8 p-6">
          {selectedBooking ? (
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full mx-auto">
              <button
                onClick={() => setSelectedBooking(null)}
                className="mb-6 px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700"
              >
                ← Back to List
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* User Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">User Details</CardTitle>
                    <CardDescription className="text-gray-500">Information about the user</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <img
                        src={selectedBooking.userImage}
                        alt={selectedBooking.username}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{selectedBooking.username}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Companion Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Companion Details</CardTitle>
                    <CardDescription className="text-gray-500">Information about the companion</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <img
                        src={selectedBooking.companionImage}
                        alt={selectedBooking.companionName}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{selectedBooking.companionName}</p>
                        <p className="text-sm text-gray-500">ID: {selectedBooking.companionId}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Details */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Booking Details</CardTitle>
                  <CardDescription className="text-gray-500">Information about the booking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Booking Date</label>
                      <p className="font-medium text-gray-900">{selectedBooking.bookingDate}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Booking Time</label>
                      <p className="font-medium text-gray-900">{selectedBooking.bookingTime}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Purpose</label>
                      <p className="font-medium text-gray-900">{selectedBooking.purpose}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Location</label>
                      <p className="font-medium text-gray-900">{selectedBooking.location}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Status</label>
                      <Badge variant={selectedBooking.status === 'Completed' ? 'secondary' : 'destructive'}>
                        {selectedBooking.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Transaction Details */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900">Transaction Details</CardTitle>
                  <CardDescription className="text-gray-500">Information about the transaction</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Transaction ID</label>
                      <p className="font-medium text-gray-900">{selectedBooking.transactionId}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-500">Amount Paid</label>
                      <p className="font-medium text-gray-900">₹{selectedBooking.amountPaid.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cancellation Details */}
              {selectedBooking.canceledBy && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Cancellation Details</CardTitle>
                    <CardDescription className="text-gray-500">Information about the cancellation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-500">Canceled By</label>
                        <p className="font-medium text-gray-900">{selectedBooking.canceledBy}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Cancellation Time</label>
                        <p className="font-medium text-gray-900">{selectedBooking.cancellationTime}</p>
                      </div>
                    </div>
                    {selectedBooking.cancellationReason && (
                      <div>
                        <label className="text-sm text-gray-500">Reason</label>
                        <p className="font-medium text-gray-900">{selectedBooking.cancellationReason}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Reviews */}
              {(selectedBooking.userReview || selectedBooking.companionReview) && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Reviews</CardTitle>
                    <CardDescription className="text-gray-500">User and companion reviews</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedBooking.userReview && (
                      <div>
                        <p className="font-medium text-gray-700">User Review:</p>
                        <p className="text-gray-900">{selectedBooking.userReview}</p>
                      </div>
                    )}
                    {selectedBooking.companionReview && (
                      <div>
                        <p className="font-medium text-gray-700">Companion Review:</p>
                        <p className="text-gray-900">{selectedBooking.companionReview}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
              {selectedBooking.location && areaCoordinates[selectedBooking.location] && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900">Meetup Location</CardTitle>
                    {selectedBooking.location}
                    <CardDescription className="text-gray-500">Location of the meetup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MapContainer
                      center={areaCoordinates[selectedBooking.location]}
                      zoom={15}
                      style={{ height: '300px', width: '100%', borderRadius: '0.5rem' }}
                      scrollWheelZoom={false}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={areaCoordinates[selectedBooking.location]}>
                        <Popup>{selectedBooking.location}</Popup>
                      </Marker>
                    </MapContainer>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Track Bookings</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Companion
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dummyBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          onClick={() => setSelectedBooking(booking)}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={booking.userImage}
                                alt={booking.username}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={booking.companionImage}
                                alt={booking.companionName}
                                className="h-10 w-10 rounded-full object-cover"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {booking.companionName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.bookingDate}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.bookingTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === 'Completed'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {booking.status}
                            </span>
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
