import React, { useState } from "react";
import { Link } from "react-router-dom";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const Rate: React.FC = () => {
  const [state, setState] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState<{ state?: string; location?: string }>(
    {}
  );

  const validate = () => {
    const newErrors: { state?: string; location?: string } = {};
    if (!state) newErrors.state = "State is required";
    if (!location.trim()) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", { state, location });
    }
  };
  return (
    <div>
      <h1 className="text-black text-lg font-bold">
        Rate Alteration of the companion location wise
      </h1>
      <div className="flex justify-end">
        <div>
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <div>
              <label className="block mb-2 text-sm">Select State:</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value=""> Select State</option>
                {indianStates.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>
            <div>
              <label className="block  mb-2 text-sm ">Enter Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="Enter your location"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>
            <button
              type="submit"
              className=" mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="becompanion-box ">
        <div className="flex justify-between font-bold py-3 px-3 bg-slate-200 my-3 ">
            <h1 className="ml-6 text-sm">User</h1>
            <h1 className="ml-6 text-sm">Age</h1>
            <h1 className="ml-6 text-sm">Gender</h1>
            <h1 className="ml-6 text-sm">Rate</h1>
            <h1 className="ml-6 text-sm">weekly booking</h1>
            <h1 className="text-sm">Total booking</h1>
        </div>
     <Link to={'/Rate/details'}>  <div className="hover:bg-slate-200">
        <div className="flex justify-between items-center mb-3 ">
        <div className="flex items-center rate-profile mr-3">
            <img src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg" alt="profile"  />
            <h1>Sora</h1>
        </div>
        <div >
        30
        </div>
        <div>
            Female
        </div>
        <div>
            4.5
        </div>
        <div>
            30hr/week
        </div>
        <div>
            300hr
        </div>
        
        </div>
        
        <hr />
        </div>
        </Link> 
        <Link to={'/Rate/details'}>
        <div className="hover:bg-slate-200">
        <div className="flex justify-between items-center mb-3">
        <div className="flex items-center rate-profile mr-3">
            <img src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg" alt="profile"  />
            <h1>Sora</h1>
        </div>
        <div >
        30
        </div>
        <div>
            Female
        </div>
        <div>
            4.5
        </div>
        <div>
            30hr/week
        </div>
        <div>
            300hr
        </div>
        
        </div>
        <hr />
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Rate;
