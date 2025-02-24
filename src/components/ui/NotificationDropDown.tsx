/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { MoreVertical, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";

interface NotificationProps {
  notifications: any[];
}

const NotificationDropDown: FC<NotificationProps> = ({ notifications }) => {
    // const handleNotificationAction = (
    //     notification: Notification,
    //     action: "approve" | "reject" | "forward" | "delete"
    //   ) => {
    //     setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    //     if (
    //       action === "forward" &&
    //       notification.type === "updateCompanion" &&
    //       notification.updateId
    //     ) {
    //       navigate(`/update/${notification.updateId}`);
    //     } else {
    //       toast({
    //         title: "Notification Action",
    //         description: `Request ${notification.id} ${action}ed`,
    //       });
    //     }
    //   };
  return (
    <DropdownMenuContent className="w-96 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
      <ScrollArea className="max-h-[400px] overflow-y-auto">
        <div className="flex flex-col">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col p-4 hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`https://source.unsplash.com/random/100x100/?portrait&${notification.id}`}
                      />
                      <AvatarFallback>{notification.message[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.time}
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
                      <DropdownMenuItem
                        className="text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() =>
                          console.log("Marking notification as read")
                        }
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Additional details based on notification type */}
                {notification.type === "slot" && notification.purpose && (
                  <p className="text-xs text-gray-500 mt-1">
                    Purpose: {notification.purpose}
                  </p>
                )}
                {notification.type === "extension" &&
                  notification.extensionDuration && (
                    <p className="text-xs text-gray-500 mt-1">
                      Extension: {notification.extensionDuration} hours
                    </p>
                  )}
                {notification.type === "companionCancellation" &&
                  notification.cancellationReason && (
                    <p className="text-xs text-gray-500 mt-1">
                      Reason: {notification.cancellationReason}
                    </p>
                  )}

                {/* Action buttons */}
                {(notification.type === "slot" ||
                  notification.type === "extension" ||
                  notification.type === "companionCancellation") && (
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

                {notification.type === "updateCompanion" &&
                  notification.updateId && (
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
