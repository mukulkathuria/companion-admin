/* eslint-disable @typescript-eslint/no-explicit-any */
import { statusUpdateInputDto } from "@/data/dto/companion.data.dto";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { formatApiResponseSecond } from "@/utils/secondconverterdata.utilis";
import Companionprofiledata from "./Companionprofiledata";

const Becompaniondetail = () => {
  const [companiondata, setcompaniondata] = useState<any>(null);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const companionId = searchParams.get("companionId");
    if (companionId) {
      import("@/services/companion/companionrequest.service")
        .then(({ getewCompanionRequestDetailsService }) =>
          getewCompanionRequestDetailsService(companionId)
        )
        .then(async ({ data }) => {
          setcompaniondata(formatApiResponseSecond(data));
        
        });
    }
  }, [searchParams]);

  const updateBeCompaionStatus = async (status: "Approve" | "Reject") => {
    const companionId = searchParams.get("companionId");
    if (companionId) {
      const data: statusUpdateInputDto = {
        id: companionId,
      };
      if (status === "Approve") {
        data["approve"] = true;
      } else {
        data["reject"] = true;
      }
      setisLoading(true);
      const { updatebeCompanionRequestStatusService } = await import(
        "@/services/companion/companionrequest.service"
      );
      const { data: statusdata, error } =
        await updatebeCompanionRequestStatusService(data);
      if (statusdata) {
        toast.success("Successfully updated the status");
        navigate(-1);
      } else {
        toast.error(error);
      }
      setisLoading(false);
    }
  };

  if (!companiondata) {
    return (
      <div className="text-center py-10 text-lg font-medium">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Request Companion Detail
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <Companionprofiledata initialData={companiondata} />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-60"
            onClick={() => updateBeCompaionStatus("Approve")}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Accept"}
          </button>
          <button
            className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-60"
            onClick={() => updateBeCompaionStatus("Reject")}
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Becompaniondetail;
