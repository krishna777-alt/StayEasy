import { Trash2, UserCheck, UserX, Edit3, Eye, History } from "lucide-react";

function UserTable({
  filteredUsers,
  setActiveModal,
  setSelectedUser,
  handleOpenEdit,
  toggleBlockUser,
}) {
  return (
    <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          {/* Table Header */}
          <thead className="bg-zinc-950/80 text-amber-400/90 uppercase tracking-wider font-semibold border-b border-zinc-800 text-[10px]">
            <tr>
              <th className="py-4 px-6">User ID / Name</th>
              <th className="py-4 px-4">Contact Info</th>
              <th className="py-4 px-4">Role & Tier</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Joined Date</th>
              <th className="py-4 px-4 text-center">Stays</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-12 text-center text-zinc-500">
                  No matching registered user accounts found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-zinc-800/30 transition-colors"
                >
                  {/* ID & Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center font-bold text-amber-400 text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-100">
                          {user.name}
                        </p>
                        <span className="font-mono text-[10px] text-zinc-500">
                          {user.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Email & Phone */}
                  <td className="py-4 px-4">
                    <p className="text-zinc-200">{user.email}</p>
                    <p className="text-[11px] text-zinc-500">{user.phone}</p>
                  </td>

                  {/* Role */}
                  <td className="py-4 px-4">
                    <span className="bg-zinc-950 border border-zinc-800 px-2.5 py-1 rounded-md text-[11px] font-medium text-zinc-300">
                      {user.role}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        user.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : user.status === "Blocked"
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/30"
                            : "bg-zinc-800/80 text-zinc-400 border-zinc-700"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-400" : user.status === "Blocked" ? "bg-rose-400" : "bg-zinc-500"}`}
                      />
                      {user.status}
                    </span>
                  </td>

                  {/* Joined Date */}
                  <td className="py-4 px-4 text-zinc-400 font-mono">
                    {user.joinedDate}
                  </td>

                  {/* Total Bookings */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setActiveModal("history");
                      }}
                      className="font-bold text-amber-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                    >
                      <History className="w-3.5 h-3.5" />
                      {user.totalBookings}
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end space-x-1.5">
                      {/* View Profile */}
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setActiveModal("profile");
                        }}
                        className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Info */}
                      <button
                        onClick={() => handleOpenEdit(user)}
                        className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-amber-400 hover:border-amber-400/40 transition-colors"
                        title="Edit User Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Block / Unblock Toggle */}
                      <button
                        onClick={() => toggleBlockUser(user.id)}
                        className={`p-1.5 rounded-lg bg-zinc-950 border transition-colors ${
                          user.status === "Blocked"
                            ? "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
                            : "text-amber-400/80 border-zinc-800 hover:text-amber-400 hover:border-amber-400/40"
                        }`}
                        title={
                          user.status === "Blocked"
                            ? "Unblock Account"
                            : "Block Account"
                        }
                      >
                        {user.status === "Blocked" ? (
                          <UserCheck className="w-3.5 h-3.5" />
                        ) : (
                          <UserX className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Deactivate / Soft Delete */}
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setActiveModal("delete");
                        }}
                        className="p-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-500 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                        title="Deactivate / Retain Data"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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
  );
}

export default UserTable;
