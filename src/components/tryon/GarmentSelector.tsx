import React, { useState } from "react";
import { Plus } from "lucide-react";

type GarmentSelectorProps = {
  uploadedImages: File[];
  setUploadedImages: React.Dispatch<React.SetStateAction<File[]>>;
  allowMultiple?: boolean;
};

const GarmentSelector: React.FC<GarmentSelectorProps> = ({
  uploadedImages,
  setUploadedImages,
  allowMultiple = true,
}) => {
  // Upload preview and thumbnails
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Upload handler
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (allowMultiple) {
        setUploadedImages((prev) => [...prev, file]);
      } else {
        setUploadedImages([file]);
      }
      setPreviewImage(file);
    }
  };

  // Delete handler
  const handleDelete = (img: File) => {
    setUploadedImages((prev) => prev.filter((i) => i !== img));
    if (previewImage === img) setPreviewImage(null);
    // Reset file input value so same image can be selected again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div>
        {/* Main preview container */}
        <div className="bg-gray-800 p-2 rounded-lg mb-4 mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUpload}
            // Reset value on click so same file can be selected again
            onClick={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
          />
          <div
            className="h-64 bg-repeat border-2 border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer relative group"
            onClick={() => {
              if (!previewImage) fileInputRef.current?.click();
            }}
          >
            {previewImage ? (
              <>
                <img
                  src={URL.createObjectURL(previewImage)}
                  alt="Preview"
                  className="object-contain h-full w-full rounded-lg"
                />
                {/* Overlay icons on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg">
                  <button
                    className="p-2 bg-white/80 rounded-full hover:bg-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(previewImage);
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                  <button
                    className="p-2 bg-white/80 rounded-full hover:bg-blue-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Plus size={32} className="text-gray-500 mb-2" />
                <span className="text-gray-500 text-sm mb-2">
                  Upload garment
                </span>
              </>
            )}
          </div>
        </div>
        {/* Thumbnails below */}
        {uploadedImages.length > 0 && (
          <div className="flex gap-2 mt-2">
            {uploadedImages.map((img, idx) => (
              <div
                key={img.name + idx}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer relative group ${
                  previewImage === img
                    ? "border-blue-500"
                    : "border-gray-600 hover:border-blue-400"
                }`}
                onClick={() => setPreviewImage(img)}
              >
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Garment ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay icons on hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 rounded-lg">
                  <button
                    className="p-1 bg-white/80 rounded-full hover:bg-red-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(img);
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                  <button
                    className="p-1 bg-white/80 rounded-full hover:bg-blue-500"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GarmentSelector;
