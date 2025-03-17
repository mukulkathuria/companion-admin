import { Link } from "react-router-dom";

const companioncancel = () => {
  return (
    <>
      <div className="becompanion-box">
        <div className="flex gap-6">
          <div className="font-bold bottom-border">Companion cancelation</div>
          <Link to={"/usercancel"}>
            {" "}
            <div className="font-bold ">user cancelation</div>
          </Link>
        </div>
        <div className="flex justify-between font-bold my-3 text-sm text-slate-500 p-3">
          <h1>Companion</h1>
          <h1>User detail</h1>
          <h1>booking date</h1>
          <h1>Booking time</h1>
        </div>
        <hr />
        <Link to={"/companioncancel/detail"}>
          <div className="flex justify-between items-center hover:bg-slate-200 p-3">
            <div className="rate-profile flex items-center">
              <img
                src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg"
                alt="profile"
              />

              <h1>Oreo</h1>
            </div>
            <div>Arpit yadav</div>
            <div>12 May 2025</div>
            <div>11.00AM-2.00PM</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default companioncancel;
