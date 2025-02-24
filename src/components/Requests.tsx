import { Route, Routes, useNavigate } from "react-router-dom";
import { BookingRequests } from "./ui/BookingRequests";
import { BookingSlotDetails } from "./ui/BookingSlotDetails";
import { ExtentionRequest } from "./ui/ExtentionRequest";

export function Requests() {
  const navigate = useNavigate();
  const tabs = [
    { id: "slots" as const, label: "Slots", route: "/requests" },
    {
      id: "extensions" as const,
      label: "Extensions",
      route: "/requests/extensions",
    },
    // {
    //   id: "cancellations" as const,
    //   label: "Cancellations",
    //   route: "/requests/cancellation",
    // },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="flex space-x-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              navigate(tab.route);
            }}
            className={`py-2 px-4 border-b-2 text-sm font-medium ${
              tab.route === window.location.pathname
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
        <Route
          path="/extensions"
          element={<ExtentionRequest />}
        />
        <Route path="/" element={<BookingRequests />} />
      </Routes>
    </div>
  );
}
