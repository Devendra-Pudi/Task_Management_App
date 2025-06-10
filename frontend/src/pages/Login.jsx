import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4">
      <div className="w-full max-w-md">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8 leading-relaxed">"Begin With The End In Mind"</h1>
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        onSubmit={handleLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          className="w-full mb-4 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full mb-6 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="btn-primary w-full mb-2" type="submit">Login</button>
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:text-blue-800 underline font-medium">Register</a>
        </p>
      </form>
      </div>
    </div>
  );
}
