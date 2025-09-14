import React, { type ChangeEvent, useRef } from "react";
import { ImageIcon } from "lucide-react";

interface Props {
  modelImg: string;
  onUpload: (file: File) => void;
  onOpenDialog: () => void;
}

const ModelUploader: React.FC<Props> = ({
  modelImg,
  onUpload,
  onOpenDialog,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-3 text-lg">
        Model Image
      </label>
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-semibold shadow"
          onClick={onOpenDialog}
        >
          Select Model
        </button>
        <span className="text-gray-400 text-base">or upload from device</span>
      </div>

      <div
        className="border-2 border-emerald-100 rounded-xl overflow-hidden shadow-md cursor-pointer relative bg-gray-50 flex items-center justify-center h-72"
        onClick={() => inputRef.current?.click()}
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
          ref={inputRef}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.[0]) onUpload(e.target.files[0]);
          }}
        />
      </div>
    </div>
  );
};

export default ModelUploader;
