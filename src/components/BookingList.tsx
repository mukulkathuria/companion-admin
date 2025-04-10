/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewPagination from "./ui/NewPaginationUI";

export function BookingList() {
  const [bookingdata, setBookingData] = useState<any>(null);
  const navigate = useNavigate();
  useEffect(() => {
    import("../services/booking/bookinglist.service")
      .then(({ getBookinglistService }) => getBookinglistService())
      .then((res) => {
        if (res?.data) {
          const values = res.data.bookings?.map((l: any) => ({
            userdetails: l.User.filter((p: any) => !p.isCompanion)[0],
            companiondetails: l.User.filter((p: any) => p.isCompanion)[0],
            bookingTime: formatBookingTimingsforUi(l.bookingstart),
            status: l.bookingstatus,
            id: l.id,
          }));
          setBookingData({ ...res.data, bookings: values });
        }
      });
  }, []);
  if (!bookingdata) return <div>Loading..</div>;

  const onPageChange = async (pageNo: number) => {
    const values = {
      pageNo
    };
    const { getBookinglistService } = await import(
      '@/services/booking/bookinglist.service'
    );
    const { data } = await getBookinglistService(values);
    if (data) {
      if (data) {
        const values = data.bookings?.map((l: any) => ({
          userdetails: l.User.filter((p: any) => !p.isCompanion)[0],
          companiondetails: l.User.filter((p: any) => p.isCompanion)[0],
          bookingTime: formatBookingTimingsforUi(l.bookingstart),
          status: l.bookingstatus,
          id: l.id,
        }));
        setBookingData({ ...data, bookings: values });
    }
  }}

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Track Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Companion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!bookingdata ? (
                <tr>Loading...</tr>
              ) : bookingdata.bookings.length ? (
                bookingdata.bookings.map((booking: any, i: number) => (
                  <tr
                    key={i * 300}
                    onClick={() =>
                      navigate(`/track/bookingdetails/?bookingId=${booking.id}`)
                    }
                    className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={booking.userdetails.Images[0]}
                          alt={"user profile pic"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.userdetails.firstname}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={booking.companiondetails.Images[0]}
                          alt={"companion profile pic"}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {booking.companiondetails.firstname}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.bookingTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>No Bookings till now</tr>
              )}
            </tbody>
          </table>
          <NewPagination
            currentPage={bookingdata.currentPage}
            totalPage={bookingdata.totalPages}
            onPageChange={(l) => onPageChange(l)}
          />
        </div>
      </div>
    </div>
  );
}
