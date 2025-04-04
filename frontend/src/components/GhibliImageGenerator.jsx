import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GhibliImageGenerator() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setGeneratedImage(null);
    }
  };

  // Upload image and generate Ghibli art
  const generateGhibliImage = async () => {
    if (!selectedFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ghibli-style",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setGeneratedImage(response.data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("❌ Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-gray-300 p-6">
      <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-4xl bg-gray-800 shadow-lg rounded-xl p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-400 text-center">
          🌿 Ghibli-Style Image Generator
        </h1>
        <p className="text-gray-400 text-center mt-2">
          Upload an image and transform it into Ghibli-style art!
        </p>

        {/* Navigation */}
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-400 hover:text-blue-500">
            ⬅️ Back to AI Content Generator
          </Link>
        </div>

        {/* File Upload */}
        <div className="mt-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-300">
              🖼️ Uploaded Image
            </h2>
            <img
              src={preview}
              alt="Preview"
              className="mt-2 rounded-lg shadow-lg max-h-60 mx-auto"
            />
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={generateGhibliImage}
          className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg mt-4 hover:bg-blue-700 transition disabled:bg-gray-500"
          disabled={!selectedFile || loading}
        >
          {loading ? "⏳ Generating..." : "✨ Generate Ghibli Art"}
        </button>

        {/* Generated Ghibli Image */}
        {generatedImage && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-300">
              🌟 Ghibli-Style Image
            </h2>
            <img
              src={generatedImage}
              alt="Ghibli Style"
              className="mt-2 rounded-lg shadow-lg max-h-60 mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GhibliImageGenerator;
