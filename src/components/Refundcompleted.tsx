/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { useEffect, useState } from "react";

const Refundcompleted = () => {
  const [data, setData] = useState<{
    isLoading: boolean;
    bookings: any[];
    error: null | string;
  }>({ isLoading: true, bookings: [], error: null });

  useEffect(() => {
    import("@/services/booking/bookinglist.service")
      .then(({ getRefundCompletedBookingList }) =>
        getRefundCompletedBookingList()
      )
      .then(({ data: bookingdata }) => {
        try {
          const values = bookingdata.bookings.map((l: any) => ({
            user: l.Booking?.User?.find((p: any) => !p.isCompanion),
            companion: l.Booking?.User?.find((p: any) => p.isCompanion),
            amount: l.netAmount,
            paymentmethod: l.metadata?.paymentMethod || "",
            transactiontime: formatBookingTimingsforUi(l.transactionTime),
            txid: l.txnId,
            payurefid: l.paymentGatewayTxnId,
          }));

          setData({
            isLoading: false,
            bookings: values,
            error: null,
          });
        } catch (err: any) {
          setData({ isLoading: false, bookings: [], error: err.message });
        }
      })
      .catch((err) => {
        console.error("API call failed:", err);
        setData({ isLoading: false, bookings: [], error: err.message });
      });
  }, []);

  return (
    <div>
      <table className="bg-white w-full h-full">
        <thead>
          <tr className="font-bold py-2 px-2 bg-slate-100">
            <th>User Email</th>
            <th>Companion Email</th>
            <th>Amount</th>
            <th>Refund Time</th>
            <th>Debit Mode</th>
            <th>Transaction ID</th>
            <th>Bank Ref. No</th>
          </tr>
        </thead>
        <tbody>
          {data.isLoading ? (
            <tr>
              <td colSpan={7}>Loading..</td>
            </tr>
          ) : data.error ? (
            <tr>
              <td colSpan={7}>Error Occurred: {data.error}</td>
            </tr>
          ) : !data.bookings.length ? (
            <tr>
              <td colSpan={7}>No Records found</td>
            </tr>
          ) : (
            data.bookings.map((l: any, i: number) => (
              <tr key={i}>
                <td>{l.user?.email || ""}</td>
                <td>{l.companion?.email || ""}</td>
                <td>{l.amount}</td>
                <td>{l.transactiontime}</td>
                <td>{l.paymentmethod}</td>
                <td>{l.txid}</td>
                <td>{l.payurefid}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Refundcompleted;
