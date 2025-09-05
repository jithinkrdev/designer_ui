import React, { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import api from "../../api/config";
import GeneratedImageModal from "./GeneratedImageModal";
import BusyIndicator from "../common/BusyIndicator";

const CreateDesign: React.FC = () => {
  const [baseFile, setBaseFile] = useState<File | null>(null);
  const [basePreview, setBasePreview] = useState<string>("");
  const [overlayFile, setOverlayFile] = useState<File | null>(null);
  const [overlayPreview, setOverlayPreview] = useState<string>("");
  const [guidance, setGuidance] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const baseInputRef = useRef<HTMLInputElement>(null);
  const overlayInputRef = useRef<HTMLInputElement>(null);

  const handleBaseChange = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setBasePreview(reader.result as string);
    reader.onerror = () => setError("Failed to process image.");
    reader.readAsDataURL(file);
    setBaseFile(file);
  };

  const handleOverlayChange = async (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setOverlayPreview(reader.result as string);
    reader.onerror = () => setError("Failed to process image.");
    reader.readAsDataURL(file);
    setOverlayFile(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!baseFile || !overlayFile) {
      setError("Please select both base and overlay images.");
      return;
    }
    setLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    const formData = new FormData();
    formData.append("baseFile", baseFile);
    formData.append("overlayFile", overlayFile);
    if (guidance.trim()) formData.append("guidance", guidance);

    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/create-design", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      // Expecting { imageUrl, designId }
      const { imageUrl, designId } = res.data;
      setGeneratedImageUrl(imageUrl);
      setShowModal(true);
      // Optionally, you can use designId for further logic
    } catch (err) {
      setError("Something went wrong while generating the design.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-24 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-emerald-600 text-center">
        Create New Design
      </h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Base Image
          </label>
          <div
            className="border rounded-lg overflow-hidden shadow-sm cursor-pointer relative w-full h-64 flex items-center justify-center bg-gray-100"
            onClick={() => baseInputRef.current?.click()}
          >
            {basePreview ? (
              <img
                src={basePreview}
                alt="Base"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">Click to browse base image</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={baseInputRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) handleBaseChange(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Overlay Image
          </label>
          <div
            className="border rounded-lg overflow-hidden shadow-sm cursor-pointer relative w-full h-64 flex items-center justify-center bg-gray-100"
            onClick={() => overlayInputRef.current?.click()}
          >
            {overlayPreview ? (
              <img
                src={overlayPreview}
                alt="Overlay"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400">
                Click to browse overlay image
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={overlayInputRef}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.[0]) handleOverlayChange(e.target.files[0]);
              }}
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Guidance
          </label>
          <textarea
            placeholder="Describe your design guidance..."
            value={guidance}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setGuidance(e.target.value)
            }
            className="w-full border border-gray-300 rounded-md p-2"
            rows={2}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 font-semibold disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Generating..." : "Generate Design"}
        </button>
      </form>
      {showModal && generatedImageUrl && (
        <GeneratedImageModal
          imageUrl={generatedImageUrl}
          onClose={() => setShowModal(false)}
        />
      )}
      <BusyIndicator show={loading} />
    </div>
  );
};

export default CreateDesign;
