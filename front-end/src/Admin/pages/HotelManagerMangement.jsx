import { useState, useMemo } from "react";
import {
  Building2,
  UserCheck,
  UserX,
  ShieldCheck,
  FileText,
  //   AlertCircle,
  //   Eye,
  //   CheckCircle,
  //   XCircle,
  //   Clock,
  MessageSquare,
  Search,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

// Mock Initial Data: Owners & Their Associated Hotels
const INITIAL_OWNERS = [
  {
    id: "OWN-501",
    name: "Alistair Sterling",
    email: "alistair@sterlingluxury.com",
    phone: "+44 20 7946 0192",
    verificationStatus: "Verified", // "Pending" | "Verified" | "Rejected"
    accountStatus: "Active", // "Active" | "Suspended"
    documentsUrl: "#",
    submittedAt: "2026-10-12",
    hotels: [
      {
        id: "HTL-101",
        name: "The Obsidian Sanctum",
        location: "Baa Atoll, Maldives",
        status: "Approved",
      },
      {
        id: "HTL-102",
        name: "Sterling Alpine Chalet",
        location: "Zermatt, Switzerland",
        status: "Pending Approval",
      },
    ],
    complaints: [
      {
        id: "CMP-01",
        date: "2026-10-28",
        subject: "Payout delay inquiry",
        status: "Resolved",
      },
    ],
  },
  {
    id: "OWN-502",
    name: "Beatrice Leclair",
    email: "beatrice@rivierastays.fr",
    phone: "+33 1 42 68 55 00",
    verificationStatus: "Pending",
    accountStatus: "Active",
    documentsUrl: "#",
    submittedAt: "2026-11-01",
    hotels: [
      {
        id: "HTL-103",
        name: "Leclair Riviera Palace",
        location: "Nice, France",
        status: "Pending Approval",
      },
    ],
    complaints: [],
  },
  {
    id: "OWN-503",
    name: "Kenji Takahashi",
    email: "kenji@tokyoresorts.jp",
    phone: "+81 3 5555 0143",
    verificationStatus: "Rejected",
    accountStatus: "Suspended",
    documentsUrl: "#",
    submittedAt: "2026-09-14",
    hotels: [
      {
        id: "HTL-104",
        name: "Tokyo Skyline Tower",
        location: "Tokyo, Japan",
        status: "Rejected",
      },
    ],
    complaints: [
      {
        id: "CMP-02",
        date: "2026-09-20",
        subject: "Unresponsive property management",
        status: "Open",
      },
    ],
  },
];

export default function OwnerManagementTab() {
  const [owners, setOwners] = useState(INITIAL_OWNERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState("all"); // 'all' | 'pendingOwners' | 'pendingHotels'

  // Modal states
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [activeModal, setActiveModal] = useState(null); // 'docs' | 'hotels' | 'complaints'

  // 1. Owner Verification Action
  const handleVerifyOwner = (ownerId, newStatus) => {
    setOwners((prev) =>
      prev.map((o) =>
        o.id === ownerId ? { ...o, verificationStatus: newStatus } : o,
      ),
    );
  };

  // 2. Owner Account Suspension/Activation Action
  const handleToggleAccountStatus = (ownerId) => {
    setOwners((prev) =>
      prev.map((o) => {
        if (o.id === ownerId) {
          const nextState =
            o.accountStatus === "Active" ? "Suspended" : "Active";
          return { ...o, accountStatus: nextState };
        }
        return o;
      }),
    );
  };

  // 3. Separate Hotel Approval Action (Independent of Owner Verification)
  const handleUpdateHotelStatus = (ownerId, hotelId, newHotelStatus) => {
    setOwners((prev) =>
      prev.map((o) => {
        if (o.id === ownerId) {
          const updatedHotels = o.hotels.map((h) =>
            h.id === hotelId ? { ...h, status: newHotelStatus } : h,
          );
          return { ...o, hotels: updatedHotels };
        }
        return o;
      }),
    );
  };

  // Filter Logic
  const filteredOwners = useMemo(() => {
    return owners.filter((owner) => {
      const matchesSearch =
        owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        owner.id.toLowerCase().includes(searchQuery.toLowerCase());

      if (filterTab === "pendingOwners") {
        return matchesSearch && owner.verificationStatus === "Pending";
      }
      if (filterTab === "pendingHotels") {
        const hasPendingHotel = owner.hotels.some(
          (h) => h.status === "Pending Approval",
        );
        return matchesSearch && hasPendingHotel;
      }
      return matchesSearch;
    });
  }, [owners, searchQuery, filterTab]);

  return (
    <div className="space-y-6 text-zinc-100 font-sans">
      {/* SECTION HEADER & TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h2 className="text-2xl font-serif font-bold tracking-tight">
            Hotel Owner Management
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Review partner credentials, oversee property approvals
            independently, and manage platform compliance.
          </p>
        </div>

        {/* Quick Filter Tabs */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setFilterTab("all")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${filterTab === "all" ? "bg-amber-400 text-zinc-950 font-semibold" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            All Owners
          </button>
          <button
            onClick={() => setFilterTab("pendingOwners")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${filterTab === "pendingOwners" ? "bg-amber-400 text-zinc-950 font-semibold" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            Pending Owner Verification
          </button>
          <button
            onClick={() => setFilterTab("pendingHotels")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${filterTab === "pendingHotels" ? "bg-amber-400 text-zinc-950 font-semibold" : "text-zinc-400 hover:text-zinc-100"}`}
          >
            Hotels Awaiting Approval
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-500" />
          <input
            type="text"
            placeholder="Search owners by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl pl-10 pr-4 py-2 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* OWNERS DATA TABLE */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/80 text-amber-400 uppercase tracking-wider font-mono border-b border-zinc-800 text-[10px]">
              <tr>
                <th className="py-4 px-6">Owner Profile</th>
                <th className="py-4 px-4">Contact Info</th>
                <th className="py-4 px-4">Owner Verification</th>
                <th className="py-4 px-4">Associated Hotels</th>
                <th className="py-4 px-4">Account State</th>
                <th className="py-4 px-6 text-right">Actions / Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {filteredOwners.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-zinc-500">
                    No matching hotel owners found.
                  </td>
                </tr>
              ) : (
                filteredOwners.map((owner) => (
                  <tr
                    key={owner.id}
                    className="hover:bg-zinc-800/30 transition-colors"
                  >
                    {/* Name & ID */}
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center font-bold text-amber-400 text-xs">
                          {owner.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-serif font-bold text-zinc-100">
                            {owner.name}
                          </p>
                          <span className="font-mono text-[10px] text-zinc-500">
                            {owner.id} • Joined {owner.submittedAt}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4">
                      <p className="text-zinc-200">{owner.email}</p>
                      <p className="text-[11px] text-zinc-500">{owner.phone}</p>
                    </td>

                    {/* Owner Verification Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          owner.verificationStatus === "Verified"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : owner.verificationStatus === "Pending"
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                              : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                        }`}
                      >
                        {owner.verificationStatus}
                      </span>
                    </td>

                    {/* Associated Hotels Count / Quick View */}
                    <td className="py-4 px-4">
                      <button
                        onClick={() => {
                          setSelectedOwner(owner);
                          setActiveModal("hotels");
                        }}
                        className="flex items-center space-x-1.5 text-amber-400 hover:underline font-medium"
                      >
                        <Building2 className="w-3.5 h-3.5" />
                        <span>
                          {owner.hotels.length} Hotel
                          {owner.hotels.length > 1 ? "s" : ""}
                        </span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>

                    {/* Account Status */}
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          owner.accountStatus === "Active"
                            ? "text-emerald-400 bg-emerald-950/40"
                            : "text-rose-400 bg-rose-950/40"
                        }`}
                      >
                        {owner.accountStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {/* Verify / Reject Owner buttons */}
                        {owner.verificationStatus === "Pending" ? (
                          <>
                            <button
                              onClick={() =>
                                handleVerifyOwner(owner.id, "Verified")
                              }
                              className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-[11px] font-semibold hover:bg-emerald-500/30 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleVerifyOwner(owner.id, "Rejected")
                              }
                              className="px-2.5 py-1 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-lg text-[11px] font-semibold hover:bg-rose-500/30 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedOwner(owner);
                              setActiveModal("docs");
                            }}
                            className="p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-amber-400 transition-colors"
                            title="Verify Documents"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        )}

                        {/* Suspend / Activate Account */}
                        <button
                          onClick={() => handleToggleAccountStatus(owner.id)}
                          className={`p-1.5 bg-zinc-950 border rounded-lg transition-colors ${
                            owner.accountStatus === "Active"
                              ? "text-zinc-400 hover:text-rose-400 border-zinc-800"
                              : "text-emerald-400 border-emerald-500/30"
                          }`}
                          title={
                            owner.accountStatus === "Active"
                              ? "Suspend Account"
                              : "Activate Account"
                          }
                        >
                          {owner.accountStatus === "Active" ? (
                            <UserX className="w-4 h-4" />
                          ) : (
                            <UserCheck className="w-4 h-4" />
                          )}
                        </button>

                        {/* Complaints Button */}
                        <button
                          onClick={() => {
                            setSelectedOwner(owner);
                            setActiveModal("complaints");
                          }}
                          className="relative p-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-amber-400 transition-colors"
                          title="View Complaints"
                        >
                          <MessageSquare className="w-4 h-4" />
                          {owner.complaints.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 1: VIEW ASSOCIATED HOTELS & INDEPENDENT HOTEL APPROVALS      */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "hotels" && selectedOwner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div>
                <h3 className="text-lg font-serif font-bold text-zinc-100">
                  Hotels Associated with {selectedOwner.name}
                </h3>
                <p className="text-xs text-zinc-400">
                  Owner Verification State:{" "}
                  <span className="text-amber-400 font-bold">
                    {selectedOwner.verificationStatus}
                  </span>
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-amber-400/10 border border-amber-400/20 p-3.5 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <strong className="text-amber-400">Important Policy:</strong>{" "}
                  Owner verification and hotel approvals are strictly
                  independent. Even if an owner is verified, each property must
                  be individually evaluated before going live.
                </p>
              </div>

              {selectedOwner.hotels.map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-zinc-950 border border-zinc-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-[10px] text-zinc-500">
                      {hotel.id}
                    </span>
                    <h4 className="font-serif font-bold text-base text-zinc-100">
                      {hotel.name}
                    </h4>
                    <p className="text-xs text-zinc-400">📍 {hotel.location}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        hotel.status === "Approved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : hotel.status === "Pending Approval"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/30"
                      }`}
                    >
                      {hotel.status}
                    </span>

                    {/* Independent Hotel Approval Actions */}
                    <select
                      value={hotel.status}
                      onChange={(e) =>
                        handleUpdateHotelStatus(
                          selectedOwner.id,
                          hotel.id,
                          e.target.value,
                        )
                      }
                      className="bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400 cursor-pointer"
                    >
                      <option value="Approved">Approve Hotel</option>
                      <option value="Pending Approval">Pending Review</option>
                      <option value="Rejected">Reject Hotel</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="py-2 px-5 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 rounded-xl text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 2: DOCUMENT VERIFICATION MODAL                               */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "docs" && selectedOwner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Owner Credentials & Documents
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-zinc-400">
                Reviewing legal registration, government identification, and
                commercial property ownership deeds for{" "}
                <strong className="text-zinc-200">{selectedOwner.name}</strong>.
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 p-3 rounded-xl">
                  <span className="text-zinc-300 font-medium">
                    Commercial_License_2026.pdf
                  </span>
                  <a
                    href={selectedOwner.documentsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 flex items-center gap-1 hover:underline"
                  >
                    View File <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 p-3 rounded-xl">
                  <span className="text-zinc-300 font-medium">
                    Identity_Verification_Passport.pdf
                  </span>
                  <a
                    href={selectedOwner.documentsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-400 flex items-center gap-1 hover:underline"
                  >
                    View File <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="py-2.5 px-5 bg-amber-400 text-zinc-950 hover:bg-amber-300 rounded-xl text-xs font-bold transition-all"
              >
                Done Reviewing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* MODAL 3: COMPLAINTS & MONITORING MODAL                             */}
      {/* ------------------------------------------------------------------ */}
      {activeModal === "complaints" && selectedOwner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="text-lg font-serif font-bold text-zinc-100">
                Owner Complaints & Activity
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1 text-zinc-400 hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedOwner.complaints.length === 0 ? (
              <div className="py-8 text-center text-zinc-500 text-xs">
                No active or historical complaints logged against this owner.
              </div>
            ) : (
              <div className="space-y-3">
                {selectedOwner.complaints.map((c, i) => (
                  <div
                    key={i}
                    className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-amber-400">
                        {c.id} • {c.date}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-300 font-bold">
                        {c.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-200 font-medium">
                      {c.subject}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="py-2 px-5 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
