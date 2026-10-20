import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { store } from "../../store/app";
import { setCredentials } from "../../features/auth/authSlice";

export default function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!agreeTerms) {
      setError("Please accept the terms to create your membership.");
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/signup", {
        name: fullName,
        email,
        password,
      });

      const loginResponse = await api.post("/login", {
        email,
        password,
      });

      store.dispatch(
        setCredentials({
          accessToken: loginResponse.data.accessToken,
          user: loginResponse.data.user,
        }),
      );

      navigate("/login");
    } catch (submitError) {
      console.error(submitError);
      setError(submitError.response?.data?.message || "Signup failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl shadow-black/50">
        <h1 className="text-3xl font-bold text-white">Create VIP Membership</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Create your StayEasy VIP account to save reservations and unlock
          member benefits.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-zinc-300">
            Full name
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-300">
            Email address
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-300">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400"
            />
          </label>

          <label className="flex items-start gap-3 text-sm text-zinc-300">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-700 bg-zinc-950 text-amber-400 focus:ring-amber-400"
            />
            <span>
              I agree to StayEasy's{" "}
              <span className="text-amber-400">Terms of Privilege</span> and{" "}
              <span className="text-amber-400">VIP Privacy Code</span>.
            </span>
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
