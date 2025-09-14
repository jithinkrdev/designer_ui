import React, { type ChangeEvent } from "react";
import { ImageIcon, Trash2, Plus } from "lucide-react";

export interface DressInput {
  prompt: string;
  file: File | null;
  preview?: string | ArrayBuffer | null;
}

interface Props {
  dressInputs: DressInput[];
  onUpload: (index: number, file: File) => void;
  onPromptChange: (index: number, prompt: string) => void;
  onDelete: (index: number) => void;
  onAdd: () => void;
}

const DressUploader: React.FC<Props> = ({
  dressInputs,
  onUpload,
  onPromptChange,
  onDelete,
  onAdd,
}) => {
  return (
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
            onClick={() => onDelete(index)}
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
                src={typeof input.preview === "string" ? input.preview : ""}
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
                if (e.target.files?.[0]) onUpload(index, e.target.files[0]);
              }}
            />
          </div>
          <textarea
            placeholder="Enter prompt for this dress image"
            value={input.prompt}
            onChange={(e) => onPromptChange(index, e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-2 text-base"
            rows={2}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 text-emerald-600 border border-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
      >
        <Plus size={18} /> Add More Dress Image
      </button>
    </div>
  );
};

export default DressUploader;
