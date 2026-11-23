import { useState, useMemo } from "react";
import {
  //   LifeBuoy,
  Search,
  Filter,
  MessageSquare,
  //   User,
  //   Building2,
  //   AlertCircle,
  //   CheckCircle2,
  //   Clock,
  //   ShieldAlert,
  Send,
  //   UserPlus,
  X,
  //   ArrowUpRight,
  Tag,
} from "lucide-react";

// Mock Support & Complaints Dataset
const INITIAL_TICKETS = [
  {
    id: "SUP-1001",
    type: "Customer Complaint",
    reporterName: "Eleanor Vance",
    reporterEmail: "e.vance@sovereign.com",
    subject: "Private infinity pool temperature control issue",
    category: "Amenity Issue",
    priority: "High", // "High" | "Medium" | "Low"
    status: "In Progress", // "Open" | "In Progress" | "Resolved" | "Escalated"
    assignedTo: "Sarah Jenkins",
    date: "2026-09-12 11:30",
    description:
      "The private plunge pool heater at The Obsidian Sanctum failed to reach desired temperatures on arrival night.",
    messages: [
      {
        sender: "Eleanor Vance",
        text: "The pool is far too cold for evening use. Please have maintenance look into this.",
        time: "Sep 12, 11:30 AM",
      },
      {
        sender: "Sarah Jenkins (Support)",
        text: "Good day Ms. Vance. We have notified the resort manager and an engineer is en route to your villa.",
        time: "Sep 12, 12:05 PM",
      },
    ],
  },
  {
    id: "SUP-1002",
    type: "Hotel Owner Complaint",
    reporterName: "Alistair Sterling",
    reporterEmail: "alistair@sterlingluxury.com",
    subject: "Delayed disbursement for Booking BK-8821",
    category: "Payment Issue",
    priority: "High",
    status: "Open",
    assignedTo: "Unassigned",
    date: "2026-09-14 09:15",
    description:
      "Payout for the recent Presidential Suite stay has not reflected in our corporate account after 3 business days.",
    messages: [
      {
        sender: "Alistair Sterling",
        text: "Please expedite the wire transfer for booking BK-8821.",
        time: "Sep 14, 09:15 AM",
      },
    ],
  },
  {
    id: "SUP-1003",
    type: "Customer Complaint",
    reporterName: "Alexander Wright",
    reporterEmail: "a.wright@architects.io",
    subject: "Booking Dispute: Incorrect date charging",
    category: "Booking Dispute",
    priority: "Medium",
    status: "Resolved",
    assignedTo: "David Ross",
    date: "2026-09-02 16:45",
    description:
      "Charged for 6 nights instead of 5 due to timezone sync error during check-out.",
    messages: [
      {
        sender: "Alexander Wright",
        text: "Please review invoice #BK-9104.",
        time: "Sep 2, 4:45 PM",
      },
      {
        sender: "David Ross (Support)",
        text: "Audit complete. We have authorized a 1-night credit refund to your card.",
        time: "Sep 3, 10:00 AM",
      },
    ],
  },
];

export default function SupportManagementTab() {
  const [tickets, setTickets] = useState(INITIAL_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All"); // 'All' | 'Customer Complaint' | 'Hotel Owner Complaint'
  const [statusFilter, setStatusFilter] = useState("All"); // 'All' | 'Open' | 'In Progress' | 'Resolved' | 'Escalated'

  // Active Ticket Modal Drawer for communication & updates
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  // const [assigneeInput, setAssigneeInput] = useState("");

  // Filter Tickets logic
  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      const matchesSearch =
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.subject.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = typeFilter === "All" || t.type === typeFilter;
      const matchesStatus = statusFilter === "All" || t.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [tickets, searchQuery, typeFilter, statusFilter]);

  // Update Status Handler
  const handleUpdateStatus = (ticketId, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t)),
    );
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Assign Ticket Handler
  const handleAssignTicket = (ticketId, staffName) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId ? { ...t, assignedTo: staffName } : t,
      ),
    );
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket((prev) => ({ ...prev, assignedTo: staffName }));
    }
  };

  // Send Message / Reply Handler
  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicket) return;

    const newMessage = {
      sender: "Admin Support",
      text: replyMessage,
      time: "Just now",
    };

    const updatedMessages = [...selectedTicket.messages, newMessage];

    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id ? { ...t, messages: updatedMessages } : t,
      ),
    );
    setSelectedTicket((prev) => ({ ...prev, messages: updatedMessages }));
    setReplyMessage("");
  };

  return (
    <div className="space-y-6 text-zinc-100 font-sans">
      {/* 1. SECTION HEADER & FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-tight">
            Support & Complaint Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Resolve customer grievances, investigate owner payment disputes,
            assign agents, and track ticket resolutions.
          </p>
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs overflow-x-auto">
          {["All", "Customer Complaint", "Hotel Owner Complaint"].map(
            (type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  typeFilter === type
                    ? "bg-amber-400 text-zinc-950 font-semibold shadow-md"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {type === "All"
                  ? "All Tickets"
                  : type === "Customer Complaint"
                    ? "Customer Tickets"
                    : "Owner Tickets"}
              </button>
            ),
          )}
        </div>
      </div>

      {/* 2. SEARCH & STATUS FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search ticket ID, reporter, or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-zinc-200 focus:outline-none cursor-pointer"
          >
            <option value="All" className="bg-zinc-900">
              All Statuses
            </option>
            <option value="Open" className="bg-zinc-900">
              Open
            </option>
            <option value="In Progress" className="bg-zinc-900">
              In Progress
            </option>
            <option value="Resolved" className="bg-zinc-900">
              Resolved
            </option>
            <option value="Escalated" className="bg-zinc-900">
              Escalated
            </option>
          </select>
        </div>
      </div>

      {/* 3. SUPPORT TICKETS DATA TABLE */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-amber-400 uppercase tracking-wider font-mono border-b border-zinc-800 text-[10px]">
              <tr>
                <th className="py-4 px-6">Ticket ID / Reporter</th>
                <th className="py-4 px-4">Subject & Category</th>
                <th className="py-4 px-4">Priority</th>
                <th className="py-4 px-4">Assigned Agent</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-zinc-500">
                    No support tickets match your search or filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    {/* ID & Reporter */}
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-mono font-bold text-amber-400">
                          {ticket.id}
                        </span>
                        <p className="font-medium text-zinc-100">
                          {ticket.reporterName}
                        </p>
                        <span className="text-[10px] text-zinc-500">
                          {ticket.type}
                        </span>
                      </div>
                    </td>

                    {/* Subject & Category */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-zinc-200">
                        {ticket.subject}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-amber-400/80 mt-0.5">
                        <Tag className="w-3 h-3" /> {ticket.category}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          ticket.priority === "High"
                            ? "text-rose-400 bg-rose-500/10 border border-rose-500/20"
                            : "text-zinc-300 bg-zinc-800"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>

                    {/* Assigned Agent */}
                    <td className="py-4 px-4 font-mono text-zinc-300">
                      {ticket.assignedTo}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          ticket.status === "Resolved"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : ticket.status === "In Progress"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : ticket.status === "Escalated"
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse"
                                : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-semibold text-zinc-200 hover:text-amber-400 hover:border-amber-400/40 transition-all flex items-center gap-1.5 ml-auto"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                        <span>Manage Ticket</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL / DRAWER: TICKET INSPECTOR & COMMUNICATION CONSOLE           */}
      {/* ------------------------------------------------------------------ */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border-l border-zinc-800 w-full max-w-2xl h-full p-6 space-y-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            {/* Top Header */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <div>
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    {selectedTicket.id}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-zinc-100">
                    {selectedTicket.subject}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-100 rounded-lg bg-zinc-950 border border-zinc-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Ticket Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase text-zinc-500 font-mono">
                    Reporter
                  </span>
                  <p className="font-bold text-zinc-200 truncate">
                    {selectedTicket.reporterName}
                  </p>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] uppercase text-zinc-500 font-mono">
                    Assigned Agent
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 truncate">
                      {selectedTicket.assignedTo}
                    </span>
                    <button
                      onClick={() =>
                        handleAssignTicket(selectedTicket.id, "Admin Staff")
                      }
                      className="text-[10px] text-zinc-400 hover:text-zinc-100 underline ml-1"
                    >
                      Assign
                    </button>
                  </div>
                </div>
                <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase text-zinc-500 font-mono">
                    Status Action
                  </span>
                  <select
                    value={selectedTicket.status}
                    onChange={(e) =>
                      handleUpdateStatus(selectedTicket.id, e.target.value)
                    }
                    className="bg-zinc-900 border border-zinc-800 text-xs text-amber-400 font-bold rounded-lg px-2 py-1 focus:outline-none w-full cursor-pointer"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Escalated">Escalated</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="bg-zinc-950 border border-zinc-800/80 p-4 rounded-xl space-y-1 text-xs">
                <span className="text-[10px] uppercase font-mono text-zinc-500">
                  Initial Description
                </span>
                <p className="text-zinc-300 leading-relaxed">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Messages Thread */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Communication Thread
                </h4>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                  {selectedTicket.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-2xl text-xs space-y-1 ${
                        msg.sender.includes("Support") ||
                        msg.sender.includes("Admin")
                          ? "bg-amber-400/10 border border-amber-400/20 ml-6 text-zinc-200"
                          : "bg-zinc-950 border border-zinc-800 mr-6 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                        <span className="font-bold text-amber-400/90">
                          {msg.sender}
                        </span>
                        <span>{msg.time}</span>
                      </div>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reply Input Form */}
            <form
              onSubmit={handleSendReply}
              className="pt-4 border-t border-zinc-800 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type response to customer or owner..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="py-3 px-5 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-md shadow-amber-400/20 flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" /> Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
