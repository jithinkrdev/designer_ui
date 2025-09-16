import { useState } from "react";
import { useCatalog } from "../../api/useCatalog";
import { ImageWithFallback } from "../lib/ImageWithFallback";
import { Button } from "../ui/button";

interface CatalogSelectorProps {
  onSelect?: (catalog: any, setSelecting: (val: boolean) => void) => void;
  selectingLabel?: string;
}

export const CatalogSelector = ({
  onSelect,
  selectingLabel = "Selecting...",
}: CatalogSelectorProps) => {
  const { catalogs, loading } = useCatalog();
  const [selectingId, setSelectingId] = useState<string | null>(null);

  console.log({ selectingId });

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2 text-white">Catalog Images</h2>
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : catalogs.length === 0 ? (
        <div className="text-gray-400">No catalogs found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {catalogs
            .filter((cat) => !!cat.imageUrl)
            .map((cat) => (
              <div
                key={cat._id}
                className="bg-gray-800 rounded-lg p-2 flex flex-col items-center relative"
              >
                <div className="w-full h-32 relative">
                  <ImageWithFallback
                    src={cat.imageUrl}
                    alt={cat.name || "Catalog Image"}
                    className="w-full h-32 object-cover rounded"
                  />
                  <Button
                    size="sm"
                    className="absolute bottom-2 cursor-pointer right-2 bg-green-600 hover:bg-green-700 text-white rounded shadow"
                    disabled={!!selectingId && selectingId !== cat._id}
                    onClick={() => {
                      setSelectingId(cat._id);
                      if (onSelect) {
                        onSelect(cat, (val: boolean) => {
                          if (!val) setSelectingId(null);
                        });
                      }
                    }}
                  >
                    {selectingId === cat._id ? selectingLabel : "Select"}
                  </Button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
