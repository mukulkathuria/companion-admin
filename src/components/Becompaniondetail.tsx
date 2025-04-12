/* eslint-disable @typescript-eslint/no-explicit-any */
import { statusUpdateInputDto } from "@/data/dto/companion.data.dto";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

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
          console.log(data);
          setcompaniondata(data);
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
      setisLoading(() => true);
      const { updatebeCompanionRequestStatusService } = await import(
        "@/services/companion/companionrequest.service"
      );
      const { data: statusdata, error } =
        await updatebeCompanionRequestStatusService(data);
      if (statusdata) {
        toast.success("Sucessfully update the status");
        navigate(-1);
      } else {
        toast.error(error);
      }
      setisLoading(() => false);
    }
  };

  if (!companiondata) {
    return <div>Loading..</div>;
  }

  return (
    <>
      <h1 className="text-xl font-bold">Request companion detail</h1>
      <div className="becompanion-box">
        <div className="bg-slate-50 p-3">
          <div className="flex gap-5">
            <img src={ companiondata.photos[0]} alt="profile" />
            <img src={ companiondata.photos[1]} alt="profile" />
          </div>
          <div className="gap-10 mt-3">
            <h1 className="font-bold">
              Full Name:{" "}
              <span>
                {companiondata.firstname + " " + companiondata.lastname}
              </span>
            </h1>
            <h1 className="font-bold">
              Email: <span>{companiondata.email}</span>
            </h1>
            <h1 className="font-bold">
              Phone : <span>{companiondata.phoneNo}</span>
            </h1>
            <h1 className="font-bold">
              Age : <span>{companiondata.age}</span>
            </h1>
            <h1 className="font-bold">
              Gender: <span>{companiondata.gender}</span>
            </h1>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="bg-green-700"
              onClick={() => updateBeCompaionStatus("Approve")}
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : 'Accept'}
            </button>
            <button
              className="bg-red-600"
              onClick={() => updateBeCompaionStatus("Reject")}
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Becompaniondetail;
