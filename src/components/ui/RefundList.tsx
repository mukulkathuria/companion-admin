import { Route, Routes, useNavigate } from "react-router-dom";
import Refundpending from "../Refundpending";
import Refundcompleted from "../Refundcompleted";

const RefundList = () => {
    const navigate = useNavigate();
    const tabs = [
      { id: "pending" as const, label: "Refund Pending", route: "/refund" },
      {
        id: "completed" as const,
        label: "Refund Completed",
        route: "/refund/completed",
      },
    ];
  
  return (
    <div>
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
        <Route path="/completed" element={<Refundcompleted />} />
        <Route path="/" element={<Refundpending />} />
      </Routes>
    </div>
  );
};

export default RefundList;
