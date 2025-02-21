/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASEURL } from "@/Constants/services.constants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UpdateCompanionRequest() {
  const navigate = useNavigate();
    const[requestdata, setRequestData] = useState<any>(null);

  useEffect(() => {
    import("../services/requests/updatecompanion.service")
      .then(({ getUpdateCompanionrequestService }) =>
        getUpdateCompanionrequestService()
      )
      .then((res) => {
        if (res?.data) {
          setRequestData(res.data);
        }
      });
  }, []);

  if (!requestdata) return <div>Loading..</div>;

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Update Companion Request
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
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
              {requestdata.length ? requestdata.map((request: any, i: number) => (
                <tr
                  key={i * 300}
                  onClick={() =>
                    navigate(`/update/request?id=${request.id}`)
                  }
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={BASEURL + "/" + request.Images[0]}
                        alt={"user profile pic"}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.firstname}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">"Feb 20 12:00"</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              )): <tr><td colSpan={3} className="text-center">No data found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
