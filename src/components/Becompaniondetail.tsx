/* eslint-disable @typescript-eslint/no-explicit-any */
import { statusUpdateInputDto } from "@/data/dto/companion.data.dto";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Becompaniondetail = () => {
  const [companiondata, setcompaniondata] = useState<any>(null);
  const [isLoading, setisLoading] = useState(false);
  const [paymentData, setpaymentData] = useState<any>([]);
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
          setpaymentData(data.userpaymentmethods);
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
    return <div className="text-center py-10 text-lg font-medium">Loading...</div>;
  }

  const hiddenKeys = ["id", "createdAt", "updatedAt"];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Request Companion Detail
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Images */}
        <div className="flex gap-4 justify-center">
          {companiondata.Images.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt={`profile-${idx}`}
              className="w-32 h-32 object-cover rounded-lg border"
            />
          ))}
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <h1 className="font-semibold">
            Full Name:{" "}
            <span className="text-gray-700">
              {companiondata.firstname + " " + companiondata.lastname}
            </span>
          </h1>
          <h1 className="font-semibold">
            Email: <span className="text-gray-700">{companiondata.email}</span>
          </h1>
          <h1 className="font-semibold">
            Phone: <span className="text-gray-700">{companiondata.phoneno}</span>
          </h1>
          <h1 className="font-semibold">
            Age: <span className="text-gray-700">{companiondata.age}</span>
          </h1>
          <h1 className="font-semibold">
            Gender: <span className="text-gray-700">{companiondata.gender}</span>
          </h1>
          <h1 className="font-semibold">
            Height:{" "}
            <span className="text-gray-700">
              {companiondata.Companion[0]?.height}
            </span>
          </h1>
          <h1 className="font-semibold">
            Smoking Habit:{" "}
            <span className="text-gray-700">
              {companiondata.Companion[0]?.smokinghabits}
            </span>
          </h1>
          <h1 className="font-semibold">
            Eating Habit:{" "}
            <span className="text-gray-700">
              {companiondata.Companion[0]?.eatinghabits}
            </span>
          </h1>
          <h1 className="font-semibold">
            Drinking Habit:{" "}
            <span className="text-gray-700">
              {companiondata.Companion[0]?.drinkinghabits}
            </span>
          </h1>
          <h1 className="font-semibold">
            Skin Tone:{" "}
            <span className="text-gray-700">
              {companiondata.Companion[0]?.Skintone}
            </span>
          </h1>
          <h1 className="font-semibold">
            Body Type:{" "}
            <span className="text-gray-700">
              {companiondata.Companion[0]?.bodytype}
            </span>
          </h1>
        </div>

        {/* Base Locations */}
        <div className="mt-4">
          {Array.isArray(companiondata?.Companion?.[0]?.baselocation) &&
            companiondata.Companion[0].baselocation.map(
              (location: any, idx: number) => (
                <h1 key={idx} className="font-semibold">
                  Base Location {idx + 1}:{" "}
                  <span className="text-gray-700">{location.formattedaddress}</span>
                </h1>
              )
            )}
        </div>

        {/* Description */}
        {Array.isArray(companiondata?.Companion?.[0]?.description) && (
          <div className="mt-4">
            <h1 className="font-semibold">
              Description:{" "}
              <span className="text-gray-700">
                {companiondata.Companion[0].description.join(", ")}
              </span>
            </h1>
          </div>
        )}

        {/* Payment Info */}
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-3">Payment Information</h2>
          <div className="grid gap-4">
            {paymentData.map((item: any, index: number) => {
              const filteredEntries = Object.entries(item).filter(
                ([key, value]) =>
                  !hiddenKeys.includes(key) &&
                  value !== null &&
                  value !== "" &&
                  value !== false
              );

              return (
                <div
                  key={index}
                  className="p-4 border rounded-md bg-gray-50 shadow-sm"
                >
                  <h3 className="font-semibold mb-2">Payment {index + 1}</h3>
                  {filteredEntries.map(([key, value]) => (
                    <div key={key} className="text-sm text-gray-700">
                      <strong className="capitalize">{key}: </strong>
                      {String(value)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

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
