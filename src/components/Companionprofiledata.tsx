import React, { useEffect } from "react";

const Companionprofiledata = (initialData: any = {}) => {
  const [data, setData] = React.useState(initialData.initialData || {});
  
  useEffect(() => {
    if (initialData.initialData) {
      setData(initialData.initialData);
      console.log('old data for view:', initialData.initialData);
      

    }
  }, [initialData]);

  const hiddenKeys = ["id", "createdAt", "updatedAt"];

  return (
    <div>
      <div className="flex items-center">
        {data.images &&
          data.images.map((image: string, i: number) => (
            <img
              key={i * 200}
              src={image}
              alt="Profile Picture"
              className="h-16 w-16"
            />
          ))}
        <div className="ml-4">
          <p className="font-medium text-gray-900">
            {data.firstname} {data.lastname}
          </p>
          <p className="text-sm text-gray-500">{data.email}</p>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <h1 className="font-semibold">
            Email: <span className="text-gray-700">{data.email}</span>
          </h1>
          <h1 className="font-semibold">
            Phone: <span className="text-gray-700">{data.phoneno}</span>
          </h1>
          <h1 className="font-semibold">
            Age: <span className="text-gray-700">{data.age}</span>
          </h1>
          <h1 className="font-semibold">
            Gender: <span className="text-gray-700">{data.gender}</span>
          </h1>
          <h1 className="font-semibold">
            Height: <span className="text-gray-700">{data?.height}</span>
          </h1>
          <h1 className="font-semibold">
            booking rate per Hour: <span className="text-gray-700">{data?.bookingrate}</span>
          </h1>
          <h1 className="font-semibold">
            Smoking Habit:{" "}
            <span className="text-gray-700">{data?.smokinghabits}</span>
          </h1>
          <h1 className="font-semibold">
            Eating Habit:{" "}
            <span className="text-gray-700">{data?.eatinghabits}</span>
          </h1>
          <h1 className="font-semibold">
            Drinking Habit:{" "}
            <span className="text-gray-700">{data?.drinkinghabits}</span>
          </h1>
          <h1 className="font-semibold">
            Skin Tone: <span className="text-gray-700">{data?.Skintone}</span>
          </h1>
          <h1 className="font-semibold">
            Body Type: <span className="text-gray-700">{data?.bodytype}</span>
          </h1>
        </div>
        <div>
          {Array.isArray(data?.description) && (
            <div className="mt-4">
              <h1 className="font-semibold">
                Description:{" "}
                <span className="text-gray-700">
                  {data?.description.join(", ")}
                </span>
              </h1>
            </div>
          )}
        </div>
        <div>
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-3">Payment Information</h2>
            <div className="grid gap-4">
              {Array.isArray(data?.paymentmethods) && data.paymentmethods.map((item: any, index: number) => {
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
        </div>
        <div className="mt-4">
          {Array.isArray(data?.baselocations) &&
            data?.baselocations.map((location: any, idx: number) => (
              <h1 key={idx} className="font-semibold">
                Base Location {idx + 1}:{" "}
                <span className="text-gray-700">{location.formattedaddress}</span>
              </h1>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Companionprofiledata;