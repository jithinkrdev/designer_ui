import React, { useEffect, useState } from "react";
import { toast } from "sonner";
// Model type for modal selector
import { X } from "lucide-react";
import { ImageWithFallback } from "../lib/ImageWithFallback";
import { Plus } from "lucide-react";
import api from "../../api/config";
import type { Model } from "../../types";

interface ModalSelectorProps {
  selectedModel: Model | null;
  setSelectedModel: React.Dispatch<React.SetStateAction<Model | null>>;
  modelImg: File | string | null;
  setModelImg: React.Dispatch<React.SetStateAction<File | string | null>>;
}

const tabs = ["Default", "Upload"];

const ModalSelector: React.FC<ModalSelectorProps> = ({
  selectedModel,
  setSelectedModel,
  modelImg,
  setModelImg,
}) => {
  const [activeTab, setActiveTab] = useState("Default");
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    api
      .get("/model", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setModels(res.data))
      .catch(() => {
        toast.error("Failed to fetch models.");
      });
  }, []);
  const handleSelectModel = (model: Model) => {
    setSelectedModel(model);
  };

  const isGenerating = false; // Replace with actual state if needed
  return (
    <div>
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`cursor-pointer px-3 py-1 rounded transition-colors ${
              activeTab === tab
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "Default" && (
        <div className="p-4 bg-gray-800 rounded-lg text-white">
          <div className="grid grid-cols-4 gap-4">
            {models.length === 0 ? (
              <div className="col-span-4 flex items-center justify-center h-[200px] text-gray-400 text-lg">
                There is no default modals available on the system.
              </div>
            ) : (
              models.map((image, index) => (
                <div
                  key={`first-${index}`}
                  className={`aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden relative group cursor-pointer transition-all
                    ${
                      selectedModel && image._id === selectedModel._id
                        ? "ring-2 ring-blue-500 border-2 border-blue-500"
                        : "hover:ring-2 hover:ring-blue-500"
                    }`}
                  onClick={() => handleSelectModel(image)}
                >
                  {isGenerating ? (
                    <div className="w-full h-full bg-gray-700 animate-pulse flex items-center justify-center">
                      <div className="text-gray-500">Generating...</div>
                    </div>
                  ) : (
                    <ImageWithFallback
                      src={image.imageUrl}
                      alt={`AI Outfit Result ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {activeTab === "Upload" && (
        <div
          className="p-4 bg-gray-800 rounded-lg text-white cursor-pointer"
          onClick={() => {
            if (!selectedModel?.imageUrl)
              document.getElementById("modal-upload-input")?.click();
          }}
        >
          <input
            id="modal-upload-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setModelImg(file);
              }
            }}
            // Reset value on click so same file can be selected again
            onClick={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
          />
          <div className="bg-gray-800 p-2 rounded-lg">
            <div className="h-40 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center relative group">
              {modelImg ? (
                <>
                  <img
                    src={
                      typeof modelImg === "string"
                        ? modelImg
                        : URL.createObjectURL(modelImg)
                    }
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-black/60 rounded-full p-1 hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      setModelImg(null);
                      const input = document.getElementById(
                        "modal-upload-input"
                      ) as HTMLInputElement | null;
                      if (input) input.value = "";
                    }}
                  >
                    <X size={18} className="text-white" />
                  </button>
                </>
              ) : (
                <>
                  <Plus size={24} className="text-gray-500 mb-2" />
                  <span className="text-gray-500 text-sm">
                    Upload a modal image
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalSelector;
