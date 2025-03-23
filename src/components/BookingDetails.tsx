/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { BASEURL } from "@/Constants/services.constants";
import "leaflet/dist/leaflet.css";
import { BookingStatusData } from "@/data/dto/bookingRequests.dto";
import { Button } from "./ui/button";

export function BookingDetails() {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const [isApiCalling, setApiCalling] = useState<boolean>(false);

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    if (bookingId) {
      import("../services/requests/bookingrequest.service")
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
              transactions: data.Transactions,
              status: data.bookingstatus,
              totalamount: data.finalRate,
              ...data,
              rating: data.rating.length
                ? {
                    ratee: data.rating[0].ratee,
                    rater: data.rating[0].rater,
                  }
                : null,
            };
            setBookingDetails(values);
          }
        });
    }
  }, [searchParams]);

  const handleStatusChanged = async () => {
    const bookingId = searchParams.get("bookingId");
    if (bookingId && bookingDetails.changedStatus) {
      setApiCalling(() => true);
      const { updateBookingStatusService } = await import(
        "@/services/booking/bookinglist.service"
      );
      const {
        toast: { success, error },
      } = await import("sonner");
      const values = {
        bookingid: Number(bookingId),
        status: bookingDetails.changedStatus,
      };
      const { data, error: statuserror } = await updateBookingStatusService(
        values
      );
      if (data) {
        success("Successfully Updated the status");
        setBookingDetails((l: any) => ({ ...l, status: values.status }));
      } else {
        error(statuserror);
      }
      setApiCalling(() => false);
    }
  };
  if (!bookingDetails) return <div>Loading...</div>;
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 text-sm bg-gray-100 rounded-md hover:bg-gray-200 text-gray-700"
      >
        ← Back to List
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              User Details
            </CardTitle>
            <CardDescription className="text-gray-500">
              Information about the user
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <img
                src={BASEURL + "/" + bookingDetails.user.Images[0]}
                alt={"user profile pic"}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <p className="font-medium text-gray-900">
                  {bookingDetails.user.firstname}
                </p>
                <p className="font-medium text-gray-900">
                  {bookingDetails.user.gender}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Companion Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Companion Details
            </CardTitle>
            <CardDescription className="text-gray-500">
              Information about the companion
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <img
                src={BASEURL + "/" + bookingDetails.companion.Images[0]}
                alt={"companion profile pic"}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div className="ml-4">
                <p className="font-medium text-gray-900">
                  {bookingDetails.companion.firstname}
                </p>
                <p className="text-sm text-gray-500">
                  {bookingDetails.companion.gender}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Booking Details */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Booking Details
          </CardTitle>
          <CardDescription className="text-gray-500">
            Information about the booking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Booking Date</label>
              <p className="font-medium text-gray-900">
                {bookingDetails.bookingtime}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Booking Time</label>
              <p className="font-medium text-gray-900">
                {bookingDetails.bookingtime}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Purpose</label>
              <p className="font-medium text-gray-900">
                {bookingDetails.bookingpurpose}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Location</label>
              <p className="font-medium text-gray-900">{bookingDetails.city}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <Badge
                variant={
                  bookingDetails.status === "COMPLETED"
                    ? "secondary"
                    : "destructive"
                }
              >
                {bookingDetails.status}
              </Badge>
            </div>

            <div>
              <label className="text-sm text-gray-500">Booking status</label>
              <select
                name="bookingstatus"
                value={bookingDetails.changedStatus || bookingDetails.status}
                onChange={(e) => {
                  setBookingDetails((l: typeof bookingDetails) => ({
                    ...l,
                    changedStatus: e.target.value,
                  }));
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 p-2"
              >
                {BookingStatusData.map((l, i) => (
                  <option value={l} key={i * 200}>
                    {l}
                  </option>
                ))}
              </select>
              {bookingDetails.changedStatus && (
                <Button onClick={handleStatusChanged} disabled={isApiCalling}>
                  Update Status
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Details */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Transaction Details
          </CardTitle>
          <CardDescription className="text-gray-500">
            Information about the transaction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">
                No of Transactions
              </label>
              <p className="font-medium text-gray-900">
                {bookingDetails.transactions.length}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Amount Paid</label>
              <p className="font-medium text-gray-900">
                ₹{bookingDetails.totalamount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Details */}
      {bookingDetails.cancellationDetails && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Cancellation Details
            </CardTitle>
            <CardDescription className="text-gray-500">
              Information about the cancellation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Canceled By</label>
                <p className="font-medium text-gray-900">
                  {bookingDetails.cancellationDetails.firstname}
                </p>
              </div>
              <p className="font-medium text-gray-900">
                Companion:{" "}
                {String(bookingDetails.cancellationDetails.isCompanion)}
              </p>
              <div>
                <label className="text-sm text-gray-500">
                  Cancellation Time
                </label>
                <p className="font-medium text-gray-900">Cancelation Time</p>
              </div>
            </div>
            {bookingDetails.cancelledReason && (
              <div>
                <label className="text-sm text-gray-500">Reason</label>
                <p className="font-medium text-gray-900">
                  {bookingDetails.cancelledReason}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reviews */}
      {bookingDetails?.rating && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Reviews
            </CardTitle>
            <CardDescription className="text-gray-500">
              User and companion reviews
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingDetails.rating.rater && (
              <div>
                <p className="font-medium text-gray-700">Rater Review:</p>
                <p className="text-gray-900">"Rater Review"</p>
              </div>
            )}
            {bookingDetails.rating?.ratee && (
              <div>
                <p className="font-medium text-gray-700">Ratee Review:</p>
                <p className="text-gray-900">"Ratee Review"</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      {bookingDetails.city && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Meetup Location
            </CardTitle>
            {bookingDetails.city}
            <CardDescription className="text-gray-500">
              Location of the meetup
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
