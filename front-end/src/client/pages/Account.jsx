import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { setCredentials, logout } from "../../features/auth/authSlice";

const tabs = [
  { id: "overview", label: "Overview", icon: UserRound },
  { id: "profile", label: "Personal details", icon: UserRound },
  { id: "bookings", label: "Bookings", icon: CalendarDays },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const bookingStatusStyles = {
  pending: "bg-amber-400/10 text-amber-200",
  confirmed: "bg-emerald-400/10 text-emerald-200",
  checked_in: "bg-sky-400/10 text-sky-200",
  completed: "bg-zinc-800 text-zinc-300",
  cancelled: "bg-rose-400/10 text-rose-200",
  rejected: "bg-rose-400/10 text-rose-200",
};

function formatDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function getErrorMessage(error, fallback) {
  return error.response?.data?.message || error.message || fallback;
}

export default function AccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, user: authUser } = useSelector((state) => state.auth);
  const accountKey = authUser?.id || "current-account";

  const [activeTab, setActiveTab] = useState("overview");
  const [retryCount, setRetryCount] = useState(0);
  const [accountResult, setAccountResult] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [profileDraft, setProfileDraft] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");

  const requestKey = `${accountKey}:${retryCount}`;
  const hasAccountResult = accountResult?.key === requestKey;
  const account = hasAccountResult ? accountResult.user : null;
  const accountError = hasAccountResult ? accountResult.error : "";
  const accountLoading = !hasAccountResult;
  const hasBookingsResult = bookingResult?.key === requestKey;
  const bookings = hasBookingsResult ? bookingResult.bookings : [];
  const bookingsError = hasBookingsResult ? bookingResult.error : "";
  const bookingsLoading = !hasBookingsResult;
  const profileValues =
    profileDraft?.id === account?.id
      ? profileDraft
      : {
          id: account?.id,
          name: account?.name || "",
          email: account?.email || "",
          phone: account?.phone || "",
        };
  const profileHasChanges =
    account &&
    (profileValues.name !== account.name ||
      profileValues.email !== account.email ||
      profileValues.phone !== (account.phone || ""));

  useEffect(() => {
    const controller = new AbortController();

    async function loadAccount() {
      try {
        const response = await api.get("/account/me", {
          signal: controller.signal,
        });
        if (!response.data?.user) {
          throw new Error("The account response was invalid.");
        }
        setAccountResult({
          key: requestKey,
          user: response.data.user,
          error: "",
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setAccountResult({
            key: requestKey,
            user: null,
            error: getErrorMessage(error, "Unable to load your account."),
          });
        }
      }
    }

    loadAccount();
    return () => controller.abort();
  }, [requestKey]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadBookings() {
      try {
        const response = await api.get("/bookings", {
          params: { page: 1 },
          signal: controller.signal,
        });
        if (!Array.isArray(response.data?.bookings)) {
          throw new Error("The bookings response was invalid.");
        }
        setBookingResult({
          key: requestKey,
          bookings: response.data.bookings,
          total: Number.isSafeInteger(response.data.total)
            ? response.data.total
            : response.data.bookings.length,
          error: "",
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          setBookingResult({
            key: requestKey,
            bookings: [],
            total: 0,
            error: getErrorMessage(error, "Unable to load booking activity."),
          });
        }
      }
    }

    loadBookings();
    return () => controller.abort();
  }, [requestKey]);

  function updateProfileDraft(field, value) {
    setProfileDraft((currentDraft) => ({
      ...(currentDraft?.id === account?.id ? currentDraft : profileValues),
      id: account?.id,
      [field]: value,
    }));
    setProfileMessage("");
    setProfileError("");
  }

  async function saveProfile(event) {
    event.preventDefault();
    setProfileMessage("");
    setProfileError("");

    if (!profileValues.name.trim() || !profileValues.email.trim()) {
      setProfileError("Name and email are required.");
      return;
    }

    setProfileSaving(true);
    try {
      const response = await api.patch("/account/me", {
        name: profileValues.name.trim(),
        email: profileValues.email.trim(),
        phone: profileValues.phone.trim(),
      });
      const updatedUser = response.data?.user;
      if (!updatedUser) {
        throw new Error("The account update response was invalid.");
      }

      setAccountResult({
        key: requestKey,
        user: updatedUser,
        error: "",
      });
      setProfileDraft(null);
      dispatch(setCredentials({ accessToken, user: updatedUser }));
      setProfileMessage("Your personal details have been updated.");
    } catch (error) {
      setProfileError(getErrorMessage(error, "Unable to update your details."));
    } finally {
      setProfileSaving(false);
    }
  }

  async function changePassword(event) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");

    if (passwords.newPassword.length < 8) {
      setPasswordError("Your new password must be at least 8 characters.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("The new password and confirmation do not match.");
      return;
    }

    setPasswordSaving(true);
    try {
      const response = await api.patch("/account/password", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });
      if (!response.data?.accessToken || !response.data?.user) {
        throw new Error("The password update response was invalid.");
      }

      dispatch(
        setCredentials({
          accessToken: response.data.accessToken,
          user: response.data.user,
        }),
      );
      setAccountResult({
        key: requestKey,
        user: response.data.user,
        error: "",
      });
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordMessage(
        "Password updated. Other active sessions have been signed out.",
      );
    } catch (error) {
      setPasswordError(getErrorMessage(error, "Unable to update your password."));
    } finally {
      setPasswordSaving(false);
    }
  }

  async function signOut() {
    setSignOutError("");
    setIsSigningOut(true);
    try {
      await api.post("/logout");
      dispatch(logout());
      navigate("/login", { replace: true });
    } catch (error) {
      setSignOutError(getErrorMessage(error, "Unable to sign out."));
    } finally {
      setIsSigningOut(false);
    }
  }

  if (accountLoading) {
    return (
      <main
        className="flex min-h-[65vh] items-center justify-center bg-zinc-950 text-sm text-zinc-400"
        role="status"
      >
        Loading your account...
      </main>
    );
  }

  if (accountError || !account) {
    return (
      <main
        className="flex min-h-[65vh] items-center justify-center bg-zinc-950 px-4 text-center"
        role="alert"
      >
        <div className="max-w-md rounded-3xl border border-rose-500/30 bg-zinc-900 p-8">
          <p className="text-sm text-rose-200">
            {accountError || "Your account could not be loaded."}
          </p>
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
            className="mt-5 rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-amber-400"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  const initials = account.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
  const recentBookings = bookings.slice(0, 3);
  const roleLabel = {
    admin: "Administrator",
    hotel: "Hotel manager",
    user: "Guest",
  }[account.role] || "Member";

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-zinc-100 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-lg font-bold text-zinc-950">
              {initials || "S"}
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-400">
                Account center
              </p>
              <h1 className="mt-1 font-serif text-3xl font-bold">
                Welcome, {account.name}
              </h1>
              <p className="mt-1 text-sm text-zinc-400">{account.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={signOut}
            disabled={isSigningOut}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-rose-400/50 hover:text-rose-200 disabled:opacity-50"
          >
            <LogOut className="h-4 w-4" />
            {isSigningOut ? "Signing out..." : "Sign out"}
          </button>
        </header>

        {signOutError && (
          <p
            className="mb-5 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
            role="alert"
          >
            {signOutError}
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
          <nav
            aria-label="Account sections"
            className="flex gap-2 overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900 p-2 lg:flex-col lg:overflow-visible lg:self-start"
          >
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => setActiveTab(id)}
                className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === id
                    ? "bg-amber-400 text-zinc-950"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
            <Link
              to="/bookings"
              className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
            >
              <ArrowRight className="h-4 w-4" />
              Manage bookings
            </Link>
          </nav>

          <section
            role="tabpanel"
            className="min-w-0 rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-8"
          >
            {activeTab === "overview" && (
              <div>
                <div className="mb-7">
                  <h2 className="font-serif text-2xl font-bold">
                    Account overview
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Your profile and reservation activity in one place.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <CalendarDays className="h-5 w-5 text-amber-300" />
                    <p className="mt-4 text-2xl font-bold">
                      {bookingsLoading ? "—" : bookingResult.total}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">Total bookings</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <ShieldCheck className="h-5 w-5 text-emerald-300" />
                    <p className="mt-4 text-lg font-bold">{roleLabel}</p>
                    <p className="mt-1 text-xs text-zinc-500">Account type</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <Clock3 className="h-5 w-5 text-sky-300" />
                    <p className="mt-4 text-lg font-bold">
                      {formatDate(account.joinedAt)}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">Member since</p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">Personal details</h3>
                      <button
                        type="button"
                        onClick={() => setActiveTab("profile")}
                        className="text-xs font-semibold text-amber-300 hover:text-amber-200"
                      >
                        Edit profile
                      </button>
                    </div>
                    <dl className="mt-5 space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <UserRound className="h-4 w-4 text-zinc-500" />
                        <div>
                          <dt className="text-xs text-zinc-500">Name</dt>
                          <dd className="mt-0.5">{account.name}</dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-zinc-500" />
                        <div>
                          <dt className="text-xs text-zinc-500">Email</dt>
                          <dd className="mt-0.5 break-all">{account.email}</dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-zinc-500" />
                        <div>
                          <dt className="text-xs text-zinc-500">Phone</dt>
                          <dd className="mt-0.5">{account.phone || "Not added"}</dd>
                        </div>
                      </div>
                    </dl>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-semibold">Recent bookings</h3>
                      <Link
                        to="/bookings"
                        className="text-xs font-semibold text-amber-300 hover:text-amber-200"
                      >
                        View all
                      </Link>
                    </div>
                    {bookingsError ? (
                      <p className="mt-5 text-sm text-rose-200" role="alert">
                        {bookingsError}
                      </p>
                    ) : bookingsLoading ? (
                      <p className="mt-5 text-sm text-zinc-500" role="status">
                        Loading booking activity...
                      </p>
                    ) : recentBookings.length === 0 ? (
                      <p className="mt-5 text-sm text-zinc-500">
                        No bookings yet. Your reservations will appear here.
                      </p>
                    ) : (
                      <ul className="mt-4 divide-y divide-zinc-800">
                        {recentBookings.map((booking) => (
                          <li
                            key={booking._id}
                            className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                          >
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {booking.hotel?.name || "Hotel"}
                              </p>
                              <p className="mt-1 text-xs text-zinc-500">
                                {formatDate(booking.checkInDate)}
                                {" · "}
                                {booking.bookingCode || "Booking"}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${
                                bookingStatusStyles[booking.status] ||
                                "bg-zinc-800 text-zinc-300"
                              }`}
                            >
                              {String(booking.status || "pending").replaceAll(
                                "_",
                                " ",
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="max-w-2xl">
                <div className="mb-7">
                  <h2 className="font-serif text-2xl font-bold">
                    Personal details
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Keep your contact information up to date for your stays.
                  </p>
                </div>

                <form onSubmit={saveProfile} className="space-y-5">
                  <label className="block text-sm font-medium text-zinc-300">
                    Full name
                    <input
                      required
                      maxLength={50}
                      value={profileValues.name}
                      onChange={(event) =>
                        updateProfileDraft("name", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-amber-400"
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-300">
                    Email address
                    <input
                      required
                      type="email"
                      value={profileValues.email}
                      onChange={(event) =>
                        updateProfileDraft("email", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-amber-400"
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-300">
                    Phone number
                    <input
                      type="tel"
                      maxLength={30}
                      value={profileValues.phone}
                      onChange={(event) =>
                        updateProfileDraft("phone", event.target.value)
                      }
                      className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none transition focus:border-amber-400"
                    />
                  </label>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-sm">
                    <p className="text-xs text-zinc-500">Account role</p>
                    <p className="mt-1 font-medium">{roleLabel}</p>
                    <p className="mt-2 text-xs text-zinc-500">
                      Account roles can only be changed by an administrator.
                    </p>
                  </div>

                  {profileError && (
                    <p
                      className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                      role="alert"
                    >
                      {profileError}
                    </p>
                  )}
                  {profileMessage && (
                    <p
                      className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                      role="status"
                    >
                      <Check className="h-4 w-4" />
                      {profileMessage}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={!profileHasChanges || profileSaving}
                      className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {profileSaving ? "Saving..." : "Save changes"}
                    </button>
                    {profileHasChanges && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileDraft(null);
                          setProfileError("");
                          setProfileMessage("");
                        }}
                        className="rounded-xl border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-500"
                      >
                        Discard
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {activeTab === "bookings" && (
              <div>
                <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="font-serif text-2xl font-bold">
                      Booking activity
                    </h2>
                    <p className="mt-1 text-sm text-zinc-400">
                      Your latest reservations and their current status.
                    </p>
                  </div>
                  <Link
                    to="/bookings"
                    className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-amber-300 hover:text-amber-200"
                  >
                    Manage bookings <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {bookingsError ? (
                  <div
                    className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-200"
                    role="alert"
                  >
                    <p>{bookingsError}</p>
                    <button
                      type="button"
                      onClick={() => setRetryCount((count) => count + 1)}
                      className="mt-3 font-semibold underline underline-offset-4"
                    >
                      Reload bookings
                    </button>
                  </div>
                ) : bookingsLoading ? (
                  <p
                    className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-400"
                    role="status"
                  >
                    Loading bookings...
                  </p>
                ) : bookings.length === 0 ? (
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
                    <CalendarDays className="mx-auto h-8 w-8 text-amber-300" />
                    <p className="mt-4 font-semibold">No bookings yet</p>
                    <p className="mt-1 text-sm text-zinc-500">
                      Find a room to start planning your stay.
                    </p>
                    <Link
                      to="/hotels"
                      className="mt-5 inline-flex rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-bold text-zinc-950 hover:bg-amber-300"
                    >
                      Explore hotels
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 10).map((booking) => (
                      <article
                        key={booking._id}
                        className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:flex-row sm:items-center"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold">
                            {booking.hotel?.name || "Hotel"}
                          </p>
                          <p className="mt-1 text-sm text-zinc-400">
                            {booking.room?.name ||
                              booking.room?.roomTypeCode ||
                              "Room"}
                          </p>
                          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500">
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5" />
                              {formatDate(booking.checkInDate)} –{" "}
                              {formatDate(booking.checkOutDate)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5" />
                              {booking.roomsBooked} room
                              {booking.roomsBooked === 1 ? "" : "s"}
                            </span>
                            {booking.hotel?.location && (
                              <span className="inline-flex items-center gap-1.5">
                                <MapPin className="h-3.5 w-3.5" />
                                {booking.hotel.location}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                              bookingStatusStyles[booking.status] ||
                              "bg-zinc-800 text-zinc-300"
                            }`}
                          >
                            {String(booking.status || "pending").replaceAll(
                              "_",
                              " ",
                            )}
                          </span>
                          <span className="text-sm font-bold text-amber-200">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: booking.currency || "INR",
                              maximumFractionDigits: 2,
                            }).format(Number(booking.totalAmount) || 0)}
                          </span>
                        </div>
                      </article>
                    ))}
                    {bookingResult.total > 10 && (
                      <p className="pt-2 text-center text-xs text-zinc-500">
                        Showing the latest 10 of {bookingResult.total} bookings.
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div className="max-w-2xl">
                <div className="mb-7">
                  <h2 className="font-serif text-2xl font-bold">
                    Security settings
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Change your password and protect access to your account.
                  </p>
                </div>

                <form onSubmit={changePassword} className="space-y-5">
                  <label className="block text-sm font-medium text-zinc-300">
                    Current password
                    <input
                      required
                      type="password"
                      autoComplete="current-password"
                      value={passwords.currentPassword}
                      onChange={(event) => {
                        setPasswords((current) => ({
                          ...current,
                          currentPassword: event.target.value,
                        }));
                        setPasswordError("");
                        setPasswordMessage("");
                      }}
                      className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-300">
                    New password
                    <input
                      required
                      type="password"
                      minLength={8}
                      autoComplete="new-password"
                      value={passwords.newPassword}
                      onChange={(event) => {
                        setPasswords((current) => ({
                          ...current,
                          newPassword: event.target.value,
                        }));
                        setPasswordError("");
                        setPasswordMessage("");
                      }}
                      className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
                    />
                    <span className="mt-1 block text-xs text-zinc-500">
                      Use at least 8 characters.
                    </span>
                  </label>
                  <label className="block text-sm font-medium text-zinc-300">
                    Confirm new password
                    <input
                      required
                      type="password"
                      minLength={8}
                      autoComplete="new-password"
                      value={passwords.confirmPassword}
                      onChange={(event) => {
                        setPasswords((current) => ({
                          ...current,
                          confirmPassword: event.target.value,
                        }));
                        setPasswordError("");
                        setPasswordMessage("");
                      }}
                      className="mt-2 w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
                    />
                  </label>

                  {passwordError && (
                    <p
                      className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                      role="alert"
                    >
                      {passwordError}
                    </p>
                  )}
                  {passwordMessage && (
                    <p
                      className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                      role="status"
                    >
                      <Check className="h-4 w-4" />
                      {passwordMessage}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={
                      passwordSaving ||
                      !passwords.currentPassword ||
                      !passwords.newPassword ||
                      !passwords.confirmPassword
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <KeyRound className="h-4 w-4" />
                    {passwordSaving ? "Updating..." : "Update password"}
                  </button>
                </form>

                <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <div>
                      <h3 className="text-sm font-semibold">Payment privacy</h3>
                      <p className="mt-1 text-xs leading-5 text-zinc-500">
                        StayEasy stores booking and pending payment records only.
                        It does not collect card numbers or banking credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}