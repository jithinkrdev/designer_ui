import React, { useEffect, useState } from "react";
import api from "../../api/config";

interface Model {
  _id: string;
  name: string;
  gender: string;
  imageUrl: string;
  category: string;
}

interface ModelSelectDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (model: Model) => void;
}

const ModelSelectDialog: React.FC<ModelSelectDialogProps> = ({
  open,
  onClose,
  onSelect,
}) => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    api
      .get("/model", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setModels(res.data))
      .catch(() => setError("Failed to fetch models."))
      .finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full relative">
        <h2 className="text-xl font-bold mb-4 text-emerald-700">
          Select a Model
        </h2>
        {loading && <div className="text-center text-gray-500">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {models.map((model) => (
            <div
              key={model._id}
              className={`bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer border-2 transition-all duration-200 ${
                selectedId === model._id
                  ? "border-emerald-600"
                  : "border-transparent"
              }`}
            >
              <img
                src={model.imageUrl}
                alt={model.name}
                className="w-32 h-32 object-contain mb-3 border"
              />
              <h3 className="text-lg font-semibold text-emerald-700 mb-1">
                {model.name}
              </h3>
              <div className="text-sm text-gray-500 mb-1">{model.gender}</div>
              <div className="text-xs text-gray-400">{model.category}</div>
              <button
                onClick={() => {
                  setSelectedId(model._id);
                  const selected = models.find((m) => m._id === model._id);
                  if (selected) onSelect(selected);
                }}
                className="mt-4 bg-emerald-600 text-white px-4 py-1 rounded hover:bg-emerald-700 font-semibold"
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2">
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

export default ModelSelectDialog;
