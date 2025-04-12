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
import { toast } from "sonner";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { statusUpdateInputDto } from "@/data/dto/companion.data.dto";

export function IssueDetails() {
  const [issue, setIssue] = useState<any>(null);
  const [comment, setComment] = useState<{
    attachment:
      | {
          url: string;
          file: File;
        }[]
      | null;
    content: string;
  }>({ attachment: null, content: "" });
  const [isLoading, setisLoading] = useState(false);

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

  const handleComment = async () => {
    if (!comment.content || !comment.content.trim().length) {
      toast.error("Please add comment before comment");
    }
    try {
      setisLoading(() => true);
      const issueId = searchParams.get("issueId");
      if (issueId) {
        const formData = new FormData();
        formData.append("issueId", issue.id);
        formData.append("comment", comment.content);
        if (comment.attachment) {
          comment.attachment.forEach((l) => {
            formData.append("images", l.file);
          });
        }
        const { addCommentOnIssueService } = await import(
          "../services/issues/handleissue.service"
        );
        const { data, error } = await addCommentOnIssueService(formData);
        if (data) {
          const { getIssueDetails } = await import(
            "../services/issues/issuelist.service"
          );
          const { data: issueData, error: issueError } = await getIssueDetails(
            issueId
          );
          if (issueData) {
            setIssue({ ...issueData, issueId: issueId });
          } else {
            toast.error(issueError);
          }
        } else {
          toast.error(error);
        }
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setComment({ attachment: null, content: "" });
      setisLoading(() => false);
    }
  };

  const handleAttachments = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxImages = 4;
    if (files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images.`);
      return;
    }
    const validTypes = ["image/jpeg", "image/png"];
    for (let i = 0; i < files.length; i += 1) {
      if (
        !validTypes.includes(files[i].type) ||
        files[i].size > 2 * 1024 * 1024
      ) {
        toast.error("Invalid Image");
        return;
      }
    }
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file),
      file,
    }));
    setComment((l) => ({ ...l, attachment: newImages }));
  };

  const updateIssueStatus = async (status: "Approve" | "Reject") => {
    if (issue.id) {
      const data: statusUpdateInputDto = {
        id: issue.id,
      };
      if (status === "Approve") {
        data["approve"] = true;
      } else {
        data["reject"] = true;
      }
      setisLoading(() => true);
      const { updateIssueStatusService } = await import(
        "@/services/issues/handleissue.service"
      );
      const { data: statusdata, error } = await updateIssueStatusService(data);
      if (statusdata) {
        toast.success("Sucessfully update the status");
        navigate(-1);
      } else {
        toast.error(error);
      }
      setisLoading(() => false);
    }
  };

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
                onClick={() => updateIssueStatus("Reject")}
                disabled={isLoading}
              >
                Deny
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => updateIssueStatus("Approve")}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={isLoading}
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
            {issue.screenshots && issue.screenshots.length > 0 && (
              <div className="flex gap-4 flex-wrap">
                {issue.screenshots.map((file: string, index: number) => (
                  <div key={index}>
                    <img
                      src={ file}
                      alt=""
                      width={80}
                      height={80}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          {issue.comments?.length > 0 && (
            <ScrollArea className="h-96 rounded-md border p-4">
              <div className="space-y-4">
                {issue.comments.map((message: any, index: number) => (
                  <div
                    key={index}
                    className={`flex ${
                      !message.User?.isAdmin ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex flex-col max-w-[70%] ${
                        !message.User?.isAdmin ? "items-start" : "items-end"
                      }`}
                    >
                      <span className="text-xs text-gray-500 mb-1">
                        {formatBookingTimingsforUi(message.created)}
                      </span>
                      <div
                        className={`rounded-lg p-3 ${
                          !message.User?.isAdmin
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {message.comment}
                      </div>
                      {message.screenshots &&
                        message.screenshots.length > 0 && (
                          <div className="flex gap-4 flex-wrap">
                            {message.screenshots.map(
                              (file: string, index: number) => (
                                <div key={index}>
                                  <a
                                    href={ file}
                                    download
                                    className="attachment-link"
                                  >
                                    <img
                                      src={ file}
                                      alt=""
                                      width={80}
                                      height={80}
                                    />
                                  </a>
                                </div>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          <div className="flex items-center gap-4">
            <Textarea
              placeholder="Reply to user..."
              value={comment.content}
              onChange={(e) =>
                setComment((l) => ({ ...l, content: e.target.value }))
              }
              className="flex-1"
              rows={3}
            />
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                <input
                  type="file"
                  multiple
                  onChange={handleAttachments}
                  className="hidden"
                  accept=".jpg, .jpeg, .png"
                />
                <Paperclip className="h-5 w-5 text-gray-500" />
              </label>
              <Button
                onClick={handleComment}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : 'Send'}
              </Button>
            </div>
          </div>
          {comment.attachment && comment.attachment.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {comment.attachment.map((file, index) => (
                <div key={index}>
                  <img src={file.url} alt="" width={40} height={40} />
                  <span className="text-sm text-gray-500 mt-1 block text-center">
                    {file.file.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
