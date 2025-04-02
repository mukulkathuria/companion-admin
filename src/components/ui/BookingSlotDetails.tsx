/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Button } from "./button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { bookingDetailsDto } from "../shared/dto/booking.dto";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { BASEURL } from "@/Constants/services.constants";
import { toast } from "sonner";

export function BookingSlotDetails() {
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] =
    useState<bookingDetailsDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    if (bookingId) {
      import("../../services/requests/bookingrequest.service")
        .then(({ getBookingDetailsService }) =>
          getBookingDetailsService(bookingId)
        )
        .then(({ data }) => {
          if (data) {
            const values = {
              user: data.User.filter((l: any) => !l.isCompanion)[0],
              companion: data.User.filter((l: any) => l.isCompanion)[0],
              bookingpurpose: data?.bookingpurpose || "Any",
              city: data.Meetinglocation[0].city,
              lat: data.Meetinglocation[0].lat,
              lng: data.Meetinglocation[0].lng,
              bookingtime: formatBookingTimingsforUi(data.bookingstart),
            };
            setBookingDetails(values);
          }
        });
    }
  }, [searchParams]);

  const handleAccept = async (status: "Accept" | "Reject") => {
    try {
      const { acceptBookingService, rejectBookingService } = await import(
        "../../services/requests/bookingrequest.service"
      );
      const bookingId = searchParams.get("bookingId");
      if (bookingId) {
        const { data } =
          status === "Accept"
            ? await acceptBookingService(bookingId)
            : await rejectBookingService(bookingId);
        if (data) {
          if (status === "Accept") {
            toast.success("Booking is accepted now congratulation");
          } else {
            toast.success("Booking has been rejected");
          }
          navigate(-1);
        } else {
          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!bookingDetails) return <div>Loading....</div>;
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full mx-auto">
      <button
        onClick={() => {
          navigate("/requests");
        }}
      >
        Back
      </button>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Slot Request Details
            </CardTitle>
          </div>
          <CardDescription className="text-gray-500">
            Details for the selected slot request
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-6 mb-4">
            <img
              src={
                bookingDetails.user.Images &&
                 bookingDetails.user.Images[0]
              }
              alt="Profile"
              style={{ height: "100px", width: "135px" }}
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-900">User</p>
              <p className="text-sm text-gray-500">
                Name: {bookingDetails.user.firstname}{" "}
              </p>
              <div className="flex gap-2">
                <p className="text-sm text-gray-500">
                  Gender: {bookingDetails.user.gender}
                </p>
                <p className="text-sm text-gray-500">
                  Age: {bookingDetails.user.age}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 font-medium">
                Companion Name
              </label>
              <p className="text-gray-900">
                {bookingDetails.companion.firstname}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500 font-medium">
                Purpose
              </label>
              <p className="text-gray-900">{bookingDetails.bookingpurpose}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 font-medium">Area</label>
              <p className="text-gray-900">{bookingDetails.city}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 font-medium">
                Booking Time
              </label>
              <p className="text-gray-900">{bookingDetails.bookingtime}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500 font-medium">
                Meetup Location
              </label>
              <p className="text-gray-900">{bookingDetails.city}</p>
            </div>
          </div>
          {
            <MapContainer
              center={[bookingDetails.lat, bookingDetails.lng]}
              zoom={16}
              style={{
                height: "300px",
                width: "100%",
                marginTop: "1rem",
                borderRadius: "0.5rem",
              }}
              scrollWheelZoom={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[bookingDetails.lat, bookingDetails.lng]}>
                <Popup>{bookingDetails.city}</Popup>
              </Marker>
            </MapContainer>
          }
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            onClick={() => handleAccept("Reject")}
          >
            Reject
          </Button>
          <Button
            onClick={() => handleAccept("Accept")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Accept
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
