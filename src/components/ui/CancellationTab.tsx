/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-as-const */
import { memo, useEffect, useState } from "react";
import { cancellationTableColumns } from "@/data/dummy";
import { BookingTable } from "./BookingTable";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { bookingtableRowsDto } from "@/data/dto/bookingRequests.dto";

const CancellationTab = () => {
  const [activetab, setactiveTab] = useState<"user" | "companion">("user");
  const [bookinglist, setBookingList] = useState<{
    userData: bookingtableRowsDto[];
    companionData: bookingtableRowsDto[];
  }>({ userData: [], companionData: [] });

  const tabs = [
    { id: "user" as "user", label: "User" },
    { id: "companion" as "companion", label: "Companion" },
  ];

  useEffect(() => {
    import("@/services/booking/bookinglist.service")
      .then(
        ({
          getCompanionCancellationBookinglistService,
          getUserCancellationBookinglistService,
        }) =>
          Promise.all([
            getUserCancellationBookinglistService(),
            getCompanionCancellationBookinglistService(),
          ])
      )
      .then((res) => {
        if (res[0].data && res[1].data) {
          const userData = res[0].data.map((l: any) => ({
            id: l.id,
            name: l.User.filter((p: any) => !p.isCompanion)[0].firstname,
            gender: l.User.filter((p: any) => !p.isCompanion)[0].gender,
            bookingTime: formatBookingTimingsforUi(l.bookingstart),
          }));
          const companionData = res[1].data.map((l: any) => ({
            id: l.id,
            name: l.User.filter((p: any) => p.isCompanion)[0].firstname,
            gender: l.User.filter((p: any) => p.isCompanion)[0].gender,
            bookingTime: formatBookingTimingsforUi(l.bookingstart),
          }));
          setBookingList({ userData, companionData });
        }
      });
  }, []);

//   const dummyRows = dummySlotRequests.map((l) => ({
//     id: l.id,
//     name: l.username,
//     gender: l.gender,
//     bookingTime: l.bookingTime,
//   }));

  return (
    <div>
      <div className="flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setactiveTab(tab.id);
            }}
            className={`py-2 px-4 border-b-2 text-sm font-medium ${
              tab.id === activetab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activetab === "user" ? (
        <BookingTable columns={cancellationTableColumns} rows={bookinglist.userData} />
      ) : (
        <BookingTable columns={cancellationTableColumns} rows={bookinglist.companionData} />
      )}
    </div>
  );
};

export default memo(CancellationTab, () => false);
