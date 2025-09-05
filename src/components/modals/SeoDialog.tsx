import React from "react";

interface SeoDialogProps {
  response: string;
  open: boolean;
  onClose: () => void;
}

const SeoDialog: React.FC<SeoDialogProps> = ({ response, open, onClose }) => {
  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(response);
      // Optionally, show a copied message
    } catch {
      // fallback for older browsers/mobile
      const textarea = document.createElement("textarea");
      textarea.value = response;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom on iOS
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
        <h2 className="text-xl font-bold mb-4 text-emerald-700">
          SEO Generated
        </h2>
        <textarea
          readOnly
          value={response}
          className="w-full h-40 border rounded-md p-2 mb-4 text-gray-700 bg-gray-50 resize-none"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCopy}
            className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 font-semibold"
          >
            Copy
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeoDialog;
