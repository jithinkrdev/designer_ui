import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageWithFallback } from "../lib/ImageWithFallback";
import { Button } from "../ui/button";
import { Edit3, Undo, Download } from "lucide-react";
import api from "../../api/config";
// import { downloadImage } from "../../utilities/utils";

type Catalog = {
  imageUrl: string;
  // Add other properties if needed
};

const History = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    api
      .get("/catelog", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCatalogs(res.data);
      })
      .catch(() => {
        toast.error("Failed to fetch catalogs");
      });
  }, []);

  return (
    <div className="space-y-8">
      {/* First AI Outfit Section */}

      {/* Second AI Outfit Section */}
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-white">🤖 Previous Results</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <Edit3 size={16} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <Undo size={16} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {catalogs.length === 0 ? (
            <div className="col-span-4 flex items-center justify-center h-[200px] text-gray-400 text-lg">
              No previous results found.
            </div>
          ) : (
            catalogs.map((catalog, index) => (
              <div
                key={`second-${index}`}
                className="aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden relative group cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
              >
                <button
                  className="absolute top-2 right-2 z-10 p-1 bg-gray-900/70 rounded-full hover:bg-gray-800 text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(catalog.imageUrl, "_blank");
                  }}
                  title="Download image"
                >
                  <Download size={18} />
                </button>
                <ImageWithFallback
                  src={catalog.imageUrl}
                  alt={`AI Outfit Result ${index + 5}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default History;
