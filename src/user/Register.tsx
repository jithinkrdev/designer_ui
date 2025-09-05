import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { theme } from "../pages/theme";
import api from "../api/config";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${theme.gradientBg} items-center justify-center flex h-screen`}
    >
      <form className={theme.card} onSubmit={handleSubmit}>
        <h2 className={theme.heading + " text-center mb-8"}>Create Account</h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        {success && (
          <div className="mb-4 text-green-600 text-sm">{success}</div>
        )}
        <div className="mb-6">
          <label
            htmlFor="name"
            className={"block mb-2 text-sm font-medium " + theme.text}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className={"block mb-2 text-sm font-medium " + theme.text}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div className="mb-8">
          <label
            htmlFor="password"
            className={"block mb-2 text-sm font-medium " + theme.text}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 text-white font-semibold rounded-lg shadow hover:bg-emerald-700 transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="text-center mt-6">
          <a href="/login" className="text-emerald-600 hover:underline">
            Already have an account? Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;
