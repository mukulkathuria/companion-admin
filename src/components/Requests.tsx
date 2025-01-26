import { Route, Routes } from "react-router-dom";
import { BookingRequests } from "./ui/BookingRequests";
import { useEffect } from "react";

export function Requests() {
  useEffect(() => {
    import("../services/requests/bookingrequest.service")
      .then(({ getBookingRequestsService }) => getBookingRequestsService())
      .then((res) => {
        if (res?.data) {
          console.log(res.data);
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
        <Route path="/" element={<BookingRequests />} />
      </Routes>
    </div>
  );
}
