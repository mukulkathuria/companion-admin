import React, { useState } from "react";
import { Link } from "react-router-dom";


function formatTo12Hour(time24: string) {
    const [hours, minutes] = time24.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  }

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
  };

const Refundpending = () => {
      const [isModalOpen, setIsModalOpen] = useState(false);
    
  return (
      <>
          
          <div>
            <div className="flex items-center  gap-5 my-3 font-semibold">
    
            
      <Link to={'/refund/completed'}>  <div className=" cursor-pointer">
              Refund Completed
            </div>
            </Link>    
            <div className="cursor-pointer bottom-border">
            
              Refund Pending
            </div>
            </div>
            <div className="bg-white w-full h-full">
              <div className="flex justify-between font-bold py-2 px-2 bg-slate-100">
                <h1>Email</h1>
                <h1>Amount</h1>
                
                
                
                <h1>Cancelled By</h1>
                <h1>Booking date and time</h1>
              </div>
              <div className="flex justify-between items-center  py-2 px-2 hover:bg-slate-200" onClick={() => setIsModalOpen(true)}>
                <h1 className="text-sm">xyz@gmail.com</h1>
                <h1 className="text-sm">250</h1>
                <h1 className="text-sm">User</h1>
                <h1 className="text-sm">12 may,25 11AM-1PM</h1>
               
              </div>
    
              <div className="flex justify-between items-center  py-2 px-2 hover:bg-slate-200" onClick={() => setIsModalOpen(true)}>
                <h1 className="text-sm">Pending@gmail.com</h1>
                <h1 className="text-sm">4000</h1>
                <h1 className="text-sm">Admin</h1>
                <h1 className="text-sm">15 may,25</h1>
               
              </div>
            </div>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
  )
}



export const Modal = ({ isOpen, onClose }: ModalProps) => {
    const [email, setEmail] = useState("john@gmail.com");
    const [refundedAmount, setRefundedAmount] = useState("1000");
    const [paymentMode, setPaymentMode] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardCategory, setCardCategory] = useState("");
    const [walletName, setWalletName] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [bank, setBank] = useState("");
    const [refundDate, setRefundDate] = useState("");
    const [refundTime, setRefundTime] = useState("");
    const [referenceNumber, setReferenceNumber] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      const errors: string[] = [];
  
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Enter a valid email address.");
      }
  
      if (!refundedAmount || isNaN(Number(refundedAmount))) {
        errors.push("Refunded amount must be a number.");
      }
  
      if (!transactionId) errors.push("Transaction ID is required.");
      if (!refundDate) errors.push("Refund date is required.");
      if (!refundTime) errors.push("Refund time is required.");
      if (!referenceNumber) errors.push("Reference number is required.");
  
      if (errors.length > 0) {
        alert(errors.join("\n"));
        return;
      }
  
      const formattedTime = formatTo12Hour(refundTime);
  
      console.log({
        email,
        refundedAmount,
        paymentMode,
        transactionId,
        upiId,
        cardNumber,
        cardCategory,
        walletName,
        bankName,
        bankCode,
        bank,
        refundDate,
        refundTime: formattedTime,
        referenceNumber,
      });
      onClose();

    };
  
    if (!isOpen) return null;
  
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
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
  
            <input
              type="text"
              placeholder="Refunded Amount"
              className="w-full p-2 border border-gray-300 rounded"
              value={refundedAmount}
              onChange={(e) => setRefundedAmount(e.target.value)}
              required
            />
  
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              required
            >
              <option value="">Select Payment Mode</option>
              <option value="upi">UPI</option>
              <option value="debit">Debit Card</option>
              <option value="credit">Credit Card</option>
              <option value="rtgs">RTGS</option>
              <option value="imps">IMPS</option>
              <option value="wallet">Wallet</option>
              <option value="netbanking">Net Banking</option>
              <option value="other">Other</option>
            </select>
  
            {paymentMode === "upi" && (
              <input
                type="text"
                placeholder="UPI ID"
                className="w-full p-2 border border-gray-300 rounded"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
            )}
  
            {(paymentMode === "debit" || paymentMode === "credit") && (
              <>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Card Category"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={cardCategory}
                  onChange={(e) => setCardCategory(e.target.value)}
                  required
                />
              </>
            )}
  
            {paymentMode === "wallet" && (
              <input
                type="text"
                placeholder="Wallet Name"
                className="w-full p-2 border border-gray-300 rounded"
                value={walletName}
                onChange={(e) => setWalletName(e.target.value)}
                required
              />
            )}
  
            {paymentMode === "netbanking" && (
              <>
                <input
                  type="text"
                  placeholder="Bank Name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Bank Code"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={bankCode}
                  onChange={(e) => setBankCode(e.target.value)}
                  required
                />
              </>
            )}
  
            {(paymentMode === "rtgs" || paymentMode === "imps") && (
              <input
                type="text"
                placeholder="Bank"
                className="w-full p-2 border border-gray-300 rounded"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                required
              />
            )}
  
            <input
              type="text"
              placeholder="Transaction ID"
              className="w-full p-2 border border-gray-300 rounded"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
            />
  
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={refundDate}
              onChange={(e) => setRefundDate(e.target.value)}
              required
            />
  
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              value={refundTime}
              onChange={(e) => setRefundTime(e.target.value)}
              required
            />
            {refundTime && (
              <div className="text-sm text-gray-600">Formatted Time: {formatTo12Hour(refundTime)}</div>
            )}
  
            <input
              type="text"
              placeholder="Bank Reference Number"
              className="w-full p-2 border border-gray-300 rounded"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
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

export default Refundpending

