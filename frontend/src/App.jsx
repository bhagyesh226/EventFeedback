import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feedback from "./pages/Feedback";
import History from "./pages/History";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Added route */}
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route path="/feedback" element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
