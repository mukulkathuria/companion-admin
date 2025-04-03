import { useState } from "react";
import Layout  from "./components/Layout";
import { Requests } from "./components/Requests";
import { CreateCompanion } from "./components/CreateCompanion";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import Login from "./components/Login/login";
import { BookingList } from "./components/BookingList";
import { IssuesList } from "./components/IssuesList";
import { IssueDetails } from "./components/IssueDetails";
import { BookingDetails } from "./components/BookingDetails";
import { UpdateCompanionRequest } from "./components/UpdateCompanionRequest";
import { UpdateCompanionDetails } from "./components/UpdateCompanionDetails";
import Becompanion from "./components/Becompanion";
import Becompaniondetail from "./components/Becompaniondetail";
import Rate from "./components/Rate";
import RateDetail from "./components/RateDetail";
import Admincancel from "./components/Admincancel";
import Refundlist from "./components/Refundlist";
import Refunddetails from "./components/Refunddetails";

export type Tab =
  | "requests"
  | "create"
  | "update"
  | "track"
  | "tickets"
  | "companionrequest"
  | "companionrates"

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("requests");

  return (
    <>
      <Routes>
        <Route element={<Layout activeTab={activeTab} onTabChange={setActiveTab} />}>
          <Route path="/requests/*" element={<Requests />} />
          <Route path="/create" element={<CreateCompanion />} />
          <Route path="/update" element={<UpdateCompanionRequest />} />
          <Route path="/update/request" element={<UpdateCompanionDetails />} />
          <Route path="/track" element={<BookingList />} />
          <Route path="/track/bookingdetails" element={<BookingDetails />} />
          <Route path="/tickets" element={<IssuesList />} />
          <Route path="/tickets/issuedetails" element={<IssueDetails />} />
          <Route path="/companionrequest" element={<Becompanion />} />
          <Route path="/companionrequest/details" element={<Becompaniondetail />} />
          <Route path="/companionrates" element={<Rate />} />
          <Route path="/companionrates/details" element={<RateDetail />} />
          <Route path="/admincancel" element={<Admincancel />} />
          <Route path="/refundlist" element={<Refundlist />} />
          <Route path="/refund/detail" element={<Refunddetails />} />
          {/* <Route path="/analytics" element={<Analytics />} /> */}
        </Route>
        {/* <Layout activeTab={activeTab} onTabChange={setActiveTab}> */}
        {/* </Layout> */}
        <Route path="/" element={<Login />} /> {/* Default route */}
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
