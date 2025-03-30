import { useState } from "react";

const AdminCancel: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() === "") {
      setError("Text area cannot be empty");
    } else {
      setError("");
      alert("Form submitted successfully!");
      // Handle form submission logic here
    }
  };

  return (
    <div>
      <h1 className="font-bold">Admin Cancel</h1>
      <div className="becompanion-box">
        <img
          src="https://img.freepik.com/free-photo/pretty-smiling-joyfully-female-with-fair-hair-dressed-casually-looking-with-satisfaction_176420-15187.jpg"
          alt="profile"
        />
        <div className="flex justify-between items-center my-3">
          <h1 className="font-bold">
            User detail: <span className="font-normal">Shidhart Thakur</span>
          </h1>
          <h1 className="font-bold">
            Age: <span className="font-normal">25</span>
          </h1>
          <h1 className="font-bold">
            Email: <span className="font-normal">side123@gmail.com</span>
          </h1>
        </div>
        <div className="flex justify-between items-center mb-3">
          <h1 className="font-bold">
            Companion detail: <span className="font-normal">Sia Singh</span>
          </h1>
          <h1 className="font-bold">
            Gender: <span className="font-normal">Female</span>
          </h1>
        </div>
        <div className="flex justify-between items-center my-3">
          <h1 className="font-bold">
            Booking request: <span className="font-normal">12 May 11:00 PM - 1:00 AM</span>
          </h1>
          <h1 className="font-bold">
            Transaction ID: <span className="font-normal">403993715533597382</span>
          </h1>
          <h1 className="font-bold">
            Mode: <span className="font-normal">Debit card</span>
          </h1>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold">
            Card No (if applicable): <span className="font-normal">*******1234</span>
          </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <p className="font-bold my-2">please specify the reason of cancelation(by admin)</p>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type something..."
              className="border rounded w-full p-2"
            ></textarea>
            <br />
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-end gap-3">

            
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mt-2">
            Accept
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded mt-2"> Reject</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCancel;

