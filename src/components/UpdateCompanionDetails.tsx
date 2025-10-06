/* eslint-disable @typescript-eslint/no-explicit-any */
import { CompanionForm } from "./CompanionForm";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatCompanionRequestData } from "@/utils/statefunction.utils";
import { statusUpdateInputDto } from "@/data/dto/companion.data.dto";
import { toast } from "sonner";

import Companionprofiledata from "./Companionprofiledata";

export function UpdateCompanionDetails() {
  const [companiondetails, setCompanionDetails] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const requestId = searchParams.get("id");
    if (requestId) {
      import("../services/requests/updatecompanion.service")
        .then(({ getCompanionrequestDetailsService }) =>
          getCompanionrequestDetailsService(requestId)
        )
        .then((res) => {
          if (res?.data) {
            setData(res.data?.paymentmethods);

            setCompanionDetails(formatCompanionRequestData(res.data));
          
            
          }
        });
    }
  }, [searchParams]);

  const handleUpdateStatus = async (status: string) => {
    const requestId = searchParams.get("id");
    if (requestId) {
      const data: statusUpdateInputDto = {
        id: requestId,
      };
      if (status === "Approve") {
        data["approve"] = true;
      } else {
        data["reject"] = true;
      }
      setisLoading(() => true);
      const { updateCompanionProfileStatusService } = await import(
        "../services/companion/updatecompanion.service"
      );
      const res = await updateCompanionProfileStatusService(data);
      if (res?.data) {
        toast.success("Request Updated Successfully");
        navigate(-1);
      } else if (res?.error) {
        toast.error(res.error);
      }
      setisLoading(() => false);
    }
  };

  if (!companiondetails) {
    return <div>Loading..</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-9xl w-full mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold text-gray-900">
          Update Request Details
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">
              Original Profile
            </CardTitle>
            <CardDescription className="text-gray-500">
              Current profile data
            </CardDescription>
          </CardHeader>
          <div></div>
          <CardContent className="space-y-4">
            <Companionprofiledata
              initialData={companiondetails.oldcompaniondetails}
            />
          </CardContent>
        </Card>
        <div className="flex-1">
          <CompanionForm
            initialForm={companiondetails.newcompaniondetails}
            buttonText="Update Companion"
          />
        </div>
      </div>
      <CardFooter className="flex justify-between items-center mt-6">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="border-gray-300 hover:bg-gray-50"
        >
          Back
        </Button>
        <div className="flex space-x-4">
          <Button
            onClick={() => console.log("Delete")}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            disabled={isLoading}
          >
            Delete
          </Button>
          <Button
            onClick={() => handleUpdateStatus("Reject")}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
            disabled={isLoading}
          >
            Reject
          </Button>
          <Button
            onClick={() => handleUpdateStatus("Approve")}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            Approve
          </Button>
        </div>
      </CardFooter>
    </div>
  );
}
