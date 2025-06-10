import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// Example: Simple Auth check (replace with your real auth logic)
const isAuthenticated = () => {
  // For demo, check if a token exists in localStorage
  return !!localStorage.getItem("token");
};

// Protected Route Wrapper
function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    
      <div className="App min-h-screen bg-slate-50">
        <Routes>
          
          <Route path="/" element={<LandingPage />} />

          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Global Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1f2937",
              color: "#fff",
              borderRadius: "12px",
            },
          }}
        />
      </div>
    
  );
}

export default App;
