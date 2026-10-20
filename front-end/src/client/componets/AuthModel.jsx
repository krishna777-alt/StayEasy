import { useState, useEffect } from "react";
import { loginUser, signupUser } from "../utils/auth";

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = "login",
  onAuthSuccess,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });

    if (activeTab === "login") {
      const result = loginUser({ email, password });
      if (!result.success) {
        setFeedback({ type: "error", message: result.error });
        return;
      }
      onAuthSuccess?.(result.user);
      onClose();
      return;
    }

    const result = signupUser({ fullName, email, password, agreeTerms });
    if (!result.success) {
      setFeedback({ type: "error", message: result.error });
      return;
    }
    onAuthSuccess?.(result.user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-2xl transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md bg-zinc-900/95 border border-zinc-800/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/80 overflow-hidden z-10 transition-all duration-300 transform scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-colors z-20"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="pt-8 px-8 text-center">
          <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            StayEasy Luxury Portal
          </span>
          <h2 className="text-2xl font-extrabold text-zinc-100 mt-3">
            {activeTab === "login" ? "Welcome Back" : "Join StayEasy VIP"}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {activeTab === "login"
              ? "Enter your credentials to manage your bookings"
              : "Unlock exclusive member rates and 24/7 concierge access"}
          </p>
        </div>

        <div className="flex border-b border-zinc-800 mt-6 px-8">
          <button
            type="button"
            onClick={() => setActiveTab("login")}
            className={`flex-1 pb-3 text-xs font-bold transition-all relative ${
              activeTab === "login"
                ? "text-amber-400"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Sign In
            {activeTab === "login" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("signup")}
            className={`flex-1 pb-3 text-xs font-bold transition-all relative ${
              activeTab === "signup"
                ? "text-amber-400"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Create VIP Account
            {activeTab === "signup" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
            )}
          </button>
        </div>

        <div className="p-8 space-y-5">
          {feedback.message && (
            <div
              className={`rounded-xl border px-3 py-2 text-xs ${
                feedback.type === "error"
                  ? "border-red-500/30 bg-red-500/10 text-red-300"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === "signup" && (
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lord / Lady John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="vip@stayeasy.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-amber-400/90">
                  Password
                </label>
                {activeTab === "login" && (
                  <button
                    type="button"
                    className="text-[11px] text-zinc-500 hover:text-amber-400 transition-colors"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-zinc-500 hover:text-zinc-300 text-xs"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {activeTab === "signup" && (
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
                />
                <span className="text-[11px] text-zinc-400 leading-tight">
                  I agree to StayEasy's{" "}
                  <span className="text-amber-400 underline">
                    Terms of Privilege
                  </span>{" "}
                  and{" "}
                  <span className="text-amber-400 underline">
                    VIP Privacy Code
                  </span>
                  .
                </span>
              </label>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20 active:scale-[0.98] mt-2"
            >
              {activeTab === "login"
                ? "Sign In to Portal"
                : "Create VIP Membership"}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-zinc-400">
              {activeTab === "login"
                ? "Don't have a membership yet? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={() =>
                  setActiveTab(activeTab === "login" ? "signup" : "login")
                }
                className="text-amber-400 font-bold hover:underline"
              >
                {activeTab === "login" ? "Apply Now" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
