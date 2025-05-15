import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/users/register", {
        email,
        password,
      });
      sessionStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      window.location.href = "/feedback";
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-white">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}
