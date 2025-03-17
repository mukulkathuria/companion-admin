import {
  Bell,
  LogOut,
  Menu,
  User,
  List,
  PlusSquare,
  RotateCw,
  Calendar,
  Ticket,
  // BarChart,
} from "lucide-react";
import type { Tab } from "../App";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
// import {
//   dummySlotRequests,
//   dummyExtensionRequests,
//   dummyCompanionCancellations,
//   dummyUpdateRequests,
// } from "../data/dummy";
import withAuth from "@/hoc/wihAuth";
import NotificationDropDown from "./ui/NotificationDropDown";

interface LayoutProps {
  // children: React.ReactNode;
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

// interface Notification {
//   id: number;
//   type:
//     | "slot"
//     | "extension"
//     | "companionCancellation"
//     | "userCancellation"
//     | "booking"
//     | "ticket"
//     | "updateCompanion";
//   message: string;
//   time: string;
//   requestId?: number;
//   ticketId?: string;
//   purpose?: string;
//   extensionDuration?: number;
//   cancellationReason?: string;
//   updateId?: number;
// }

function Layout({ activeTab, onTabChange }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const bellRef = useRef<HTMLButtonElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sync activeTab with the current URL path
  useEffect(() => {
    const path = location.pathname.split("/")[1] || "requests";
    onTabChange(path as Tab);
  }, [location.pathname, onTabChange]);

  // Load notifications
  useEffect(() => {
    import("../services/notifications/notificationlist.service")
      .then(({ getAllNotificationService }) => getAllNotificationService())
      .then((res) => {
        if (res?.data) {
          console.log(res.data);
        }
      });
  }, []);

  const tabs = [
    { id: "requests" as const, label: "Requests", icon: List },
    { id: "create" as const, label: "Create Companion", icon: PlusSquare },
    { id: "update" as const, label: "Update Companion", icon: RotateCw },
    { id: "track" as const, label: "Track Bookings", icon: Calendar },
    { id: "tickets" as const, label: "Tickets", icon: Ticket },
  //  { id: "becompanion" as const, label: "becompanion", icon: Ticket }
    // { id: "analytics" as const, label: "Analytics", icon: BarChart },
  ];

  // Handle tab change
  const handleTabChange = (tab: Tab) => {
    onTabChange(tab);
    navigate(`/${tab}`);
  };

  const handleLogout = async () => {
    try {
      const { logoutUserService } = await import(
        "../services/auth/logout.service"
      );
      const { removeUserData } = await import("../utils/removeUserData");
      await logoutUserService();
      await removeUserData();
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  // Handle notification actions

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg transition-all duration-300 ease-in-out border-r border-gray-200`}
      >
        <div className="p-4 flex items-center justify-between">
          <h1
            className={`text-xl font-bold ${
              !isSidebarOpen && "hidden"
            } text-primary`}
          >
            Zesty Amigos
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`w-full p-4 text-left hover:bg-gray-100 transition-colors ${
                activeTab === tab.id
                  ? "bg-gray-100 font-semibold text-primary"
                  : "text-gray-700"
              } ${
                !isSidebarOpen ? "justify-center" : ""
              } flex items-center gap-2`}
            >
              {isSidebarOpen && <tab.icon className="h-4 w-4" />}
              <span className={!isSidebarOpen ? "hidden" : ""}>
                {tab.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>
            <div className="flex items-center space-x-4">
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={setIsDropdownOpen}
              >
                <DropdownMenuTrigger asChild>
                  <button
                    ref={bellRef}
                    className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <Bell className="w-6 h-6 text-gray-700" />
                    {[].length > 0 && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <NotificationDropDown notifications={[]} />
              </DropdownMenu>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <User className="w-6 h-6 text-gray-700" />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="w-6 h-6 text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default withAuth(Layout);
