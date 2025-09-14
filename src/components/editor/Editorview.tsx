import React, { useState } from "react";
import BusyIndicator from "../common/BusyIndicator";
import ModelSelectDialog from "../modals/ModelSelectDialog";
import GeneratedImageModal from "./GeneratedImageModal";
import ModelUploader from "./ModelUploader";
import DressUploader, { type DressInput } from "./DressUploader";
import api from "../../api/config";

interface TryOnResponse {
  imageUrl: string;
  catelogId: string;
  garmentsUsed: number;
}

const EditorView: React.FC = () => {
  const [modelImg, setModelImg] = useState<string | File>("");
  const [dressInputs, setDressInputs] = useState<DressInput[]>([
    { prompt: "", file: null, preview: null },
  ]);

  const [isBusy, setIsBusy] = useState(false);
  const [showModelDialog, setShowModelDialog] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // --- Model upload ---
  const handleModelUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setModelImg(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // --- Dress handlers ---
  const handleDressUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newInputs = [...dressInputs];
      newInputs[index].file = file;
      newInputs[index].preview = reader.result;
      setDressInputs(newInputs);
    };
    reader.readAsDataURL(file);
  };

  const handlePromptChange = (index: number, prompt: string) => {
    const newInputs = [...dressInputs];
    newInputs[index].prompt = prompt;
    setDressInputs(newInputs);
  };

  const handleDeleteDress = (index: number) => {
    if (dressInputs.length === 1) return; // keep at least 1
    setDressInputs(dressInputs.filter((_, i) => i !== index));
  };

  const handleAddDress = () => {
    setDressInputs([...dressInputs, { prompt: "", file: null, preview: null }]);
  };

  const handleGenerate = async (): Promise<void> => {
    setIsBusy(true);
    try {
      const formData = new FormData();

      // Person (model image)
      if (modelImg && typeof modelImg !== "string") {
        formData.append("person", modelImg);
      } else if (typeof modelImg === "string" && modelImg !== "") {
        formData.append("personUrl", modelImg);
      }

      // Dress inputs (garment images + prompts)
      const dressMeta = dressInputs.map((input) => {
        if (input.file) {
          formData.append("garments", input.file); // multer field
        }
        return { prompt: input.prompt || "" };
      });

      // Save prompts separately as JSON
      formData.append("dressinputs", JSON.stringify(dressMeta));

      // API call
      const token = localStorage.getItem("token");
      const res = await api.post<TryOnResponse>("/tryon", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Show result image
      setGeneratedImages([res.data.imageUrl]);
      setShowResult(true);
    } catch (err) {
      console.error("Error generating try-on:", err);
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        AI Try-On Editor
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Model Uploader */}
        <ModelUploader
          modelImg={modelImg}
          onUpload={handleModelUpload}
          onOpenDialog={() => setShowModelDialog(true)}
        />

        {/* Dress Uploader */}
        <DressUploader
          dressInputs={dressInputs}
          onUpload={handleDressUpload}
          onPromptChange={handlePromptChange}
          onDelete={handleDeleteDress}
          onAdd={handleAddDress}
        />
      </div>

      {/* Generate Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleGenerate}
          disabled={isBusy || !modelImg}
          className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 font-semibold shadow disabled:opacity-50"
        >
          {isBusy ? "Generating..." : "Generate"}
        </button>
      </div>

      {/* Modals */}
      <ModelSelectDialog
        open={showModelDialog}
        onClose={() => setShowModelDialog(false)}
        onSelect={(img) => {
          console.log("Selected model image:", img);
          setModelImg(img?.imageUrl);
          setShowModelDialog(false);
        }}
      />
      {isBusy && <BusyIndicator show={isBusy} />}
      {showResult && (
        <GeneratedImageModal
          onClose={() => setShowResult(false)}
          imageUrl={generatedImages[0]}
        />
      )}
    </div>
  );
};

export default EditorView;
