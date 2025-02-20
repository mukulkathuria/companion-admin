/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paperclip, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function IssueDetails() {
  const [issue, setIssue] = useState<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const issueId = searchParams.get("issueId");
    if (issueId) {
      import("../services/issues/issuelist.service")
        .then(({ getIssueDetails }) => getIssueDetails(issueId))
        .then((res) => {
          if (res?.data) {
            setIssue({ ...res.data, issueId: issueId });
          }
        });
    }
  }, [searchParams]);
  if (!issue) {
    return <div>Loading...</div>;
  }
  return (
    <Card className="bg-white rounded-lg shadow-lg">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="p-2 bg-blue-300 hover:bg-green-300"
            >
              ←
            </Button>
            <div>
              <CardTitle className="text-2xl font-semibold">
                Ticket #{issue.issueId}
              </CardTitle>
              <CardDescription>{issue.subject}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">User Name</span>
              </div>
              <span className="text-sm text-gray-500">
                {issue.User.firstname}
              </span>
            </div>
            <Badge
              variant={
                issue.status === "ACTIVE"
                  ? "outline"
                  : issue.status === "RESOLVED"
                  ? "secondary"
                  : "destructive"
              }
            >
              {issue.status}
            </Badge>
            <div className="flex gap-2">
              <Button
                className="bg-red-600"
                size="sm"
                variant="destructive"
                onClick={() => console.log("Deny")}
              >
                Deny
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => console.log("Resolve")}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Resolve
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Subject</h3>
              <p className="text-gray-700">{issue.subject}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-gray-700">{issue.explanation}</p>
            </div>
            {/* {selectedTicket.attachments && selectedTicket.attachments.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Attachments</h3>
              <div className="flex gap-4 flex-wrap">
                {selectedTicket.attachments.map((attachment, index) => (
                  <div key={index}>
                    {renderAttachmentPreview(attachment)}
                  </div>
                ))}
              </div>
            </div>
          )} */}
          </div>
          {issue.comments?.length > 0 && (
            <ScrollArea className="h-96 rounded-md border p-4">
              <div className="space-y-4">
                {issue.comments.map((message: any, index: number) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex flex-col max-w-[70%] ${
                        message.sender === "user" ? "items-start" : "items-end"
                      }`}
                    >
                      <span className="text-xs text-gray-500 mb-1">
                        {message.time}
                      </span>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {message.message}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          <div className="flex items-center gap-4">
            <Textarea
              placeholder="Reply to user..."
              value={""}
              onChange={() => console.log("Reply")}
              className="flex-1"
              rows={3}
            />
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={(e) => console.log(e.target.files)}
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                />
                <Paperclip className="h-5 w-5 text-gray-500" />
              </label>
              <Button
                onClick={() => console.log("Send")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Send
              </Button>
            </div>
          </div>
          {/* {attachments.length > 0 && (
          <div className="flex gap-4 flex-wrap">
            {attachments.map((file, index) => (
              <div key={index}>
                {renderAttachmentPreview(file)}
                <span className="text-sm text-gray-500 mt-1 block text-center">
                  {file.name}
                </span>
              </div>
            ))}
          </div>
        )} */}
        </div>
      </CardContent>
    </Card>
  );
}
