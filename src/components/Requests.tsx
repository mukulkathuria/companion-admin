/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route, Routes } from "react-router-dom";
import { BookingRequests } from "./ui/BookingRequests";
import { useEffect, useState } from "react";
import { bookingtableRowsDto } from "@/data/dto/bookingRequests.dto";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { BookingSlotDetails } from "./ui/BookingSlotDetails";

export function Requests() {
  const [bookindata, setBookingData] = useState<bookingtableRowsDto[]>([])

  useEffect(() => {
      import("../services/requests/bookingrequest.service")
        .then(({ getBookingRequestsService }) => getBookingRequestsService())
        .then((res) => {
          if (res?.data) {
            const values = res.data?.map((l: any) => ({
              location: l.Meetinglocation[0].city,
              id: l.id,
              name: l.User.filter((p: any) => !p.isCompanion)[0].firstname,
              gender: l.User.filter((p: any) => !p.isCompanion)[0].gender,
              bookingTime: formatBookingTimingsforUi(l.bookingstart)
            }))
            setBookingData(values)
          }
        });
  }, []);

  const tabs = [
    { id: "slots" as const, label: "Slots" },
    { id: "extensions" as const, label: "Extensions" },
    { id: "cancellations" as const, label: "Cancellations" },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {}}
            className={`py-2 px-4 border-b-2 text-sm font-medium ${
              tab.id === "slots"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Routes>
        <Route path="/bookingdetails" element={<BookingSlotDetails />} />
        <Route path="/" element={<BookingRequests data={bookindata}/>} />
      </Routes>
    </div>
  );
}
