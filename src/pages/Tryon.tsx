import { useState } from "react";
import { useTryOnApi } from "../api/useTryOnApi";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../layout/Sidebar";
import ModalOption from "../components/tryon/ModalSelector";
import GarmentSelector from "../components/tryon/GarmentSelector";
import History from "../components/tryon/History";
import TwoSectionSwitcher from "../components/common/TwoSectionSwitcher";
import { useIsMobile } from "../components/ui/use-mobile";
import Result from "../components/tryon/Result";
import { getAvailableQuata } from "../components/ui/utils";
import type { Model } from "../types";
import { LoadingState } from "../components/ui/loading";

interface TryOnPageProps {
  onBackToSetup?: () => void;
}

export default function TryOn({ onBackToSetup }: TryOnPageProps) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [modelImg, setModelImg] = useState<File | string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const isMobile = useIsMobile();

  const { generateTryOn, Loader, generatedImages } = useTryOnApi();

  const tabs = ["All", "Images", "Videos", "Audio"];

  const handleGenerate = async () => {
    // Validation
    if (!modelImg && !selectedModel) {
      toast.error("Please select a model image or a virtual model.");
      return;
    }
    if (!uploadedImages || uploadedImages.length === 0) {
      toast.error("Please upload at least one garment image.");
      return;
    }
    try {
      const result = await generateTryOn(
        modelImg,
        selectedModel,
        uploadedImages
      );
      // Update availableQuata in localStorage subscription
      if (result && typeof result.quotaUsed === "number") {
        const subRaw = localStorage.getItem("subscription");
        if (subRaw) {
          try {
            const sub = JSON.parse(subRaw);
            sub.availableQuata = sub.availableQuata - result.quotaUsed;
            localStorage.setItem("subscription", JSON.stringify(sub));
          } catch (e) {
            // Optionally handle JSON parse error
          }
        }
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to generate try-on. Please try again."
      );
    }
  };

  const sectionA = (
    <div className="lg:w-1/3 bg-gray-900 h-full min-h-screen flex">
      <div className="flex-1 p-4 overflow-y-auto max-h-screen">
        <div className="space-y-6 pb-24">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              {onBackToSetup && (
                <button
                  onClick={onBackToSetup}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <h1 className="text-white">AI Virtual Try-On Generator</h1>
            </div>
          </div>

          {/* Tabs for Virtual Model and AI Virtual Try-On */}
          <Tabs defaultValue="aiTryOn">
            <TabsList className="flex gap-2 bg-gray-800 rounded-lg p-1 mb-4">
              <TabsTrigger
                value="aiTryOn"
                className="px-4 py-2 rounded-lg font-semibold"
              >
                AI Virtual Try-On
              </TabsTrigger>
            </TabsList>

            <TabsContent value="aiTryOn">
              {/* Virtual Model Tab Content */}
              <ModalOption
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
                modelImg={modelImg}
                setModelImg={setModelImg}
              />
              <GarmentSelector
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
              />

              <div className="flex mt-8 items-center gap-4 w-full">
                <Button
                  onClick={handleGenerate}
                  disabled={Loader.isLoading}
                  className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold"
                >
                  {Loader.isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Generate
                    </div>
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );

  const sectionB = (
    <div className="flex-1 bg-gray-900 h-full overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 max-h-screen min-h-screen">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === tab
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-8">
              <input
                type="checkbox"
                id="favorites"
                className="rounded border-gray-600 bg-gray-800"
              />
              <label htmlFor="favorites" className="text-gray-400">
                Favorites
              </label>
            </div>
          </div>

          <div className="flex items-center gap-4 pr-8">
            <div className="flex items-center gap-2 text-gray-400">
              <span>📁 Assets</span>
              <Badge
                variant="outline"
                className="bg-green-600 text-white border-green-600"
              >
                {`💎 ${getAvailableQuata()}`}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Try-On Results */}
      <div className="p-6 space-y-8">
        {/* First AI Outfit Section */}
        <Result
          isGenerating={Loader.isLoading}
          tryOnResults={generatedImages}
        />

        {/* Second AI Outfit Section */}
        <History />
      </div>
    </div>
  );

  return (
    <div className="h-screen bg-background flex overflow-hidden bg-gray-800 relative">
      {/* Left Sidebar */}
      <Sidebar />
      <TwoSectionSwitcher
        sectionA={sectionA}
        sectionB={sectionB}
        initialSection="A"
        sectionALabel="Form"
        sectionBLabel="Result"
        showSwitch={isMobile}
      />
      {Loader.isLoading && (
        <LoadingState
          title={Loader.title}
          subtitle={Loader.subtitle}
          progress={Loader.progress}
        />
      )}
    </div>
  );
}
