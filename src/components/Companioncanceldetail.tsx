/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { bookingDetailsDto } from "./shared/dto/booking.dto";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { BASEURL } from "@/Constants/services.constants";

const CompanionCancelDetails = () => {
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] =
    useState<bookingDetailsDto | null>(null);

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    if (bookingId) {
      import("@/services/requests/bookingrequest.service")
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
              cancelledReason: data.cancelledReason
            };
            setBookingDetails(values);
          }
        });
    }
  }, [searchParams]);

  if (!bookingDetails) {
    return <div>Loading..</div>;
  }

  return (
    <div className="becompanion-box">
      <div className="gap-3">
        <img
          src={
            bookingDetails.companion.Images &&
            BASEURL + "/" + bookingDetails.companion.Images[0]
          }
          alt="profile"
        />
        <h1 className="my-3">Companion name: {bookingDetails.companion.firstname}</h1>
      </div>

      <h1 className="font-bold my-3">User detail</h1>
      <div className="flex justify-between">
        <h1>
          User name: <span>{bookingDetails.user.firstname}</span>
        </h1>
        <h1>
          Age: <span>{bookingDetails.user.age}</span>
        </h1>
        <h1>
          Gender: <span>{bookingDetails.user.gender}</span>
        </h1>
        <h1>
          bookingid: <span>12345xyz</span>
        </h1>
        <h1>
          userid: <span>12345bdgdg</span>
        </h1>
      </div>
      <h1 className="font-bold my-3">Booking detail</h1>
      <div className="flex justify-between">
        <h1>
          Booking time: <span>{bookingDetails.bookingtime}</span>
        </h1>
      </div>
      <div>
        <h1 className="font-bold mt-4">
          Reason of cancelation by companion :{" "}
          <span className="font-normal">
           {bookingDetails.cancelledReason}
          </span>
        </h1>
      </div>
      <div className="flex justify-end gap-4">
        <button className="bg-green-600">Approve</button>
        <button className="bg-red-500">reject</button>
      </div>
      <div></div>
    </div>
  );
};

export default CompanionCancelDetails;
