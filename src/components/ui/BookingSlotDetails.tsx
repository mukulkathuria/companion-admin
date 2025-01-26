import { Avatar } from "@radix-ui/react-avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Button } from "./button";

export function BookingSlotDetails(){
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
                  <p className="text-lg font-semibold text-gray-900">Username</p>
                  <p className="text-sm text-gray-500">Email: Email</p>
                  <div className="flex gap-2">
                    <p className="text-sm text-gray-500">Gender: gender</p>
                    <p className="text-sm text-gray-500">Age: Age</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 font-medium">Companion Name</label>
                  <p className="text-gray-900">Companion Name</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium">Purpose</label>
                  <p className="text-gray-900">Purpose</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium">Area</label>
                  <p className="text-gray-900">Area</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium">Booking Time</label>
                  <p className="text-gray-900">Booking time</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500 font-medium">Meetup Location</label>
                  <p className="text-gray-900">Mumbai</p>
                </div>
              </div>
              {(
                <MapContainer
                  center={ [17.42, 78.40]}
                  zoom={13}
                  style={{ height: '300px', width: '100%', marginTop: '1rem', borderRadius: '0.5rem' }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={ [17.42, 78.40]}>
                    <Popup>Mumbai</Popup>
                  </Marker>
                </MapContainer>
              )}
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                Reject
              </Button>
              <Button  className="bg-blue-600 hover:bg-blue-700">
                Accept
              </Button>
            </CardFooter>
          </Card>
        </div>
      )
}