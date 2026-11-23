import { useState, useMemo } from "react";
import {
  //   DollarSign,
  Search,
  //   Filter,
  Download,
  //   AlertTriangle,
  //   CheckCircle2,
  //   XCircle,
  //   RotateCcw,
  //   Building2,
  ShieldAlert,
  ArrowUpRight,
  //   CreditCard,
  FileSpreadsheet,
  //   Calendar,
  X,
} from "lucide-react";

// Mock Financial Transactions Dataset
const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-9081",
    bookingId: "BK-8821",
    guestName: "Eleanor Vance",
    hotelName: "The Obsidian Sanctum",
    ownerName: "Alistair Sterling",
    amount: "$6,250.00",
    commission: "$625.00 (10%)",
    payoutToOwner: "$5,625.00",
    status: "Successful", // "Successful" | "Failed" | "Refunded" | "Suspicious"
    paymentMethod: "Visa •••• 4242",
    date: "2026-09-01 14:22",
    isSuspicious: false,
  },
  {
    id: "TXN-9082",
    bookingId: "BK-9104",
    guestName: "Alexander Wright",
    hotelName: "Aura Chalet & Alpine Spa",
    ownerName: "Alistair Sterling",
    amount: "$9,400.00",
    commission: "$940.00 (10%)",
    payoutToOwner: "$8,460.00",
    status: "Successful",
    paymentMethod: "Mastercard •••• 8810",
    date: "2026-09-02 09:15",
    isSuspicious: false,
  },
  {
    id: "TXN-9083",
    bookingId: "BK-9442",
    guestName: "Unknown IP Proxy",
    hotelName: "Villa Celestial Santorini",
    ownerName: "Beatrice Leclair",
    amount: "$14,500.00",
    commission: "$1,450.00",
    payoutToOwner: "$13,050.00",
    status: "Suspicious",
    paymentMethod: "Stolen Card Flag",
    date: "2026-09-03 23:40",
    isSuspicious: true,
  },
  {
    id: "TXN-9084",
    bookingId: "BK-7110",
    guestName: "Sophia Martinez",
    hotelName: "The Midnight Tower Tokyo",
    ownerName: "Kenji Takahashi",
    amount: "$3,450.00",
    commission: "$345.00 (10%)",
    payoutToOwner: "$3,105.00",
    status: "Refunded",
    paymentMethod: "Amex •••• 1005",
    date: "2026-08-20 11:10",
    isSuspicious: false,
  },
  {
    id: "TXN-9085",
    bookingId: "BK-9951",
    guestName: "Marcus Chen",
    hotelName: "The Obsidian Sanctum",
    ownerName: "Alistair Sterling",
    amount: "$2,800.00",
    commission: "$280.00",
    payoutToOwner: "$2,520.00",
    status: "Failed",
    paymentMethod: "Visa •••• 9921",
    date: "2026-09-04 16:05",
    isSuspicious: false,
  },
];

export default function PaymentManagementTab() {
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All"); // 'All' | 'Successful' | 'Failed' | 'Refunded' | 'Suspicious'

  // Modal State
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showReportModal, setShowReportModal] = useState(false);

  // Financial Metrics Summary Calculations
  const totalVolume = "$36,400.00";
  const platformCommissionTotal = "$3,640.00";
  const pendingOwnerPayouts = "$17,210.00";

  // Filter Transactions logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.hotelName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || txn.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchQuery, statusFilter]);

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  return (
    <div className="space-y-6 text-zinc-100 font-sans">
      {/* 1. SECTION HEADER & FINANCIAL METRICS CARDS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-tight">
            Payment & Transaction Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Monitor payment gateway flows, platform commissions, owner
            disbursements, and security flags.
          </p>
        </div>

        {/* Generate Financial Report Action Button */}
        <button
          onClick={handleGenerateReport}
          className="flex items-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Generate Financial Report</span>
        </button>
      </div>

      {/* 3 SUMMARY METRICS TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-md shadow-xl">
          <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
            Total Volume Processed
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-zinc-100">
              {totalVolume}
            </span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
              +14.2% this month
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-md shadow-xl">
          <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
            Platform Commission (10%)
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-amber-400">
              {platformCommissionTotal}
            </span>
            <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 font-mono">
              Verified Revenue
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-md shadow-xl">
          <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
            Pending Owner Payouts
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-serif font-bold text-zinc-100">
              {pendingOwnerPayouts}
            </span>
            <span className="text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20 font-mono">
              Ready for Disbursement
            </span>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & TABS FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by transaction ID, guest, or booking..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs overflow-x-auto">
          {["All", "Successful", "Failed", "Refunded", "Suspicious"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  statusFilter === status
                    ? "bg-amber-400 text-zinc-950 font-semibold shadow-md"
                    : "text-zinc-400 hover:text-zinc-100"
                }`}
              >
                {status}
              </button>
            ),
          )}
        </div>
      </div>

      {/* 3. TRANSACTIONS DATA TABLE */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-amber-400 uppercase tracking-wider font-mono border-b border-zinc-800 text-[10px]">
              <tr>
                <th className="py-4 px-6">Transaction ID / Booking</th>
                <th className="py-4 px-4">Guest & Hotel</th>
                <th className="py-4 px-4">Owner Payout</th>
                <th className="py-4 px-4">Commission</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4 text-right">Amount</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-zinc-500">
                    No transactions match the selected filter or search
                    criteria.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className={`hover:bg-zinc-800/30 transition-colors ${txn.isSuspicious ? "bg-rose-500/5" : ""}`}
                  >
                    {/* ID & Booking */}
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-mono font-bold text-amber-400">
                          {txn.id}
                        </span>
                        <p className="text-[10px] text-zinc-500 font-mono">
                          Ref: {txn.bookingId}
                        </p>
                        <span className="text-[10px] text-zinc-400 block">
                          {txn.date}
                        </span>
                      </div>
                    </td>

                    {/* Guest & Hotel */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-zinc-200">
                        {txn.guestName}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        {txn.hotelName}
                      </p>
                    </td>

                    {/* Owner Payout */}
                    <td className="py-4 px-4">
                      <p className="font-mono text-zinc-200">
                        {txn.payoutToOwner}
                      </p>
                      <p className="text-[10px] text-zinc-500 truncate max-w-[120px]">
                        {txn.ownerName}
                      </p>
                    </td>

                    {/* Commission */}
                    <td className="py-4 px-4 font-mono text-amber-400/90 font-medium">
                      {txn.commission}
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          txn.status === "Successful"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : txn.status === "Refunded"
                              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              : txn.status === "Suspicious"
                                ? "bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse font-extrabold"
                                : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {txn.status === "Suspicious" && (
                          <ShieldAlert className="w-3 h-3" />
                        )}
                        {txn.status}
                      </span>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 px-4 text-right font-serif font-bold text-zinc-100 text-sm">
                      {txn.amount}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSelectedTxn(txn)}
                        className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-amber-400 transition-colors"
                        title="View Transaction Details"
                      >
                        <ArrowUpRight className="w-4 h-4" />
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
      {/* MODAL: TRANSACTION INSPECTOR & SECURITY FRAUD AUDIT                */}
      {/* ------------------------------------------------------------------ */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <span className="font-mono text-xs text-amber-400">
                  {selectedTxn.id}
                </span>
                <h3 className="text-lg font-serif font-bold text-zinc-100">
                  Transaction Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1 text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedTxn.isSuspicious && (
              <div className="bg-rose-500/10 border border-rose-500/30 p-3.5 rounded-xl flex items-start gap-3 text-xs text-rose-300">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-rose-400 block font-bold">
                    Fraud Alert Flagged
                  </strong>
                  <span>
                    Automated gateway security identified mismatched IP
                    geolocation and suspicious proxy behavior. Payout frozen.
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl space-y-2">
                <div className="flex justify-between text-zinc-400">
                  <span>Payment Gateway Method:</span>
                  <span className="text-zinc-200 font-medium">
                    {selectedTxn.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Associated Booking:</span>
                  <span className="text-amber-400 font-mono font-bold">
                    {selectedTxn.bookingId}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Hotel Beneficiary:</span>
                  <span className="text-zinc-200 font-medium">
                    {selectedTxn.hotelName}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Hotel Owner Payout:</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedTxn.payoutToOwner}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Platform Commission:</span>
                  <span className="text-amber-400 font-bold">
                    {selectedTxn.commission}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTxn(null)}
                className="py-2.5 px-5 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 rounded-xl text-xs font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL: GENERATE FINANCIAL REPORT DIALOG                            */}
      {/* ------------------------------------------------------------------ */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Export Financial Report
              </h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <p className="text-zinc-400">
                Select report parameters for automated generation & export:
              </p>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono text-amber-400">
                  Report Scope
                </label>
                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:outline-none focus:border-amber-400">
                  <option>Full Platform Financial Ledger (Q3 2026)</option>
                  <option>Hotel Owner Payout Summaries</option>
                  <option>Platform Commission & Revenue Breakdown</option>
                  <option>Fraud & Suspicious Audit Logs</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase font-mono text-amber-400">
                  File Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 bg-zinc-950 border border-amber-400/40 text-amber-400 rounded-xl font-bold">
                    CSV / Excel (.csv)
                  </button>
                  <button className="py-2.5 bg-zinc-950 border border-zinc-800 text-zinc-300 rounded-xl font-medium">
                    Adobe PDF (.pdf)
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex justify-end space-x-3">
              <button
                onClick={() => setShowReportModal(false)}
                className="py-2.5 px-4 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(
                    "Financial report generated and downloaded successfully.",
                  );
                  setShowReportModal(false);
                }}
                className="py-2.5 px-5 bg-amber-400 text-zinc-950 hover:bg-amber-300 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
