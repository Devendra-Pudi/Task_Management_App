import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed" );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="w-full max-w-md">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 leading-relaxed">The Secret of Getting Ahead is Getting Started.</h1>
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        onSubmit={handleRegister}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn-primary w-full mb-2" type="submit">Register</button>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline  font-medium">Sign In</a>
        </p>
      </form>
      </div>
    </div>
  );
}
