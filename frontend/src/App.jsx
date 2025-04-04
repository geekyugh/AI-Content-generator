import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AIContentGenerator from "./components/AIContentGenerator";
import GhibliImageGenerator from "./components/GhibliImageGenerator";

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-gray-300 p-6">
        {/* Navigation Bar */}
        <nav className="mb-6 flex space-x-6 bg-gray-800 p-4 rounded-lg shadow-lg">
          <Link
            to="/"
            className="text-blue-400 font-bold hover:text-blue-500 transition"
          >
            🤖 AI Content Generator
          </Link>
          <Link
            to="/ghibli"
            className="text-blue-400 font-bold hover:text-blue-500 transition"
          >
            🌿 Ghibli Image Generator
          </Link>
        </nav>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<AIContentGenerator />} />
          <Route path="/ghibli" element={<GhibliImageGenerator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
