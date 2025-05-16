import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import StarRating from "../components/StarRating";
import {
  ArrowRightOnRectangleIcon,
  ClockIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function FeedbackPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  // Navbar logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // Submit feedback
  const submitFeedback = async () => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/feedbacks`,
        { event, comment, rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      alert("Feedback submitted!");
      setEvent("");
      setComment("");
      setRating(0);
    } catch (err) {
      console.error("Feedback submission error:", err);
      alert("Submission failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-900 text-gray-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-2xl">
                EventFeedback
              </Link>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <Link
                to="/feedback"
                className="hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Feedback
              </Link>

              <Link
                to="/history"
                className="flex items-center gap-1 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <ClockIcon className="h-5 w-5" />
                History
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-gray-800" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/feedback"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-white hover:bg-gray-700 text-base font-medium"
              >
                Feedback
              </Link>
              <Link
                to="/history"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-white hover:bg-gray-700 text-base font-medium"
              >
                <ClockIcon className="h-5 w-5" />
                History
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-base font-medium flex items-center gap-1"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Feedback Form */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-800 p-6 rounded shadow space-y-6">
          <h2 className="text-2xl font-bold text-white">Leave Feedback</h2>
          <input
            type="text"
            placeholder="Event name"
            className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          />
          <textarea
            placeholder="Comment (optional)"
            className="w-full p-3 rounded border border-gray-700 bg-gray-900 text-white resize-none"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <StarRating rating={rating} setRating={setRating} />
          <button
            onClick={submitFeedback}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
