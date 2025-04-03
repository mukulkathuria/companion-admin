import { Link } from "react-router-dom"

const Refundlist = () => {
  return (
    <div>
        <h1 className="text-xl my-2">Refund list </h1>
      <div className="bg-white w-full h-full">
        <div className="flex justify-between font-bold py-2 px-2 bg-slate-100">
            <h1>Email</h1>
            <h1>Amount</h1>
            
            <h1>Debit mode</h1>
            <h1>refund status</h1>
        </div>
      <div className="flex justify-between  py-2 px-2 hover:bg-slate-200">
            <h1 className="text-sm">xyz@gmail.com</h1>
            <h1 className="text-sm">250</h1>
            <select name="Paymentmode" id="" className="p-2">
            <option value="Mode">Payment mode</option>
            <option value="emi">EMI</option>
            <option value="wallet">wallet</option>
            <option value="Netbanking">Net Banking</option>
            <option value="card">Card(Credit/Debit)</option>
            <option value="neft/rtgs">NEFT/RTGS</option>
            <option value="upi">UPI</option>
          </select>
            <h1 className="bg-green-700 text-white p-2 rounded-xl">refunded</h1>
        </div>
        
   <div className="flex justify-between  py-2 px-2 hover:bg-slate-200">
            <h1 className="text-sm">Pending@gmail.com</h1>
            <h1 className="text-sm">250</h1>
            <select name="Paymentmode" id="" className="p-2">
            <option value="Mode">Payment mode</option>
            <option value="emi">EMI</option>
            <option value="wallet">wallet</option>
            <option value="Netbanking">Net Banking</option>
            <option value="card">Card(Credit/Debit)</option>
            <option value="neft/rtgs">NEFT/RTGS</option>
            <option value="upi">UPI</option>
          </select>
            <h1 className="bg-red-700 text-white p-2 rounded-xl">refund pending</h1>
        </div>
       
      </div>
    </div>
  )
}

export default Refundlist
