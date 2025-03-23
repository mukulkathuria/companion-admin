/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import { Avatar, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { timeAgo } from "@/utils/booking.utils";

interface notificationBody {
  id: number;
  expiry: string;
  content: string;
  foruser: string;
  isGobal: boolean;
  reminders: string[];
  fromModule: string;
  moduleotherDetails: { [key: string]: string } | null;
  contentforadmin: string;
  createdAt: string;
  updatedAt: string;
}

const NotificationDropDown: FC = () => {
  const [notifications, setNotifications] = useState<notificationBody[]>([]);
  useEffect(() => {
    import("@/services/notifications/notificationlist.service")
      .then(({ getAllNotificationService }) => getAllNotificationService())
      .then((res) => {
        if (res?.data) {
          const data = res.data.map((l: any) => ({
            ...l,
            createdAt: timeAgo(l.createdAt),
          }));
          setNotifications(data);
        }
      });
  }, []);

  return (
    <DropdownMenuContent className="w-96 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
      <ScrollArea className="max-h-[400px] overflow-y-auto">
        <div className="flex flex-col">
          {notifications.length > 0 ? (
            notifications.map((notification, i) => (
              <DropdownMenuItem
                key={notification.id + i}
                className="flex flex-col p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`https://source.unsplash.com/random/100x100/?portrait&${notification.id}`}
                      />
                      {/* <AvatarFallback>{notification.message[0]}</AvatarFallback> */}
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {notification.contentforadmin}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.createdAt}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 bg-white border border-gray-100 shadow-lg rounded-lg">
                      {/* <DropdownMenuItem
                        className="text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() =>
                          console.log("Marking notification as read")
                        }
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem> */}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Additional details based on notification type */}

                {/* Action buttons */}
                {(notification.moduleotherDetails?.type === "slot" ||
                  notification.moduleotherDetails?.type === "extension" ||
                  notification.moduleotherDetails?.type ===
                    "companionCancellation") && (
                  <div className="flex justify-end space-x-2 mt-3">
                    <Button
                      size="sm"
                      variant="destructive"
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => console.log("Deny")}
                    >
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={() => console.log("Approve")}
                    >
                      Approve
                    </Button>
                  </div>
                )}

                {notification.moduleotherDetails?.type === "updateCompanion" &&
                  notification.moduleotherDetails?.updateId && (
                    <div className="flex justify-end space-x-2 mt-3">
                      <Button
                        size="sm"
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => console.log("Deny")}
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                        onClick={() => console.log("Approve")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => console.log("Forward")}
                      >
                        Forward
                      </Button>
                    </div>
                  )}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled className="text-sm text-gray-400 p-4">
              No new notifications
            </DropdownMenuItem>
          )}
        </div>
      </ScrollArea>
    </DropdownMenuContent>
  );
};

export default NotificationDropDown;
