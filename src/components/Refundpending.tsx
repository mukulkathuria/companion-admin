/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardTypeData, NetBankData, WalletBank } from "@/data/fakercreatedata";
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type ModalProps = {
  onClose: () => void;
  data: any;
};

const Refundpending = () => {
  const [isModalOpen, setIsModalOpen] = useState<any>(null);
  const [data, setData] = useState<{
    isLoading: boolean;
    data: any[];
    error: null | string;
  }>({ isLoading: true, data: [], error: null });

  useEffect(() => {
    import("@/services/booking/bookinglist.service")
      .then(({ getRefundPendingBookingList }) => getRefundPendingBookingList())
      .then(({ data }) => {
        if (data) {
        //  console.log(data);

          const values = data.map((l: any) => {
            const user = l.User.find((p: any) => !p.isCompanion);
            const companion = l.User.find((p: any) => p.isCompanion);

            // find latest cancelled entry
            const cancelledEntry = l.statusHistory
              ?.filter((h: any) => h.actionType === "CANCELLED")
              .sort(
                (a: any, b: any) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )[0];

            let cancelledBy: string | null = null;
            if (l.bookingstatus === "REJECTED") {
              cancelledBy = "Admin";
            } else if (cancelledEntry) {
              cancelledBy = cancelledEntry.actionPerformedBy; // USER / COMPANION / ADMIN
            }

            return {
              id: l.id,
              user,
              companion,
              refundamount: l.refundamount,
              finalRate: l.finalRate,
              bookingstart: l.bookingstart,
              cancelledBy,
            };
          });

          setData({ isLoading: false, data: values, error: null });
        }
      })
      .catch((err) => {
        console.error(err);
        setData({ isLoading: false, data: [], error: "Failed to fetch data" });
      });
  }, []);

  return (
    <>
      <div>
        <table className="bg-white w-full h-full">
          <thead>
            <tr className="font-bold py-2 px-2 bg-slate-100">
              <th>Email</th>
              <th>Amount</th>
              <th>Cancelled By</th>
              <th>Booking date and time</th>
            </tr>
          </thead>
          <tbody>
            {data.isLoading ? (
              <tr>
                <td>Loading..</td>
              </tr>
            ) : data.error ? (
              <tr>
                <td>Error Occurred</td>
              </tr>
            ) : !data.data?.length ? (
              <tr>
                <td>No Records found</td>
              </tr>
            ) : (
              data.data.map((l: any) => (
                <tr
                  key={l.id}
                  className="hover:bg-slate-200 cursor-pointer"
                  onClick={() => setIsModalOpen(l)}
                >
                  <td className="text-sm">{l.user?.email}</td>
                  <td className="text-sm">{l.refundamount || l.finalRate}</td>
                  <td className="text-sm">{l.cancelledBy}</td>
                  <td className="text-sm">
                    {formatBookingTimingsforUi(l.bookingstart)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(null)} data={isModalOpen} />
      )}
    </>
  );
};

export const Modal = ({ onClose, data }: ModalProps) => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    firstname: data.user?.firstname ?? "",
    lastname: data.user?.lastname ?? "",
    email: data.user?.email ?? "",
    refundedAmount: String(data.refundamount || data.finalRate),
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

    const { getRefundDetails } = await import("@/utils/refundpayment.utils");
    const { addRefundPaymentService } = await import(
      "@/services/transaction/refundamount.service"
    );

    const refundsDetails = getRefundDetails(paymentDetails);
    const { data: refundData, error } = await addRefundPaymentService({
      ...refundsDetails,
      bookingid: data.id,
    });
    const apicall = {
      
    }

    if (refundData) {
      toast.success("Successfully Added the Refund");
      navigate("/refund/completed");
      onClose();
    } else {
      toast.error(error);
    }
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

  const getfieldsforpaymentMethod = (paymentMode: string) => {
    switch (true) {
      case paymentMode === "UPI":
        return (
          <input
            type="text"
            placeholder="UPI ID"
            name="upiId"
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.upiId}
            onChange={handlePaymentChange}
            required
          />
        );
      case paymentMode === "DC" || paymentMode === "CC":
        return (
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
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={paymentDetails.cardCategory}
              onChange={(e) =>
                setPaymentDetails((l) => ({
                  ...l,
                  cardCategory: e.target.value,
                }))
              }
              required
            >
              <option value="">Select Card Category</option>
              {CardTypeData.map((l, i) => (
                <option value={l.value} key={i}>
                  {l.label}
                </option>
              ))}
            </select>
          </>
        );
      case paymentMode === "WALLET":
        return (
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.walletName}
            onChange={(e) =>
              setPaymentDetails((l) => ({
                ...l,
                walletName: e.target.value,
              }))
            }
            required
          >
            <option value="">Select Wallet Bank</option>
            {WalletBank.map((l, i) => (
              <option value={l.value} key={i}>
                {l.label}
              </option>
            ))}
          </select>
        );
      case paymentMode === "NB":
        return (
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.bankCode}
            onChange={(e) =>
              setPaymentDetails((l) => ({
                ...l,
                bankCode: e.target.value,
              }))
            }
            required
          >
            <option value="">Select NetBank</option>
            {NetBankData.map((l, i) => (
              <option value={l.value} key={i}>
                {l.label}
              </option>
            ))}
          </select>
        );
      case paymentMode === "RTGS" || paymentMode === "IMPS":
        return (
          <input
            type="text"
            placeholder="Bank"
            name="bank"
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.bank}
            onChange={handlePaymentChange}
            required
          />
        );
      default:
        return null;
    }
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
                bank: "",
                bankCode: "",
                bankName: "",
                upiId: "",
                cardCategory: "",
                cardNumber: "",
                walletName: "",
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

          {getfieldsforpaymentMethod(paymentDetails.paymentMode)}

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
