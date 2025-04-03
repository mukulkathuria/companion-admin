const Refunddetails = () => {
  return (
    <>
      <h1 className=" text-xl my-3">Refund detail</h1>
      <div className="bg-white w-full ">
        <div className="flex justify-between">
          <h1 className="font-bold">
            User email: <span className="font-normal">Ghibli@gmail.com</span>
          </h1>
          <h1 className="font-bold">
            Booking time: <span className="font-normal">12 may 2024</span>
          </h1>
          <h1 className="font-bold">
            Booking detail: <span className="font-normal">1PM-2PM</span>
          </h1>
        </div>
        <div className="flex justify-between mt-3">
          <h1 className="font-bold">
            Booking id: <span className="font-normal">12345678xyz</span>
          </h1>
          <h1 className="font-bold">
            Transaction id: <span className="font-normal">!@#34566677vvvx</span>
          </h1>
          <h1 className="font-bold">
            Referrence number (Ar):{" "}
            <span className="font-normal">12345678dfdgd</span>
          </h1>
        </div>
        <div className="flex justify-between mt-3">
          <h1 className="font-bold">
            Refund amount : <span className="font-normal">100</span>
          </h1>
        </div>
        <div className="flex justify-between mt-3">
          <select name="Paymentmode" id="" className="p-2">
            <option value="Mode">Payment mode</option>
            <option value="emi">EMI</option>
            <option value="wallet">wallet</option>
            <option value="Netbanking">Net Banking</option>
            <option value="card">Card(Credit/Debit)</option>
            <option value="neft/rtgs">NEFT/RTGS</option>
            <option value="upi">UPI</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Refunddetails;
