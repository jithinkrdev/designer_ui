import { ArrowLeft, Bot } from "lucide-react";
import Layout from "../layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import GarmentSelector from "../components/tryon/GarmentSelector";
import { CatalogSelector } from "../components/video/CatelogSelector";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { VideoWithFallback } from "../components/lib/VideoWithFallback";
import TwoSectionSwitcher from "../components/common/TwoSectionSwitcher";
import { useIsMobile } from "../components/ui/use-mobile";
import { Textarea } from "../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { useGeneratePrompt } from "../api/useGeneratePrompt";
import { useVideoApi } from "../api/useVideoApi";
import { LoadingState } from "../components/ui/loading";
import { downloadVideo } from "../utilities/utils";

interface VideoPageProps {
  onBackToSetup?: () => void;
}

const VideoPage = ({ onBackToSetup }: VideoPageProps) => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<string>("16:9");
  const [language, setLanguage] = useState<string>("malayalam");
  const isMobile = useIsMobile();

  const {
    generatePrompt,
    prompt,
    Loader: PromptLoader,
    setPrompt,
  } = useGeneratePrompt();
  const {
    generateVideo,
    getAllVideos,
    Loader: VideoLoader,
    videoUrl,
    // videos,
  } = useVideoApi();
  const [tab, setTab] = useState("catalog");

  const [previousResults, setPreviousResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const fetchedVideos = await getAllVideos();
        console.log({
          fetchedVideos,
        });

        setPreviousResults(
          fetchedVideos.map((v: any, idx: number) => ({
            id: idx + 1,
            url: v.videoUrl,
            name: `Result ${idx + 1}`,
          }))
        );
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchVideos();
  }, [getAllVideos]);

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
    formData.append("aspectRatio", aspectRatio);
    // formData.append("language", language);
    try {
      await generateVideo(formData);
    } catch (err) {
      setError("Failed to generate video.");
    }
  };

  const sectionA = (
    <div className="lg:w-1/3 bg-gray-900 h-full min-h-screen flex">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6 pb-24">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-1">
              {onBackToSetup && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={onBackToSetup}
                  className="text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <ArrowLeft size={16} />
                </Button>
              )}
              <h1 className="text-white">AI Video Generator</h1>
            </div>
          </div>

          {/* Tabs for Virtual Model and AI Virtual Try-On */}
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="flex gap-2 bg-gray-800 rounded-lg p-1 mb-4">
              <TabsTrigger
                value="catalog"
                className="px-4 py-2 rounded-lg font-semibold text-white"
              >
                Catalog
              </TabsTrigger>
              <TabsTrigger
                value="upload"
                className="px-4 py-2 rounded-lg font-semibold text-white"
              >
                AI Video
              </TabsTrigger>
            </TabsList>
            <TabsContent value="catalog">
              <CatalogSelector
                selectingLabel="Selecting..."
                onSelect={async (catalog, setSelecting) => {
                  if (catalog?.imageUrl) {
                    setSelecting(true);
                    setUploadedImages([]);
                    try {
                      const res = await fetch(
                        `${catalog.imageUrl}?v=${Date.now()}`
                      );
                      const blob = await res.blob();
                      const file = new File(
                        [blob],
                        catalog.name || "catalog-image.jpg",
                        { type: blob.type }
                      );
                      setTab("upload");
                      setUploadedImages([file]);
                    } catch (err) {
                      console.error("Fetch error:", err);
                    } finally {
                      setSelecting(false);
                    }
                  }
                }}
              />
            </TabsContent>
            <TabsContent value="upload">
              {/* Virtual Model Tab Content */}
              <GarmentSelector
                uploadedImages={uploadedImages}
                setUploadedImages={setUploadedImages}
                allowMultiple={false}
              />
            </TabsContent>
          </Tabs>

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
            <span className="text-white font-medium mb-2 block">Language</span>
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
              disabled={VideoLoader.isLoading}
              className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold"
            >
              {VideoLoader.isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generate
                </div>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const sectionB = (
    <div className="flex-1 bg-gray-800 h-full min-h-screen flex flex-col gap-6 p-4">
      {/* Large Preview Area */}
      <div className="bg-[#19213a] rounded-xl p-6 flex flex-col items-center justify-center min-h-[300px] mb-2">
        <h2 className="text-white text-lg font-semibold mb-2 flex items-center gap-2">
          <span role="img" aria-label="Virtual Tryon">
            🖼️
          </span>{" "}
          Virtual Tryon
        </h2>
        <div className="flex-1 w-full flex items-center justify-center">
          {!videoUrl ? (
            <span className="text-gray-400 text-xl">
              Your results will be displayed here
            </span>
          ) : (
            <VideoWithFallback
              src={videoUrl}
              className="w-full h-96 rounded-lg bg-black"
            />
          )}
        </div>
      </div>

      {/* Previous Results Grid */}
      <div className="bg-[#19213a] rounded-xl p-6">
        <h2 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
          <span role="img" aria-label="Previous Results">
            🖼️
          </span>{" "}
          Previous Results
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {previousResults.map((result) => (
            <div
              key={result.id}
              className="relative bg-gray-900 rounded-lg overflow-hidden flex flex-col items-center"
            >
              {result.url ? (
                <VideoWithFallback
                  src={result.url}
                  className="w-full h-64 object-cover rounded"
                />
              ) : (
                <div className="w-full h-64 bg-gray-700 flex items-center justify-center text-gray-400 rounded">
                  No result
                </div>
              )}
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute cursor-pointer top-2 right-2 bg-gray-800 hover:bg-green-600 text-white rounded-full p-2 shadow"
                title="Download"
                onClick={() =>
                  result.url && downloadVideo(result.url, result.name)
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                  />
                </svg>
              </Button>
            </div>
          ))}
        </div>
      </div>
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
      {(PromptLoader.isLoading || VideoLoader.isLoading) && (
        <LoadingState
          title={VideoLoader.isLoading ? VideoLoader.title : PromptLoader.title}
          subtitle={
            VideoLoader.isLoading ? VideoLoader.subtitle : PromptLoader.subtitle
          }
          progress={
            VideoLoader.isLoading ? VideoLoader.progress : PromptLoader.progress
          }
        />
      )}
    </Layout>
  );
};

export default VideoPage;
