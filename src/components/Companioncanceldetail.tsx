/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { bookingDetailsDto } from "./shared/dto/booking.dto";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { statusUpdateInputDto } from "@/data/dto/companion.data.dto";
import { toast } from "sonner";

const CompanionCancelDetails = () => {
  const [searchParams] = useSearchParams();
  const [bookingDetails, setBookingDetails] =
    useState<bookingDetailsDto | null>(null);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");
    if (bookingId) {
      import("@/services/requests/bookingrequest.service")
        .then(({ getBookingDetailsService }) =>
          getBookingDetailsService(bookingId)
        )
        .then(({ data }) => {
          if (data) {
            console.log("companion cancel data in page:", data);

            const values = {
              user: data.User.filter((l: any) => !l.isCompanion)[0],
              companion: data.User.filter((l: any) => l.isCompanion)[0],
              bookingpurpose: data?.bookingpurpose || "Any",
              city: data.Meetinglocation[0].city,
              lat: data.Meetinglocation[0].lat,
              lng: data.Meetinglocation[0].lng,
              bookingtime: formatBookingTimingsforUi(data.bookingstart),
              cancelledReason: data.bookingpurpose,
              cancellationDetails: data.cancellationDetails,
            };
            setBookingDetails(values);
          }
        });
    }
  }, [searchParams]);

  const updateCancellationStatus = async (status: string) => {
    const bookingId = searchParams.get("bookingId");
    if (bookingId) {
      const data: statusUpdateInputDto = {
        id: bookingId,
      };
      if (status === "Approve") {
        data["approve"] = true;
      } else {
        data["reject"] = true;
      }
      setisLoading(() => true);
      const { updateCompanionCancellationStatusService } = await import(
        "@/services/companion/updatecompanion.service"
      );
      const { data: statusdata, error } =
        await updateCompanionCancellationStatusService(data);
      if (statusdata) {
        toast.success("Sucessfully update the status");
        navigate(-1);
      } else {
        toast.error(error);
      }
      setisLoading(() => false);
    }
  };

  if (!bookingDetails) {
    return <div>Loading..</div>;
  }

  return (
    <div className="becompanion-box">
      <div className="gap-3">
        <img
          src={
            bookingDetails.companion.Images &&
            bookingDetails.companion.Images[0]
          }
          alt="profile"
        />
        <h1 className="my-3">
          Companion name: {bookingDetails.companion.firstname}
        </h1>
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
      </div>
      <h1 className="font-bold my-3">Booking detail</h1>
      <div className="flex justify-between">
        <h1>
          Booking time: <span>{bookingDetails.bookingtime}</span>
        </h1>
      </div>
      <h1>Cancellation Details</h1>
      <div>
        <h2>Cancelled By: </h2>
        <span>{bookingDetails.cancellationDetails?.firstname}</span>
        <div>
          Is Cancelled By Companion:{" "}
          {String(bookingDetails.cancellationDetails?.isCompanion)}
        </div>
      </div>
      {bookingDetails.cancelledReason ? (
        <>
          <div>
            <h1 className="font-bold mt-4">
              Reason of cancelation by companion :{" "}
              <span className="font-normal">
                {bookingDetails.cancelledReason}
              </span>
            </h1>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-green-600"
              onClick={() => updateCancellationStatus("Approve")}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "Approve"}
            </button>
            <button
              className="bg-red-500"
              onClick={() => updateCancellationStatus("Reject")}
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : "reject"}
            </button>
          </div>
        </>
      ) : null}
      <div></div>
    </div>
  );
};

export default CompanionCancelDetails;
