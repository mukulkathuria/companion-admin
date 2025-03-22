/* eslint-disable @typescript-eslint/no-explicit-any */
import { bookingtableRowsDto } from "@/data/dto/bookingRequests.dto";
import { useEffect, useState } from "react";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { useNavigate } from "react-router-dom";
import { ExtensionTableColumns } from "@/data/dummy";

export function ExtentionRequest() {
  const [bookindata, setBookingData] = useState<
    (bookingtableRowsDto & { updatedAt: string })[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    import("../../services/booking/bookinglist.service")
      .then(({ getExtensionBookinglistService }) =>
        getExtensionBookinglistService()
      )
      .then((res) => {
        if (res?.data) {
          const values = res.data?.map((l: any) => ({
            location: l.Meetinglocation[0].city,
            id: l.id,
            name: l.User.filter((p: any) => !p.isCompanion)[0].firstname,
            gender: l.User.filter((p: any) => !p.isCompanion)[0].gender,
            bookingTime: formatBookingTimingsforUi(l.bookingstart),
            updatedAt: l.updatedAt,
          }));
          setBookingData(values);
        }
      });
  }, []);

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {ExtensionTableColumns?.map((l) => (
                <th
                  key={l.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {l.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookindata?.length ? (
              bookindata.map((l) => (
                <tr
                  onClick={() => {
                    navigate(`/track/bookingdetails?bookingId=${l.id}`);
                  }}
                  className="hover:bg-gray-50 cursor-pointer"
                  key={l.id}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {l.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  {l.location && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{l.location}</div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{l.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{l.bookingTime}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{l.updatedAt}</div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Records Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
