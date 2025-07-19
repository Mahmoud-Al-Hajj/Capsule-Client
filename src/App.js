import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import AddCapsule from "./Pages/AddCapsule";
import PublicWall from "./Pages/publicWall";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCapsule />} />
        <Route path="/wall" element={<PublicWall />} />
      </Routes>
    </Router>
  );
}

export default App;
