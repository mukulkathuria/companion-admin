/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { toast } from "sonner";
import { formatBookingTimingswithEndTime } from "@/utils/booking.utils";

interface EarningItem {
  txnId: any;
  id: string;
  Booking: {
    bookingstart: string;
    bookingend?: string;
  };
  netAmount: number;
  taxAmount: number;
  status: string;
  createdAt: string;
}

const RateDetail: FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const [companiondata, setCompanionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [earningstate, setEarningState] = useState<string>("");
  const [filterEarndata, setFilterEarndata] = useState<EarningItem[]>([]);
  const [totals, setTotals] = useState({ net: 0, tax: 0 });
  const [selectedEarnings, setSelectedEarnings] = useState<
    { txnId: string; netAmount: number }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  // Compute total selected
  const totalSelected = useMemo(
    () => selectedEarnings.reduce((sum, e) => sum + Number(e.netAmount), 0),
    [selectedEarnings]
  );

  useEffect(() => {
    const companionId = searchParams.get("companionId");
    if (!companionId) return;

    const fetchData = async () => {
      try {
        const { getCompanionRateDetailsService } = await import(
          "@/services/companion/companionrequest.service"
        );
        const { data } = await getCompanionRateDetailsService(companionId);

        if (data) {
          console.log(
            "Fetched companion data:",
            data.last7daysearnings[0]?.txnId
          );
          const { Convert24HoursPieChart, Convert7daysBarchart } = await import(
            "@/utils/booking.utils"
          );

          const values = {
            ...data,
            last24hoursbookings: Convert24HoursPieChart(
              data.last24hoursbookings || []
            ),
            last7daysbookings: Convert7daysBarchart(
              data.last7daysbookings || []
            ),
          };

          setCompanionData(values);

          let earnings: EarningItem[] = [];
          if (earningstate === "pending7days")
            earnings = data.last7daysearnings || [];
          else if (earningstate === "pending30days")
            earnings = data.last30daysearnings || [];
          else if (earningstate === "completed")
            earnings = data.completedearnings || [];

          setFilterEarndata(earnings);

          const net = earnings.reduce(
            (sum, item) => sum + (item.netAmount || 0),
            0
          );
          const tax = earnings.reduce(
            (sum, item) => sum + (item.taxAmount || 0),
            0
          );
          setTotals({ net, tax });
        }
      } catch (err) {
        console.error("Error fetching companion data:", err);
        toast.error("Failed to fetch companion data");
      }
    };

    fetchData();
  }, [searchParams, earningstate]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanionData((prev: any) => ({
      ...prev,
      bookingrate: e.target.value,
    }));
  };

  const validatePrice = (price: string): boolean => {
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Price must be a positive number");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const companionId = searchParams.get("companionId");
    if (!companionId) return;

    if (validatePrice(companiondata.bookingrate)) {
      try {
        const { updateCompanionBasePriceService } = await import(
          "@/services/companion/updatecompanion.service"
        );
        setIsLoading(true);
        const { data, error } = await updateCompanionBasePriceService(
          { updatedprice: Number(companiondata.bookingrate) },
          companionId
        );

        if (data) {
          toast.success("Successfully updated the price");
          navigate(-1);
        } else {
          toast.error(error || "Failed to update price");
        }
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const ids = selectedEarnings.map((e) => e.txnId); // txnIds
  const companionId = companiondata?.id || "";

  if (!companiondata) return <div>Loading...</div>;

  return (
    <>
      <div>
        <h1 className="text-xl font-bold">Companion detail</h1>
        <div className="becompanion-box">
          {companiondata.Images?.[0] && (
            <img src={companiondata.Images[0]} alt="profile" />
          )}
          <div className="flex justify-between my-3">
            <h1>
              Name:{" "}
              <span>
                {companiondata?.firstname + " " + companiondata?.lastname}
              </span>
            </h1>
            <h1>
              Age: <span>{companiondata?.age}</span>
            </h1>
            <h1>
              Gender: <span>{companiondata?.gender}</span>
            </h1>
          </div>
          <div className="flex justify-between my-3">
            <h1>
              City: <span>{companiondata?.city}</span>
            </h1>
            <h1>
              State: <span>{companiondata?.state}</span>
            </h1>
            <h1>
              Rating: <span>{companiondata?.averagerating}/5</span>
            </h1>
          </div>
          <div className="flex justify-between my-3">
            <h1>
              Total booking: <span>{companiondata?.totalbookinghours}hr</span>
            </h1>
          </div>

          <div>
            {companiondata?.last24hoursbookings?.length > 0 && (
              <div>
                <h1 className="font-bold">Booking in last 24 hour</h1>
                <Dailybooking data={companiondata?.last24hoursbookings} />
              </div>
            )}
            {companiondata?.last7daysbookings?.length > 0 && (
              <div>
                <h1 className="font-bold my-4">Booking in last one week</h1>
                <Weeklybooking data={companiondata?.last7daysbookings} />
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex justify-between">
              <div className="flex items-center">
                <h1>Price(per hour):</h1>
                <input
                  type="number"
                  value={companiondata.bookingrate}
                  onChange={handlePriceChange}
                  className="p-2 border rounded"
                  required
                  placeholder="Enter new price"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <button
                type="submit"
                className="bg-red-500 text-white py-1 mt-5 rounded"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Price"}
              </button>
            </form>
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <h1>Earning list</h1>
            <select
              className="border p-1 rounded"
              value={earningstate}
              onChange={(e) => setEarningState(e.target.value)}
            >
              <option value="">Select State</option>
              <option value="pending7days">Pending earnings of 7 days</option>
              <option value="pending30days">Pending earnings of 30 days</option>
              <option value="completed">Completed earnings</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between px-5 mt-4 py-3 rounded-lg bg-slate-400">
              <h1>Booking date and time</h1>
              <h1>Earned Amount</h1>
            </div>

            {filterEarndata.length > 0 ? (
              <>
                {filterEarndata.length > 0 ? (
                  <>
                    {filterEarndata.map((item) => {
                      const txnId = item.txnId; // use txnId
                      const isSelected = selectedEarnings.some(
                        (e) => e.txnId === txnId
                      );

                      const handleClick = () => {
                        if (isSelected) {
                          setSelectedEarnings((prev) =>
                            prev.filter((e) => e.txnId !== txnId)
                          );
                        } else {
                          setSelectedEarnings((prev) => [
                            ...prev,
                            { txnId, netAmount: item.netAmount },
                          ]);
                        }
                      };

                      return (
                        <div
                          key={txnId}
                          className={`flex justify-between px-5 mt-4 py-3 rounded-lg cursor-pointer ${
                            isSelected ? "bg-green-200" : "bg-slate-200"
                          }`}
                          onClick={handleClick}
                        >
                          <div>
                            <h1>
                              {formatBookingTimingswithEndTime(
                                item.Booking.bookingstart,
                                item.Booking.bookingend ?? ""
                              )}
                            </h1>
                          </div>
                          <div className="text-right">
                            <h1>₹{item.netAmount.toFixed(2)}</h1>
                            <p className="text-sm text-gray-500">
                              Tax: ₹{item.taxAmount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      );
                    })}

                    {selectedEarnings.length > 0 && (
                      <div className="mt-6 text-right">
                        <h1 className="text-lg font-bold">
                          Total of Selected: ₹
                          {selectedEarnings
                            .reduce((sum, e) => sum + e.netAmount, 0)
                            .toFixed(2)}
                        </h1>
                      </div>
                    )}

                    <button
                      className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Pay
                    </button>
                  </>
                ) : (
                  <p className="text-center mt-4 text-gray-500">
                    No earnings found
                  </p>
                )}
              </>
            ) : (
              <p className="text-center mt-4 text-gray-500">
                No earnings found
              </p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <RefundModal
          onClose={() => setIsModalOpen(false)}
          ids={ids}
          companionId={companionId}
        />
      )}
    </>
  );
};

interface WeeklybookingProps {
  data: {
    day: string;
    bookingHours: number;
  }[];
}

export const Dailybooking: FC<WeeklybookingProps> = ({ data }) => {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#D32F2F",
    "#7E57C2",
  ];
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="bookingHours"
            label={({ day }) => day}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} Hours`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

const Weeklybooking: FC<WeeklybookingProps> = ({ data }) => {
  return (
    <div style={{ width: "90%", height: 250 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis
            label={{
              value: "Booking Hours",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip />
          <Bar dataKey="bookingHours" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

interface RefundModalProps {
  onClose: () => void;
  ids: string[];
  companionId: string; // ✅ single string
}

export const RefundModal = ({
  onClose,
  ids,
  companionId,
}: RefundModalProps) => {
  const [paymentDetails, setPaymentDetails] = useState({
    firstName: "admin",
    lastName: "Side",
    email: "",
    refundedAmount: "2360",
    paymentMode: "",
    transactionId: "",
    upiId: "",
    cardNumber: "",
    cardCategory: "",
    walletName: "",
    bankCode: "",
    bank: "",
    refundDate: "",
    refundTime: "",
    referenceNumber: "",
  });

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const getFieldsForPaymentMethod = (paymentMode: string) => {
    switch (paymentMode) {
      case "UPI":
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
      case "DC":
      case "CC":
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
                setPaymentDetails((prev) => ({
                  ...prev,
                  cardCategory: e.target.value,
                }))
              }
              required
            >
              <option value="">Select Card Category</option>
              <option value="VISA">VISA</option>
              <option value="MASTER">MasterCard</option>
            </select>
          </>
        );
      case "WALLET":
        return (
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.walletName}
            onChange={(e) =>
              setPaymentDetails((prev) => ({
                ...prev,
                walletName: e.target.value,
              }))
            }
            required
          >
            <option value="">Select Wallet</option>
            <option value="Paytm">Paytm</option>
            <option value="PhonePe">PhonePe</option>
          </select>
        );
      case "NB":
        return (
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentDetails.bankCode}
            onChange={(e) =>
              setPaymentDetails((prev) => ({
                ...prev,
                bankCode: e.target.value,
              }))
            }
            required
          >
            <option value="">Select NetBank</option>
            <option value="HDFC">HDFC</option>
            <option value="SBI">SBI</option>
          </select>
        );
      case "RTGS":
      case "IMPS":
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: string[] = [];

    if (
      !paymentDetails.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(paymentDetails.email)
    )
      errors.push("Enter a valid email address.");
    if (
      !paymentDetails.refundedAmount ||
      isNaN(Number(paymentDetails.refundedAmount))
    )
      errors.push("Refunded amount must be a number.");
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

    const { companionPaymentModelService } = await import(
      "@/services/transaction/companionPayment.service"
    );
    const { getRefundDetails } = await import("@/utils/refundpayment.utils");

    const refundsDetails = getRefundDetails(paymentDetails);

    const data = await companionPaymentModelService({
      metadata: refundsDetails,
      txId: refundsDetails.txnid,
      netamount: Number(refundsDetails.net_amount_debit),
      ids:ids.join(","),
      companionId,
    });

    if (data?.error) {
      alert(data.error);
    } else {
      console.log("API call successful ✅", data);
      onClose();
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
                cardCategory: "",
                cardNumber: "",
                upiId: "",
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
            <option value="RTGS">RTGS</option>
            <option value="IMPS">IMPS</option>
          </select>

          {getFieldsForPaymentMethod(paymentDetails.paymentMode)}

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

export default RateDetail;
