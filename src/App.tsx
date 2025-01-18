import { useState } from 'react';
    import { Layout } from './components/Layout';
    import { Requests } from './components/Requests';
    import { CreateCompanion } from './components/CreateCompanion';
    import { UpdateCompanion } from './components/UpdateCompanion';
    import { TrackBookings } from './components/TrackBookings';
    import { Tickets } from './components/Tickets';
    import { Routes, Route } from 'react-router-dom';
    import { Analytics } from './components/Analytics';
    import { Toaster } from './components/ui/sonner';

    export type Tab = 'requests' | 'create' | 'update' | 'track' | 'tickets' | 'analytics';

    function App() {
      const [activeTab, setActiveTab] = useState<Tab>('requests');

      return (
        <>
          <Layout activeTab={activeTab} onTabChange={setActiveTab}>
            <Routes>
              <Route path="/requests" element={<Requests />} />
              <Route path="/requests/:requestId" element={<Requests />} />
              <Route path="/create" element={<CreateCompanion />} />
              <Route path="/update" element={<UpdateCompanion />} />
              <Route path="/update/:requestId" element={<UpdateCompanion />} />
              <Route path="/track" element={<TrackBookings />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/tickets/:ticketId" element={<Tickets />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/" element={<Requests />} /> {/* Default route */}
            </Routes>
          </Layout>
          <Toaster />
        </>
      );
    }

    export default App;
