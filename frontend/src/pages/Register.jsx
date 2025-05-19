import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/register`,
        { email, password },
        { withCredentials: true }
      );
      sessionStorage.setItem("token", res.data.token);
      alert("Registration successful. Redirecting to feedback...");
      window.location.href = "/feedback";
    } catch (err) {
      if (err.response?.status === 400) {
        alert("User already exists. Please log in.");
        window.location.href = "/login";
      } else {
        alert("Registration failed");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-6 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded border border-gray-700 bg-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded border border-gray-700 bg-gray-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Register
        </button>

        {/* Link to Login page */}
        <p className="text-sm text-center mt-2">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
