import React, { useState } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Refundlist = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="flex justify-end rounded-lg">
        <button
          className=" p-2 bg-slate-400"
          onClick={() => setIsModalOpen(true)}
        >
          Add a refund
        </button>
      </div>
      <div>
        <h1 className="text-xl my-2">Refund list </h1>
        <div className="bg-white w-full h-full">
          <div className="flex justify-between font-bold py-2 px-2 bg-slate-100">
            <h1>Email</h1>
            <h1>Amount</h1>
            <h1>Refund time</h1>
            <h1>Debit mode</h1>
            <h1>transaction id</h1>
            <h1>bank ref.no</h1>
            <h1>bank/app/upi</h1>
          </div>
          <div className="flex justify-between items-center  py-2 px-2 hover:bg-slate-200">
            <h1 className="text-sm">xyz@gmail.com</h1>
            <h1 className="text-sm">250</h1>
            <h1 className="text-sm">12 may 2024</h1>
            <h1 className="text-sm">Debit card</h1>
            <h1 className="text-sm">ggsggsg1234</h1>
            <h1 className="text-sm">0987g1234</h1>
            <h1 className="text-sm">statebankofindia</h1>
          </div>

          <div className="flex justify-between items-center  py-2 px-2 hover:bg-slate-200">
            <h1 className="text-sm">Pending@gmail.com</h1>
            <h1 className="text-sm">250</h1>
            <h1 className="text-sm">12 may 2024</h1>
            <h1 className="text-sm">UPI</h1>
            <h1 className="text-sm">1234555hffh</h1>
            <h1 className="text-sm">87676555hffh</h1>
            <h1 className="text-sm">sahwaz15@ybl</h1>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [formData, setFormData] = useState({
    email: "",
    amount: "",
    paymentMode: "",
    bankRef: "",
    transactionId: "",
    upiId: "",
    cardNumber: "",
    walletName: "",
    bankName: "",
    bank: "",
  });

  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getRefundDateTime = () => {
    if (!date || !hour || !minute || !ampm) return "";
    let h = parseInt(hour);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    return `${date}T${String(h).padStart(2, "0")}:${minute}`;
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }

    if (
      !formData.amount ||
      isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount = "Enter a valid refund amount.";
    }

    if (!formData.paymentMode) {
      newErrors.paymentMode = "Select a payment mode.";
    }

    if (!getRefundDateTime()) {
      newErrors.refundDateTime = "Date & time of refund is required.";
    }

    if (!formData.bankRef) {
      newErrors.bankRef = "Bank reference number is required.";
    }

    if (!formData.transactionId) {
      newErrors.transactionId = "Transaction ID is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const refundDateTime = getRefundDateTime();
      console.log("Submitted Data:", {
        ...formData,
        refundDateTime,
      });
      alert("Refund submitted!");
      onClose();
    }
  };

  if (!isOpen) return null;

  const { paymentMode } = formData;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Refund Information</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Refunded Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Payment Mode</label>
            <select
              name="paymentMode"
              value={formData.paymentMode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Mode</option>
              <option value="upi">UPI</option>
              <option value="debit_card">Debit Card</option>
              <option value="credit_card">Credit Card</option>
              <option value="rtgs">RTGS</option>
              <option value="imps">IMPS</option>
              <option value="wallet">Wallet</option>
              <option value="emi">EMI</option>
              <option value="net_banking">Net Banking</option>
            </select>
            {errors.paymentMode && (
              <p className="text-red-500 text-sm">{errors.paymentMode}</p>
            )}
          </div>

          {paymentMode === "upi" && (
            <div>
              <label className="block text-sm font-medium">UPI ID</label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          {["debit_card", "credit_card", "emi"].includes(paymentMode) && (
            <div>
              <label className="block text-sm font-medium">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          {paymentMode === "wallet" && (
            <div>
              <label className="block text-sm font-medium">Wallet Name</label>
              <input
                type="text"
                name="walletName"
                value={formData.walletName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          {paymentMode === "net_banking" && (
            <div>
              <label className="block text-sm font-medium">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          {["rtgs", "imps"].includes(paymentMode) && (
            <div>
              <label className="block text-sm font-medium">Bank</label>
              <input
                type="text"
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium">Refund Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.refundDateTime && (
              <p className="text-red-500 text-sm">{errors.refundDateTime}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Refund Time</label>
            <div className="flex gap-2">
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="w-1/3 px-3 py-2 border rounded"
              >
                <option value="">HH</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="w-1/3 px-3 py-2 border rounded"
              >
                <option value="">MM</option>
                {["00", "15", "30", "45"].map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
              <select
                value={ampm}
                onChange={(e) => setAmpm(e.target.value)}
                className="w-1/3 px-3 py-2 border rounded"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.transactionId && (
              <p className="text-red-500 text-sm">{errors.transactionId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Bank Reference Number
            </label>
            <input
              type="text"
              name="bankRef"
              value={formData.bankRef}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.bankRef && (
              <p className="text-red-500 text-sm">{errors.bankRef}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Refundlist;
