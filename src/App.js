import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddCapsule from "./Pages/AddCapsule";
import PublicWall from "./Pages/publicWall";
import Login from "./Pages/login";
import Register from "./Pages/register";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import MyCapsules from "./Pages/MyCapsules";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MyCapsules />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddCapsule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wall"
          element={
            <ProtectedRoute>
              <PublicWall />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
