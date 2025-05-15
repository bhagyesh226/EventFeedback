import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export default function History() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  const fetchFeedbacks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feedbacks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks(res.data);
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/feedbacks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFeedbacks((prev) => prev.filter((fb) => fb._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const startEditing = (fb) => {
    setEditingId(fb._id);
    setEditedComment(fb.comment || "");
    setEditedRating(fb.rating);
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `${BASE_URL}/feedbacks/${editingId}`,
        { comment: editedComment, rating: editedRating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
      fetchFeedbacks();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Feedback History
        </h2>

        {feedbacks.length === 0 ? (
          <p className="text-center text-gray-400">
            No feedback submitted yet.
          </p>
        ) : (
          feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="bg-gray-800 p-4 rounded-md shadow mb-4 border border-gray-700"
            >
              <h3 className="text-lg font-semibold text-white">{fb.event}</h3>

              {editingId === fb._id ? (
                <>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editedRating}
                    onChange={(e) => setEditedRating(Number(e.target.value))}
                    className="w-full mt-2 mb-2 p-2 bg-gray-900 border border-gray-600 text-white rounded"
                  />
                  <textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                    className="w-full p-2 bg-gray-900 border border-gray-600 text-white rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={saveEdit}
                      className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-300">Rating: {fb.rating} ★</p>
                  {fb.comment && (
                    <p className="text-sm text-gray-400 mt-1">
                      Comment: {fb.comment}
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => startEditing(fb)}
                      className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded text-black font-semibold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteFeedback(fb._id)}
                      className="bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/feedback")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold"
          >
            Go to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
