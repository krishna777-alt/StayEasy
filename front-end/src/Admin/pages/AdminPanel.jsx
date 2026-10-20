import { useState } from "react";
import {
  Building2,
  BedDouble,
  CalendarCheck,
  Settings,
  Users,
  LogIn,
  LogOut,
  Bell,
  Plus,
  TrendingUp,
  DollarSign,
  //   Search,
  ShieldCheck,
  //   CheckCircle2,
  Wifi,
  Coffee,
  Tv,
  //   ChevronRight,
  UserPlus,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("hotel");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Sidebar navigation options
  const navItems = [
    { id: "hotel", label: "View Hotel", icon: Building2 },
    { id: "rooms", label: "Rooms", icon: BedDouble },
    { id: "bookings", label: "Bookings", icon: CalendarCheck },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("login");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setActiveTab("hotel");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row font-sans">
      {/* LEFT SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 bg-zinc-900/90 border-r border-zinc-800/80 p-6 flex flex-col justify-between backdrop-blur-md">
        <div className="space-y-8">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-zinc-950 font-serif font-bold text-xl shadow-lg shadow-amber-400/20">
              S
            </div>
            <div>
              <span className="text-xl font-serif font-bold tracking-wide text-zinc-100">
                Stay<span className="text-amber-400">Easy</span>
              </span>
              <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-amber-400 text-zinc-950 font-semibold shadow-lg shadow-amber-400/10"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "text-zinc-950" : "text-amber-400"}`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Auth State & Manager Profile */}
        <div className="pt-6 border-t border-zinc-800/80 space-y-3">
          {isLoggedIn ? (
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 border border-amber-400/40 flex items-center justify-center text-amber-400 font-bold text-sm">
                  AD
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200">
                    System Admin
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    admin@stayeasy.com
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab("login")}
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 hover:bg-amber-400/20 transition-all"
            >
              <LogIn className="w-4 h-4" />
              <span>Login to Portal</span>
            </button>
          )}
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8">
        {/* Top Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-100 capitalize">
              {activeTab === "hotel" && "Hotel Overview"}
              {activeTab === "rooms" && "Rooms & Suites"}
              {activeTab === "bookings" && "Reservations Log"}
              {activeTab === "users" && "User Management"}
              {activeTab === "settings" && "Global Settings"}
              {activeTab === "login" && "Admin Authentication"}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Control suite inventory, monitor guest logs, and manage property
              configurations.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-amber-400 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
            </button>
            <button className="flex items-center space-x-2 rounded-xl bg-amber-400 hover:bg-amber-300 px-4 py-2.5 text-xs font-semibold text-zinc-950 transition-colors shadow-lg shadow-amber-400/20">
              <Plus className="w-4 h-4" />
              <span>Add Property</span>
            </button>
          </div>
        </header>

        {/* Dynamic Tab Views */}
        {activeTab === "hotel" && <ViewHotelTab />}
        {activeTab === "rooms" && <RoomsTab />}
        {activeTab === "bookings" && <BookingsTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "settings" && <SettingsTab />}
        {activeTab === "login" && <LoginTab onLogin={handleLogin} />}
      </main>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 1. VIEW HOTEL TAB                                                          */
/* -------------------------------------------------------------------------- */
function ViewHotelTab() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$128,450",
      change: "+14.2%",
      icon: DollarSign,
    },
    {
      title: "Occupancy Rate",
      value: "88.5%",
      change: "+5.4%",
      icon: TrendingUp,
    },
    { title: "Active Guests", value: "342", change: "+12", icon: Users },
  ];

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-md shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                  {stat.title}
                </span>
                <div className="p-2 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-serif font-bold text-zinc-100">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hotel Showcase Card */}
      <div className="relative rounded-3xl overflow-hidden border border-zinc-800 group min-h-[300px] flex items-end p-8">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
          alt="StayEasy Resort"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

        <div className="relative z-10 space-y-2 max-w-2xl">
          <span className="px-3 py-1 rounded-full bg-amber-400 text-zinc-950 font-bold text-[10px] tracking-widest uppercase">
            Featured Flagship Property
          </span>
          <h2 className="text-3xl font-serif font-bold text-zinc-100">
            The Grand Royal Sanctuary
          </h2>
          <p className="text-xs text-zinc-300 font-light leading-relaxed">
            Panoramic sea view suites, private infinity pools, and world-class
            luxury dining.
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. ROOMS TAB                                                               */
/* -------------------------------------------------------------------------- */
function RoomsTab() {
  const rooms = [
    {
      id: "101",
      name: "Presidential Ocean Suite",
      price: "$450/night",
      status: "Occupied",
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "102",
      name: "Royal Penthouse Villa",
      price: "$620/night",
      status: "Available",
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "103",
      name: "Executive Garden Room",
      price: "$280/night",
      status: "Cleaning",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-serif font-bold text-zinc-100">
          Suites Inventory
        </h3>
        <span className="text-xs text-zinc-400 font-mono">
          3 Active Categories
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 backdrop-blur-md space-y-4"
          >
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-zinc-950">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <span
                className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  room.status === "Available"
                    ? "bg-emerald-400 text-zinc-950"
                    : room.status === "Occupied"
                      ? "bg-amber-400 text-zinc-950"
                      : "bg-zinc-800 text-zinc-300"
                }`}
              >
                {room.status}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base text-zinc-100">
                {room.name}
              </h4>
              <p className="text-xs text-amber-400 font-mono">{room.price}</p>
            </div>

            <div className="flex items-center space-x-3 text-zinc-400 pt-2 border-t border-zinc-800/60">
              <Wifi className="w-4 h-4 text-amber-400" />
              <Coffee className="w-4 h-4 text-amber-400" />
              <Tv className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. BOOKINGS TAB                                                            */
/* -------------------------------------------------------------------------- */
function BookingsTab() {
  const bookings = [
    {
      id: "#BK-9901",
      guest: "Sophia Reynolds",
      room: "Suite 101",
      checkIn: "Sep 22, 2026",
      status: "Confirmed",
      total: "$1,350",
    },
    {
      id: "#BK-9892",
      guest: "Alexander Wright",
      room: "Villa 102",
      checkIn: "Sep 24, 2026",
      status: "Pending",
      total: "$1,860",
    },
    {
      id: "#BK-9844",
      guest: "Elena Rostova",
      room: "Suite 103",
      checkIn: "Sep 25, 2026",
      status: "Confirmed",
      total: "$840",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-md shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-zinc-400 font-mono uppercase border-b border-zinc-800 pb-3">
              <th className="pb-3">Booking ID</th>
              <th className="pb-3">Guest</th>
              <th className="pb-3">Room</th>
              <th className="pb-3">Check-In</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
            {bookings.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-zinc-800/30 transition-colors"
              >
                <td className="py-4 font-mono text-amber-400">{row.id}</td>
                <td className="py-4 font-medium">{row.guest}</td>
                <td className="py-4 text-zinc-400">{row.room}</td>
                <td className="py-4 text-zinc-400">{row.checkIn}</td>
                <td className="py-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium border ${
                      row.status === "Confirmed"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-4 text-right font-serif font-bold text-amber-400">
                  {row.total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. USERS TAB                                                               */
/* -------------------------------------------------------------------------- */
function UsersTab() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Registered Guest",
      bookings: 4,
      joined: "Jan 2026",
    },
    {
      id: 2,
      name: "Sophia Reynolds",
      email: "sophia.r@example.com",
      role: "VIP Member",
      bookings: 12,
      joined: "Mar 2025",
    },
    {
      id: 3,
      name: "Marcus Vance",
      email: "marcus.v@example.com",
      role: "Hotel Staff",
      bookings: 0,
      joined: "Aug 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-serif font-bold text-zinc-100">
          Registered Accounts
        </h3>
        <button className="flex items-center space-x-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-400/40 px-3 py-2 text-xs text-amber-400 transition-colors">
          <UserPlus className="w-4 h-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-md shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-zinc-400 font-mono uppercase border-b border-zinc-800 pb-3">
              <th className="pb-3">User Name</th>
              <th className="pb-3">Email Address</th>
              <th className="pb-3">Role</th>
              <th className="pb-3">Total Bookings</th>
              <th className="pb-3 text-right">Member Since</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-zinc-800/30 transition-colors"
              >
                <td className="py-4 font-semibold text-zinc-100">
                  {user.name}
                </td>
                <td className="py-4 text-zinc-400">{user.email}</td>
                <td className="py-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-zinc-950 text-amber-400 border border-amber-400/20 font-medium">
                    {user.role}
                  </span>
                </td>
                <td className="py-4 font-mono text-zinc-300">
                  {user.bookings}
                </td>
                <td className="py-4 text-right text-zinc-500">{user.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 5. SETTINGS TAB                                                            */
/* -------------------------------------------------------------------------- */
function SettingsTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-6 backdrop-blur-md space-y-6">
        <div>
          <h3 className="text-lg font-serif font-bold text-zinc-100">
            Global System Settings
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Manage portal security and booking configurations.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-400 mb-1.5">
              Platform Brand Name
            </label>
            <input
              type="text"
              defaultValue="StayEasy Hotel Systems"
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2.5 text-xs text-zinc-100 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <div>
                <p className="text-xs font-medium text-zinc-200">
                  Require Email Verification
                </p>
                <p className="text-[11px] text-zinc-500">
                  Require guests to confirm email prior to booking.
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="accent-amber-400 h-4 w-4 rounded"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button className="rounded-xl bg-amber-400 hover:bg-amber-300 px-5 py-2.5 text-xs font-semibold text-zinc-950 transition-colors">
            Save System Settings
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 6. LOGIN TAB                                                               */
/* -------------------------------------------------------------------------- */
function LoginTab({ onLogin }) {
  return (
    <div className="max-w-md mx-auto py-12">
      <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 backdrop-blur-md shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <span className="text-3xl font-serif font-bold text-amber-400">
            StayEasy
          </span>
          <h2 className="text-xl font-bold text-zinc-100">Admin Sign In</h2>
          <p className="text-xs text-zinc-400">
            Enter administrator credentials to access the management portal.
          </p>
        </div>

        <form onSubmit={onLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Admin Email
            </label>
            <input
              type="email"
              defaultValue="admin@stayeasy.com"
              required
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              defaultValue="••••••••"
              required
              className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-3 text-sm text-zinc-100 focus:border-amber-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-3 text-sm font-semibold text-zinc-950 transition-colors shadow-lg shadow-amber-400/20 active:scale-95"
          >
            Authenticate Access
          </button>
        </form>
      </div>
    </div>
  );
}
