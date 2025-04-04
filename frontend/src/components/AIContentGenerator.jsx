import React, { useState } from "react";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import { FacebookShareButton, TwitterShareButton } from "react-share";

function AIContentGenerator() {
  const [keyword, setKeyword] = useState("");
  const [contentType, setContentType] = useState("YouTube");
  const [contentIdeas, setContentIdeas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  // Predefined trending topics
  const trendingTopics = [
    "🚀 AI in Healthcare",
    "💪 Fitness Trends 2025",
    "💻 Remote Work Tools",
    "🌍 Sustainable Travel",
    "🔬 Latest Tech Innovations",
    "🧠 Mental Health Awareness",
    "💰 Cryptocurrency Trends",
  ];

  // Fetch content ideas from backend
  const generateContentIdeas = async () => {
    if (!keyword.trim()) return;
    if (!isPremium && contentIdeas.length >= 5) {
      alert(
        "⚠️ You have reached the daily limit. Upgrade to premium for unlimited ideas."
      );
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/generate-ideas",
        { keyword, contentType }
      );
      setContentIdeas(response.data.ideas);
    } catch (error) {
      console.error("Error generating content:", error);
      alert("❌ There was an error fetching content ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (idea) => {
    navigator.clipboard.writeText(idea);
    alert("✅ Idea copied to clipboard!");
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-gray-300 p-6">
      <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-4xl bg-gray-800 shadow-lg rounded-xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-400 text-center">
          ✨ AI Content Idea Generator
        </h1>
        <p className="text-gray-400 text-center mt-2">
          🤖 Generate fresh content ideas instantly!
        </p>

        {/* Premium Toggle */}
        <div className="flex items-center justify-center mt-4">
          <label className="mr-2 text-gray-400 font-semibold">
            🔑 Premium Access
          </label>
          <input
            type="checkbox"
            checked={isPremium}
            onChange={() => setIsPremium(!isPremium)}
            className="toggle-checkbox"
          />
        </div>

        {/* Trending Topics */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-300">
            🔥 Trending Topics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {trendingTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => setKeyword(topic)}
                className="text-sm bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Content Type Selector */}
        <div className="mt-6">
          <label className="block text-gray-400 font-semibold">
            🎬 Choose Content Type:
          </label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          >
            <option value="YouTube">📹 YouTube Video Ideas</option>
            <option value="TikTok">🎭 TikTok Video Ideas</option>
            <option value="Blog">📝 Blog Post Ideas</option>
            <option value="Podcast">🎙️ Podcast Episode Ideas</option>
          </select>
        </div>

        {/* Keyword Input */}
        <div className="mt-4">
          <label className="block text-gray-400 font-semibold">
            ✍️ Enter a Topic:
          </label>
          <input
            type="text"
            placeholder="🔍 e.g., Fitness, AI, Travel"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          />
        </div>

        {/* Generate Button */}
        <button
          onClick={() => {
            if (!keyword.trim()) {
              window.alert("Enter a topic :)");
            } else {
              generateContentIdeas();
            }
          }}
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg mt-4 hover:bg-blue-700 transition disabled:bg-gray-500"
          disabled={loading}
        >
          {loading ? "⏳ Generating..." : "🚀 Get Ideas"}
        </button>

        {/* Results */}
        {contentIdeas.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-300">
              ✅ Generated Ideas
            </h2>
            <div className="bg-gray-700 p-4 rounded-lg mt-2">
              {contentIdeas.map((idea, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow-md mb-2"
                >
                  <span className="text-gray-300">💡 {idea}</span>
                  <div className="flex space-x-2">
                    {/* Copy Button */}
                    <button
                      onClick={() => copyToClipboard(idea)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <FaCopy />
                    </button>

                    {/* Share Buttons */}
                    <TwitterShareButton
                      url={`https://twitter.com/intent/tweet?text=${idea}`}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      🐦 Tweet
                    </TwitterShareButton>
                    <FacebookShareButton
                      url={`https://www.facebook.com/sharer/sharer.php?u=${idea}`}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      📘 Share
                    </FacebookShareButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIContentGenerator;
