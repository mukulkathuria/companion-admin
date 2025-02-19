/* eslint-disable @typescript-eslint/no-explicit-any */
import { dummySlotRequests, requestTableColumns } from "@/data/dummy";
import { BookingTable } from "./BookingTable";
import { bookingtableRowsDto } from "@/data/dto/bookingRequests.dto";
import { useEffect, useState } from "react";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";

export function ExtentionRequest() {
  const [bookindata, setBookingData] = useState<bookingtableRowsDto[]>([]);
  useEffect(() => {
    import("../../services/requests/bookingrequest.service")
      .then(({ getBookingRequestsService }) => getBookingRequestsService())
      .then((res) => {
        if (res?.data) {
          const values = res.data?.map((l: any) => ({
            location: l.Meetinglocation[0].city,
            id: l.id,
            name: l.User.filter((p: any) => !p.isCompanion)[0].firstname,
            gender: l.User.filter((p: any) => !p.isCompanion)[0].gender,
            bookingTime: formatBookingTimingsforUi(l.bookingstart),
          }));
          setBookingData(values);
        }
      });
  }, []);
  const dummyRows = dummySlotRequests.map((l) => ({
    id: l.id,
    name: l.username,
    location: l.area,
    gender: l.gender,
    bookingTime: l.bookingTime,
  }));
  return (
    <BookingTable
      columns={requestTableColumns}
      rows={bookindata || dummyRows}
    />
  );
}
