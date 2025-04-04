import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AIContentGenerator from "./components/AIContentGenerator";
// import GhibliImageGenerator from "./components/GhibliImageGenerator";

function App() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-gray-300 p-6">
      {/* Only AI Content Generator */}
      <AIContentGenerator />
    </div>
  );
}

export default App;
