import {
  bookingColumnsDto,
  bookingtableRowsDto,
} from "@/data/dto/bookingRequests.dto";
import { useNavigate } from "react-router-dom";

interface BookingTableProps {
  columns: bookingColumnsDto[];
  rows: bookingtableRowsDto[];
}

export function BookingTable(props: BookingTableProps) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              {props.columns?.map((l) => (
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
            {props.rows?.length ? (
              props.rows.map((l) => (
                <tr
                  onClick={() => {
                    navigate(`./bookingdetails?bookingId=${l.id}`);
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
