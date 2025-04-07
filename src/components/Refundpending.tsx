import React, { useState } from "react";

function formatTo12Hour(time24: string) {
  const [hours, minutes] = time24.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

type ModalProps = {
  onClose: () => void;
};

const Refundpending = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div>
        <div className="bg-white w-full h-full">
          <div className="flex justify-between font-bold py-2 px-2 bg-slate-100">
            <h1>Email</h1>
            <h1>Amount</h1>

            <h1>Cancelled By</h1>
            <h1>Booking date and time</h1>
          </div>
          <div
            className="flex justify-between items-center  py-2 px-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <h1 className="text-sm">xyz@gmail.com</h1>
            <h1 className="text-sm">250</h1>
            <h1 className="text-sm">User</h1>
            <h1 className="text-sm">12 may,25 11AM-1PM</h1>
          </div>

          <div
            className="flex justify-between items-center  py-2 px-2 hover:bg-slate-200 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <h1 className="text-sm">Pending@gmail.com</h1>
            <h1 className="text-sm">4000</h1>
            <h1 className="text-sm">Admin</h1>
            <h1 className="text-sm">15 may,25</h1>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export const Modal = ({ onClose }: ModalProps) => {
  const [paymentDetails, setPaymentDetails] = useState({
    email: "john@gmail.com",
    refundedAmount: "1000",
    paymentMode: "",
    transactionId: "",
    upiId: "",
    cardNumber: "",
    cardCategory: "",
    walletName: "",
    bankName: "",
    bankCode: "",
    bank: "",
    refundDate: "",
    refundTime: "",
    referenceNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: string[] = [];

    if (
      !paymentDetails.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentDetails.email)
    ) {
      errors.push("Enter a valid email address.");
    }

    if (
      !paymentDetails.refundedAmount ||
      isNaN(Number(paymentDetails.refundedAmount))
    ) {
      errors.push("Refunded amount must be a number.");
    }

    if (!paymentDetails.transactionId)
      errors.push("Transaction ID is required.");
    if (!paymentDetails.refundDate) errors.push("Refund date is required.");
    if (!paymentDetails.refundTime) errors.push("Refund time is required.");
    if (!paymentDetails.referenceNumber)
      errors.push("Reference number is required.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // const formattedTime = formatTo12Hour(paymentDetails.refundTime);
    const { getRefundDetails } = await import("@/utils/refundpayment.utils");
    const refundsDetails = getRefundDetails(paymentDetails);
    console.log(refundsDetails);

    onClose();
  };
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setPaymentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-sm">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Refund Information</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.email}
            onChange={handlePaymentChange}
            required
          />

          <input
            type="text"
            placeholder="Refunded Amount"
            name="refundedAmount"
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.refundedAmount}
            onChange={handlePaymentChange}
            required
          />

          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.paymentMode}
            onChange={(e) =>
              setPaymentDetails((prev) => ({
                ...prev,
                paymentMode: e.target.value,
              }))
            }
            required
          >
            <option value="">Select Payment Mode</option>
            <option value="UPI">UPI</option>
            <option value="DC">Debit Card</option>
            <option value="CC">Credit Card</option>
            <option value="WALLET">Wallet</option>
            <option value="NB">Net Banking</option>
          </select>

          {paymentDetails.paymentMode === "upi" && (
            <input
              type="text"
              placeholder="UPI ID"
              className="w-full p-2 border border-gray-300 rounded"
              value={paymentDetails.upiId}
              onChange={handlePaymentChange}
              required
            />
          )}

          {(paymentDetails.paymentMode === "DC" ||
            paymentDetails.paymentMode === "CC") && (
            <>
              <input
                type="text"
                placeholder="Card Number"
                name="cardNumber"
                className="w-full p-2 border border-gray-300 rounded"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                required
              />
              <input
                type="text"
                placeholder="Card Category"
                name="cardCategory"
                className="w-full p-2 border border-gray-300 rounded"
                value={paymentDetails.cardCategory}
                onChange={handlePaymentChange}
                required
              />
            </>
          )}

          {paymentDetails.paymentMode === "WALLET" && (
            <input
              type="text"
              placeholder="Wallet Name"
              name="walletName"
              className="w-full p-2 border border-gray-300 rounded"
              value={paymentDetails.walletName}
              onChange={handlePaymentChange}
              required
            />
          )}

          {paymentDetails.paymentMode === "NB" && (
            <>
              <input
                type="text"
                placeholder="Bank Name"
                name="bankName"
                className="w-full p-2 border border-gray-300 rounded"
                value={paymentDetails.bankName}
                onChange={handlePaymentChange}
                required
              />
              <input
                type="text"
                placeholder="Bank Code"
                name="bankCode"
                className="w-full p-2 border border-gray-300 rounded"
                value={paymentDetails.bankCode}
                onChange={handlePaymentChange}
                required
              />
            </>
          )}

          {(paymentDetails.paymentMode === "rtgs" ||
            paymentDetails.paymentMode === "imps") && (
            <input
              type="text"
              placeholder="Bank"
              name="bank"
              className="w-full p-2 border border-gray-300 rounded"
              value={paymentDetails.bank}
              onChange={handlePaymentChange}
              required
            />
          )}

          <input
            type="text"
            name="transactionId"
            placeholder="Transaction ID"
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.transactionId}
            onChange={handlePaymentChange}
            required
          />

          <input
            type="date"
            name="refundDate"
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.refundDate}
            onChange={handlePaymentChange}
            required
          />

          <input
            type="time"
            name="refundTime"
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.refundTime}
            onChange={handlePaymentChange}
            required
          />
          {paymentDetails.refundTime && (
            <div className="text-sm text-gray-600">
              Formatted Time: {formatTo12Hour(paymentDetails.refundTime)}
            </div>
          )}

          <input
            type="text"
            placeholder="Bank Reference Number"
            name="referenceNumber"
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.referenceNumber}
            onChange={handlePaymentChange}
            required
          />

          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Refundpending;
