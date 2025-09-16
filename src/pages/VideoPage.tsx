import { ArrowLeft, Bot } from "lucide-react";
import Layout from "../layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import GarmentSelector from "../components/tryon/GarmentSelector";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { VideoWithFallback } from "../components/lib/VideoWithFallback";
import TwoSectionSwitcher from "../components/common/TwoSectionSwitcher";
import { useIsMobile } from "../components/ui/use-mobile";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import api from "../api/config";
import { withLoader } from "../utils/withLoader";
import { LoadingState } from "../components/ui/loading";

interface VideoPageProps {
  onBackToSetup?: () => void;
}

interface VideoResponse {
  videoUrl: string;
}

const VideoPage = ({ onBackToSetup }: VideoPageProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("Describe your video...");
  const [error, setError] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [language, setLanguage] = useState<string>("malayalam");
  const isMobile = useIsMobile();
  interface LoaderState {
    isLoading: boolean;
    title: string;
    subtitle: string;
    progress?: number;
  }

  const [Loader, setLoader] = useState<LoaderState>({
    isLoading: false,
    title: "",
    subtitle: "",
    progress: 0,
  });

  const handleGenerate = async () => {
    const formData = new FormData();
    if (uploadedImages.length > 0) {
      formData.append("image", uploadedImages[0]);
    }
    if (prompt.trim()) {
      formData.append("prompt", prompt.trim());
    }
    setError("");
    if (uploadedImages.length === 0) {
      setError("Please upload at least one image.");
      return;
    }
    if (!prompt.trim() || prompt.trim() === "Describe your video...") {
      setError("Please enter a video prompt.");
      return;
    }
    setIsGenerating(true);
    const token = localStorage.getItem("token");
    formData.append("aspectRatio", aspectRatio);
    // formData.append("language", language);
    const res = await api.post<VideoResponse>("/video/generate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setVideoUrl(res.data.videoUrl || "");
    setIsGenerating(false);
  };

  const _generatePrompt = async (fullDetails: string, language: string) => {
    const token = localStorage.getItem("token");
    const payload = { fullDetails, language };
    const res = await api.post("/video/generate-prompt", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPrompt(res?.data?.generatedPrompt);
    return res.data;
  };

  const generatePrompt = withLoader(_generatePrompt, setLoader, {
    title: "Generating Prompt",
    subtitle: "Please wait...",
    progress: 10,
  });

  const sectionA = (
    <div className="lg:w-1/3 bg-gray-900 h-full min-h-screen flex">
      <div className="flex-1 p-4 overflow-y-auto">
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
              <h1 className="text-white">AI Video Generator</h1>
            </div>
          </div>

          {/* Tabs for Virtual Model and AI Virtual Try-On */}
          <Tabs defaultValue="aiTryOn">
            <TabsList className="flex gap-2 bg-gray-800 rounded-lg p-1 mb-4">
              <TabsTrigger
                value="aiTryOn"
                className="px-4 py-2 rounded-lg font-semibold text-white"
              >
                AI Video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="aiTryOn">
              {/* Virtual Model Tab Content */}

              <GarmentSelector
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                allowMultiple={false}
              />

              {/* Aspect Ratio Radio Group */}
              <div className="mb-4">
                <span className="text-white font-medium mb-2 block">
                  Aspect Ratio
                </span>
                <RadioGroup
                  name="aspectRatio"
                  value={aspectRatio}
                  onValueChange={setAspectRatio}
                  className="flex gap-6"
                >
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <RadioGroupItem value="16:9" id="aspect-16-9" />
                    <span>16:9 (default, 720p & 1080p)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <RadioGroupItem value="9:16" id="aspect-9-16" />
                    <span>9:16 (720p)</span>
                  </label>
                </RadioGroup>
              </div>
              {/* Language Checkbox Group */}
              <div className="mb-4">
                <span className="text-white font-medium mb-2 block">
                  Language
                </span>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <Checkbox
                      checked={language === "malayalam"}
                      onCheckedChange={() => setLanguage("malayalam")}
                      id="lang-malayalam"
                    />
                    <span>Malayalam</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-white">
                    <Checkbox
                      checked={language === "english"}
                      onCheckedChange={() => setLanguage("english")}
                      id="lang-english"
                    />
                    <span>English</span>
                  </label>
                </div>
              </div>
              {/* Action Bar above textarea */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Video Prompt</span>
                {/* Add more actions here if needed */}
              </div>
              <div className="relative mb-8">
                <Textarea
                  className="pr-12"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe your video..."
                />
                <button
                  type="button"
                  className="absolute right-3 top-2/4 -translate-y-1/2 p-2 rounded-full bg-gray-700 hover:bg-green-600 text-white transition-colors flex items-center"
                  title="Generate AI prompt"
                  onClick={() => generatePrompt(prompt, language)}
                >
                  <Bot size={20} />
                </button>
              </div>

              <div className="flex items-center gap-4 w-full">
                {error && (
                  <div className="mb-4 text-red-500 text-sm font-semibold">
                    {error}
                  </div>
                )}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold"
                >
                  {isGenerating ? (
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
    <div className="flex-1 bg-gray-800 h-full min-h-screen flex items-center justify-center">
      {videoUrl ? (
        <div className="w-full max-w-2xl flex flex-col items-center justify-center">
          <VideoWithFallback
            src={videoUrl}
            className="w-full h-96 rounded-lg bg-black"
          />
        </div>
      ) : (
        <div className="text-gray-400">Video Preview Area</div>
      )}
    </div>
  );
  return (
    <Layout>
      {" "}
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
    </Layout>
  );
};

export default VideoPage;
