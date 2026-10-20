import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/axios";
import { store } from "../../store/app";
import { setCredentials } from "../../features/auth/authSlice";
// import { loginUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (email, password) => {
    const response = await api.post("/login", {
      email,
      password,
    });

    store.dispatch(
      setCredentials({
        accessToken: response.data.accessToken,
        user: response.data.user,
      }),
    );

    return response.data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    try {
      await login(email, password);

      navigate("/");
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.message || "Login failed");
    }
  };
  // const result = loginUser({ email, password });
  // if (!result.success) {
  //   setError(result.error);
  //   return;
  // }

  // navigate("/");

  return (
    <div className="relative min-h-[calc(100vh-0rem)] flex items-center justify-center px-4 py-8 text-zinc-100 overflow-hidden">
      <div
        className="absolute -inset-4 scale-105 bg-cover bg-center bg-no-repeat blur-sm"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />

      {/* Dark Overlay Layer for Text Contrast */}
      <div className="absolute inset-0 bg-zinc-950/70" />

      {/* Glassmorphic Sign-In Card with Backdrop Blur */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-zinc-800/80 bg-zinc-900/60 p-8 backdrop-blur-md shadow-2xl shadow-black/80">
        <h1 className="text-3xl font-bold text-white">Sign In</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sign in to your StayEasy account and access your booking dashboard.
        </p>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-zinc-300">
            Email address
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none backdrop-blur-sm focus:border-amber-400"
            />
          </label>

          <label className="block text-sm font-semibold text-zinc-300">
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/80 px-4 py-3 text-sm text-zinc-100 outline-none backdrop-blur-sm focus:border-amber-400"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-2xl bg-amber-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300 shadow-lg shadow-amber-400/20 active:scale-95"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
