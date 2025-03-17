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
import Companioncancel from "./components/Companioncancel";
import Companioncanceldetail from "./components/Companioncanceldetail";
import Usercancel from "./components/Usercancel";

export type Tab =
  | "requests"
  | "create"
  | "update"
  | "track"
  | "tickets"
  | "analytics"
  "becompanion"

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
          <Route path="/becompanion" element={<Becompanion />} />
          <Route path="/becompaniondetail" element={<Becompaniondetail />} />
          <Route path="/rate" element={<Rate />} />
          <Route path="/rate/details" element={<RateDetail />} />
          <Route path="/companioncancel" element={<Companioncancel />} />
          <Route path="/companioncancel/detail" element={<Companioncanceldetail />} />
          <Route path="/usercancel" element={<Usercancel />} />
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
