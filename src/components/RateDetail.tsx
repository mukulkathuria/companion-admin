/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASEURL } from "@/Constants/services.constants";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const RateDetail: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [companiondata, setcompaniondata] = useState<any>(null);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const companionId = searchParams.get("companionId");
    if (companionId) {
      import("@/services/companion/companionrequest.service")
        .then(({ getCompanionRateDetailsService }) =>
          getCompanionRateDetailsService(companionId)
        )
        .then(async ({ data }) => {
          const { Convert24HoursPieChart, Convert7daysBarchart } = await import(
            "@/utils/booking.utils"
          );
          if (data) {
            const values = {
              ...data,
              last24hoursbookings: Convert24HoursPieChart(
                data.last24hoursbookings
              ),
              last7daysbookings: Convert7daysBarchart(data.last7daysbookings),
            };
            console.log(values);
            setcompaniondata(values);
          }
        });
    }
  }, [searchParams]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcompaniondata((l: typeof companiondata) => ({
      ...l,
      bookingrate: e.target.value,
    }));
  };

  const validatePrice = (price: string): boolean => {
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Price must be a positive number");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePrice(companiondata.bookingrate)) {
      console.log("Price updated");
    }
  };
  if (!companiondata) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-xl font-bold">Companion detail</h1>
      <div className="becompanion-box">
        <img src={BASEURL + "/" + companiondata.Images[0]} alt="profile" />
        <div className="flex justify-between my-3">
          <h1>
            Name:{" "}
            <span>
              {companiondata?.firstname + " " + companiondata?.lastname}
            </span>
          </h1>
          <h1>
            Age: <span>{companiondata?.age}</span>
          </h1>
          <h1>
            Gender: <span>{companiondata?.gender}</span>
          </h1>
        </div>
        <div className="flex justify-between my-3">
          <h1>
            City: <span>{companiondata?.city}</span>
          </h1>
          <h1>
            State: <span>{companiondata?.state}</span>
          </h1>
          <h1>
            Rating: <span>{companiondata?.averagerating}/5</span>
          </h1>
        </div>
        <div className="flex justify-between my-3">
          <h1>
            Total booking: <span>{companiondata?.totalbookinghours}hr</span>
          </h1>
        </div>
        <div>
          {companiondata?.last24hoursbookings.length ? (
            <div>
              <h1 className="font-bold">Booking in last 24 hour</h1>
              <Dailybooking data={companiondata?.last24hoursbookings} />
            </div>
          ) : null}
          {companiondata?.last7daysbookings.length ? (
            <div>
              <h1 className="font-bold my-4">Booking in last one week</h1>
              <Weeklybooking data={companiondata?.last7daysbookings} />
            </div>
          ) : null}
          <form onSubmit={handleSubmit} className="flex justify-between">
            <div className="flex items-center">
              <h1>Price(per hour):</h1>
              <input
                type="number"
                value={companiondata.bookingrate}
                onChange={handlePriceChange}
                className=" p-2 border rounded"
                required
                placeholder="Enter new price"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            <button
              type="submit"
              className=" bg-red-500 text-white py-1  mt-5 rounded"
            >
              Update Price
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
interface WeeklybookingProps {
  data: {
    day: string;
    bookingHours: number;
  }[];
}

export const Dailybooking: FC<WeeklybookingProps> = ({ data }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#D32F2F",
    "#7E57C2",
  ];
  return (
    <>
      <div>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="bookingHours"
                label={({ day }) => day}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} Hours`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

const Weeklybooking: FC<WeeklybookingProps> = ({ data }) => {
  return (
    <>
      <div>
        <div style={{ width: "90%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" />
              <YAxis
                label={{
                  value: "Booking Hours",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar dataKey="bookingHours" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default RateDetail;
