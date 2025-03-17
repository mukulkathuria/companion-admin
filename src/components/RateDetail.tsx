import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const RateDetail: React.FC = () => {
  const [newPrice, setNewPrice] = useState<string>("1000");
  const [error, setError] = useState<string>("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(e.target.value);
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
    if (validatePrice(newPrice)) {
    }
  };
  return (
    <div>
      <h1 className="text-xl font-bold">Companion detail</h1>
      <div className="becompanion-box">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9kZWx8ZW58MHx8MHx8fDA%3D"
          alt="profile"
        />
        <div className="flex justify-between my-3">
          <h1>
            Name: <span>Alia Kapoor</span>
          </h1>
          <h1>
            Age: <span>25</span>
          </h1>
          <h1>
            Gender: <span>Female</span>
          </h1>
        </div>
        <div className="flex justify-between my-3">
          <h1>
            City: <span>Mumbai</span>
          </h1>
          <h1>
            State: <span>Maharastra</span>
          </h1>
          <h1>
            Rating: <span>4.5/5</span>
          </h1>
        </div>
        <div className="flex justify-between my-3">
          <h1>
            Total booking: <span>200hr</span>
          </h1>
        </div>
        <div>
          <div>
            <h1 className="font-bold">Booking in last 24 hour</h1>
            <Dailybooking />
          </div>
          <div>
            <h1 className="font-bold my-4">Booking in last one week</h1>
            <Weeklybooking />
          </div>
          <form onSubmit={handleSubmit} className="flex justify-between">
            <div className="flex items-center">
              <h1>Price(per hour):</h1>
              <input
                type="number"
                value={newPrice}
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

const data = [
  { name: "9 AM - 11 AM", bookingHours: 2 },
  { name: "11 AM - 2 PM", bookingHours: 3 },
  { name: "1 PM - 6PM", bookingHours: 5 },
];

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#D32F2F",
  "#7E57C2",
];

export const Dailybooking = () => {
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
                label={({ name }) => name} // Only show time slots
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

const Weeklybooking = () => {
  const data = [
    { day: "Monday", bookingHours: 3 },
    { day: "Tuesday", bookingHours: 5 },
    { day: "Wednesday", bookingHours: 7 },
    { day: "Thursday", bookingHours: 6 },
    { day: "Friday", bookingHours: 4 },
    { day: "Saturday", bookingHours: 8 },
    { day: "Sunday", bookingHours: 5 },
  ];
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
