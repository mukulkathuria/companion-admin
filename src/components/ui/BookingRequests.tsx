import { dummySlotRequests, requestTableColumns } from "@/data/dummy";
import { BookingTable } from "./BookingTable";

export function BookingRequests() {
  const dummyRows = dummySlotRequests.map((l) => ({
    id: l.id,
    name: l.username,
    location: l.area,
    gender: l.gender,
  }));
  return <BookingTable columns={requestTableColumns} rows={dummyRows} />;
}
