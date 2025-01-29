import { dummySlotRequests, requestTableColumns } from "@/data/dummy";
import { BookingTable } from "./BookingTable";
import { bookingtableRowsDto } from "@/data/dto/bookingRequests.dto";

interface BookingRequestProps{
  data: bookingtableRowsDto[]
}

export function BookingRequests(props: BookingRequestProps) {
  const dummyRows = dummySlotRequests.map((l) => ({
    id: l.id,
    name: l.username,
    location: l.area,
    gender: l.gender,
    bookingTime: l.bookingTime
  }));
  return <BookingTable columns={requestTableColumns} rows={props.data || dummyRows} />;
}
