/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function IssuesList() {
  const [issuesData, setIssuesData] = useState<any>(null);
  useEffect(() => {
    import("../services/issues/issuelist.service")
      .then(({ getAllActiveIssueService }) => getAllActiveIssueService())
      .then((res) => {
        if (res?.data) {
          setIssuesData(res.data);
        }
      });
  }, []);
  if (!issuesData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-8">Tickets</h2>
        <div className="flex justify-end mb-6">
          <Input
            type="text"
            placeholder="Search Ticket Number"
            value={""}
            onChange={() => console.log("Search")}
            className="w-64"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ticket No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issuesData.map((ticket: any) => (
                <tr
                  key={ticket.issueId}
                  onClick={() => console.log("View")}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {ticket.issueId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {ticket.subject}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={
                        ticket.status === "ACTIVE"
                          ? "outline"
                          : ticket.status === "RESOLVED"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      onClick={() => console.log("View")}
                      variant="outline"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
