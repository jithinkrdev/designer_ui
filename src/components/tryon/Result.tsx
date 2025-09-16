import { ImageWithFallback } from "../lib/ImageWithFallback";
import { Button } from "../ui/button";
import { Edit3, Undo } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { downloadImage } from "../../utilities/utils";

const Result = ({
  isGenerating,
  tryOnResults,
}: {
  isGenerating: boolean;
  tryOnResults: string[];
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white">🤖 Virtual Tryon</span>
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
        {isGenerating ? (
          <Skeleton className="w-[248px] h-[331px]" />
        ) : tryOnResults.length === 0 ? (
          <div className="col-span-4 flex items-center justify-center h-[331px]">
            <span className="text-gray-400 text-lg">
              Your results will be displayed here
            </span>
          </div>
        ) : (
          tryOnResults.map((image, index) => (
            <div
              key={`first-${index}`}
              className="aspect-[3/4] bg-gray-700 rounded-lg overflow-hidden relative group cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
            >
              <button
                className="absolute top-2 right-2 z-10 p-1 bg-gray-900/70 rounded-full hover:bg-gray-800 text-white"
                onClick={() =>
                  downloadImage(image, `AI_Outfit_Result_${index + 1}.jpg`)
                }
                title="Download image"
              >
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 5v14m0 0l-6-6m6 6l6-6" />
                </svg>
              </button>
              <ImageWithFallback
                src={image}
                alt={`AI Outfit Result ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Result;
