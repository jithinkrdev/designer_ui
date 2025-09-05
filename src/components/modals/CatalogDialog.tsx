import React from "react";

interface CatalogDialogProps {
  image: string;
  name: string;
  onClose: () => void;
}

const CatalogDialog: React.FC<CatalogDialogProps> = ({
  image,
  name = "",
  onClose,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <h3 className="text-xl font-bold text-center mb-4">
        {"Catalog Details"}
      </h3>
      <div className="flex justify-center mb-6">
        <img
          src={image}
          alt={name}
          className="max-w-full h-auto rounded-xl shadow-lg border-4 border-emerald-500"
        />
      </div>
      <div className="flex justify-center">
        <a
          href={image}
          download={name.replace(/\s+/g, "_").toLowerCase() + ".png"}
          className="bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 font-semibold"
        >
          Download Image
        </a>
      </div>
    </div>
  </div>
);

export default CatalogDialog;
