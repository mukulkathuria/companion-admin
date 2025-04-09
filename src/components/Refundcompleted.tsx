/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatBookingTimingsforUi } from "@/utils/booking.utils";
import { useEffect, useState } from "react";

const Refundcompleted = () => {
  const [data, setData] = useState<{
    isLoading: boolean;
    data: any;
    error: null | string;
  }>({ isLoading: true, data: null, error: null });

  useEffect(() => {
    import("@/services/booking/bookinglist.service")
      .then(({ getRefundCompletedBookingList }) =>
        getRefundCompletedBookingList()
      )
      .then(({ data: bookingdata }) => {
        if (bookingdata) {
          const values = bookingdata.bookings.map((l: any) => ({
            user: l.Bookings.User.filter((p: any) => !p.isCompanion)[0],
            companion: l.Bookings.User.filter((p: any) => p.isCompanion)[0],
            amount: l.amount,
            paymentmethod: l.paymentmethod,
            transactiontime: formatBookingTimingsforUi(l.transactionTime),
            txid: l.txnid,
            payurefid: l.payurefid,
          }));
          setData({
            isLoading: false,
            data: { ...bookingdata, bookings: values },
            error: null,
          });
        }
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
              <th>Refund time</th>
              <th>Debit mode</th>
              <th>transaction id</th>
              <th>bank ref.no</th>
            </tr>
          </thead>
          <tbody>
            {data.isLoading ? (
              <tr>
                <td>Loading..</td>
              </tr>
            ) : data.error ? (
              <tr>
                <td>Error Occoured</td>{" "}
              </tr>
            ) : !data.data.bookings?.length ? (
              <tr>
                <td>No Records found</td>
              </tr>
            ) : (
              data.data.bookings.map((l: any, i: number) => (
                <tr key={i}>
                  <td>{l.user?.email || ''}</td>
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
    </>
  );
};

export default Refundcompleted;
