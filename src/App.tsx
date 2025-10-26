import { BrowserRouter, Routes, Route } from "react-router-dom";
import TicketsList from "./pages/TicketsList";
import TicketDetail from "./pages/TicketDetail";
import CreateTicket from "./pages/CreateTicket";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<TicketsList />} />
            <Route path="/tickets/new" element={<CreateTicket />} />
            <Route path="/tickets/:id" element={<TicketDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
