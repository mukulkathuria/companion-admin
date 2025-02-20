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
import { BASEURL } from "@/Constants/services.constants";

export function UpdateCompanionDetails() {
  const [companiondetails, setCompanionDetails] = useState<any>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const requestId = searchParams.get("id");
    if (requestId) {
      import("../services/requests/updatecompanion.service")
        .then(({ getCompanionrequestDetailsService }) =>
          getCompanionrequestDetailsService(requestId)
        )
        .then((res) => {
          if (res?.data) {
            setCompanionDetails(formatCompanionRequestData(res.data));
          }
        });
    }
  }, [searchParams]);

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
            <div className="flex items-center">
              {companiondetails.oldcompaniondetails.images &&
                companiondetails.oldcompaniondetails.images.map(
                  (image: string, i: number) => (
                    <img
                      key={i*200}
                      src={BASEURL + "/" + image}
                      alt="Profile Picture"
                      className="h-16 w-16"
                    />
                  )
                )}
              <div className="ml-4">
                <p className="font-medium text-gray-900">
                  {companiondetails.oldcompaniondetails.firstname}{" "}
                  {companiondetails.oldcompaniondetails.lastname}
                </p>
                <p className="text-sm text-gray-500">
                  {companiondetails.oldcompaniondetails.email}
                </p>
              </div>
            </div>
            <p>
              <strong className="text-gray-700">Location:</strong>{" "}
              {companiondetails.oldcompaniondetails.city}
            </p>
            <p>
              <strong className="text-gray-700">Booking Rate:</strong>{" "}
              {companiondetails.oldcompaniondetails.bookingrate}
            </p>
            <p>
              <strong className="text-gray-700">Description:</strong>{" "}
              {companiondetails.oldcompaniondetails.description.join(", ")}
            </p>{" "}
            {/* Updated */}
            <p>
              <strong className="text-gray-700">Age:</strong>{" "}
              {companiondetails.oldcompaniondetails.age}
            </p>
            <p>
              <strong className="text-gray-700">Gender:</strong>{" "}
              {companiondetails.oldcompaniondetails.gender}
            </p>
            <p>
              <strong className="text-gray-700">Skin Tone:</strong>{" "}
              {companiondetails.oldcompaniondetails.skintone}
            </p>
            <p>
              <strong className="text-gray-700">Body Type:</strong>{" "}
              {companiondetails.oldcompaniondetails.bodytype}
            </p>
            <p>
              <strong className="text-gray-700">Eating Habits:</strong>{" "}
              {companiondetails.oldcompaniondetails.eatinghabits}
            </p>
            <p>
              <strong className="text-gray-700">Smoking Habit:</strong>{" "}
              {companiondetails.oldcompaniondetails.smokinghabits}
            </p>
            <p>
              <strong className="text-gray-700">Drinking Habit:</strong>{" "}
              {companiondetails.oldcompaniondetails.drinkinghabits}
            </p>
            <p>
              <strong className="text-gray-700">Height:</strong>{" "}
              {companiondetails.oldcompaniondetails.height}
            </p>
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
          >
            Delete
          </Button>
          <Button
            onClick={() => console.log("Approve")}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Reject
          </Button>
          <Button
            onClick={() => console.log("Approve")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Approve
          </Button>
        </div>
      </CardFooter>
    </div>
  );
}
