import React, { useState, useRef } from "react";
import type { ChangeEvent, FormEvent, RefObject } from "react";
import { Upload, ImageIcon, Trash2 } from "lucide-react";
import api from "../../api/config";
import GeneratedImageModal from "./GeneratedImageModal";
import BusyIndicator from "../common/BusyIndicator";
import ModelSelectDialog from "../modals/ModelSelectDialog";

// Helper function to read a file and return its base64 data
const readFileAsBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

interface DressInput {
  prompt: string;
  file: File | null;
  preview?: string | ArrayBuffer | null;
}

const EditorView: React.FC = () => {
  const [modelImg, setModelImg] = useState<string>("");
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [dressInputs, setDressInputs] = useState<DressInput[]>([
    { prompt: "", file: null },
  ]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modelDialogOpen, setModelDialogOpen] = useState(false);
  const modelInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (index: number, file: File): Promise<void> => {
    try {
      const base64 = await readFileAsBase64(file);
      const updatedInputs = [...dressInputs];
      updatedInputs[index].file = file;
      updatedInputs[index].preview = base64;
      setDressInputs(updatedInputs);
    } catch (e) {
      console.error("Failed to read file:", e);
      setError("Failed to process image. Please try another one.");
    }
  };

  const handlePromptChange = (index: number, prompt: string): void => {
    const updatedInputs = [...dressInputs];
    updatedInputs[index].prompt = prompt;
    setDressInputs(updatedInputs);
  };

  const handleAddMore = (): void => {
    setDressInputs((prev: DressInput[]) => [
      ...prev,
      { prompt: "", file: null },
    ]);
  };

  const handleDelete = (index: number): void => {
    setDressInputs((prev: DressInput[]) => prev.filter((_, i) => i !== index));
  };

  const handleModelChange = async (file: File): Promise<void> => {
    try {
      const base64 = await readFileAsBase64(file);
      setModelFile(file);
      setModelImg(typeof base64 === "string" ? base64 : "");
    } catch (e) {
      console.error("Failed to read model image:", e);
      setError("Failed to process model image. Please try another one.");
    }
  };

  // Add a handler for selecting a model from dialog
  const handleModelSelect = (model: { imageUrl: string }) => {
    setModelImg(model.imageUrl);
    setModelFile(null); // Clear local file selection
    setModelDialogOpen(false);
  };

  const validateInputs = (): boolean => {
    if (!modelFile && !modelImg) {
      setError(
        "Please select a model image or choose a model from the dialog."
      );
      return false;
    }
    if (dressInputs.length === 0) {
      setError("Please add at least one dress image.");
      return false;
    }
    for (const [i, input] of dressInputs.entries()) {
      if (!input.file) {
        setError(`Dress image ${i + 1} is missing an image.`);
        return false;
      }
      if (!input.prompt.trim()) {
        setError(`Dress image ${i + 1} is missing a prompt.`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    // Prepare FormData for file upload
    const formData = new FormData();
    if (modelFile) {
      formData.append("person", modelFile);
    } else if (modelImg) {
      formData.append("personUrl", modelImg);
    }
    if (dressInputs[0]?.file) formData.append("garment", dressInputs[0].file);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/tryon/nanobanana", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Expecting { imageUrl, catelogId }
      const { imageUrl, catelogId } = response.data;
      setGeneratedImageUrl(imageUrl);
      setShowModal(true);
      // Optionally, you can use catelogId for further logic
    } catch (err: any) {
      console.error("Generation error:", err);
      let errorMsg = "Something went wrong while generating the image.";
      // Try to extract error message from server response
      if (err?.response?.data) {
        // If responseType is blob, need to parse it
        try {
          const text = await err.response.data.text();
          const json = JSON.parse(text);
          errorMsg = json.error || json.message || errorMsg;
        } catch {
          // fallback to default
        }
      } else if (err?.message) {
        errorMsg = err.message;
      }
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-100 to-green-200">
      <div className="w-full max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-2xl flex flex-col gap-8">
        <h2 className="text-3xl font-extrabold mb-2 text-emerald-700 text-center tracking-tight drop-shadow-lg">
          AI Try-On Editor
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-3 text-lg">
              Model Image
            </label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-semibold shadow"
                onClick={() => setModelDialogOpen(true)}
              >
                Select Model
              </button>
              <span className="text-gray-400 text-base">
                or upload from device
              </span>
            </div>
            <div
              className="border-2 border-emerald-100 rounded-xl overflow-hidden shadow-md cursor-pointer relative bg-gray-50 flex items-center justify-center h-72"
              onClick={() => modelInputRef.current?.click()}
            >
              {modelImg ? (
                <img
                  src={modelImg}
                  alt="Model"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-base flex-col">
                  <ImageIcon className="mx-auto mb-2 w-12 h-12" />
                  Click to browse model image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={modelInputRef}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files?.[0]) handleModelChange(e.target.files[0]);
                }}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-3 text-lg">
              Dress Images
            </label>
            {dressInputs.map((input, index) => (
              <div
                key={index}
                className="border-2 border-gray-200 rounded-xl p-4 mb-6 bg-gray-50 relative shadow-sm"
              >
                <button
                  type="button"
                  disabled={dressInputs.length === 1}
                  onClick={() => handleDelete(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  title="Delete Dress Image"
                >
                  <Trash2 size={20} />
                </button>
                <div
                  className="w-full h-56 border-2 border-dashed border-emerald-200 flex items-center justify-center rounded-lg text-gray-400 mb-3 cursor-pointer bg-white"
                  onClick={() =>
                    document.getElementById(`file-input-${index}`)?.click()
                  }
                >
                  {input.preview ? (
                    <img
                      src={
                        typeof input.preview === "string" ? input.preview : ""
                      }
                      alt={`Dress ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-gray-400 text-base">
                      <ImageIcon className="mx-auto mb-2 w-8 h-8" />
                      Click to browse dress image
                    </div>
                  )}
                  <input
                    id={`file-input-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.files?.[0]) {
                        handleFileChange(index, e.target.files[0]);
                      }
                    }}
                  />
                </div>
                <textarea
                  placeholder="Enter prompt for this dress image"
                  value={input.prompt}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    handlePromptChange(index, e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md p-2 mb-2 text-base"
                  rows={2}
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-emerald-700 text-white px-4 py-3 rounded-xl hover:bg-emerald-800 font-bold text-lg disabled:bg-gray-400 transition-colors shadow"
            >
              {loading ? "Generating..." : "🚀 Generate Product"}
            </button>
          </div>
        </form>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <ModelSelectDialog
          open={modelDialogOpen}
          onClose={() => setModelDialogOpen(false)}
          onSelect={handleModelSelect}
        />
        {showModal && generatedImageUrl && (
          <GeneratedImageModal
            imageUrl={generatedImageUrl}
            onClose={() => setShowModal(false)}
          />
        )}
        <BusyIndicator show={loading} />
      </div>
    </div>
  );
};

export default EditorView;
