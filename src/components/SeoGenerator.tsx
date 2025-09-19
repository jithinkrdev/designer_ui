import React, { useState } from "react";
import { useSeoGeneratorApi } from "../api/useSeoGeneratorApi";
import { Copy } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Skeleton } from "./ui/skeleton";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { toast } from "sonner";
import TwoSectionSwitcher from "./common/TwoSectionSwitcher";
import { LoadingState } from "./ui/loading";
import { useIsMobile } from "./ui/use-mobile";

const SeoGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    brand: "",
    brief: "",
    contact: "",
    whatsapp: "",
    platform: "",
    dressType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  // Remove snackbar state, use sonner toast instead
  const { generateSeo, seoResponse, Loader } = useSeoGeneratorApi();

  const isMobile = useIsMobile();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const payload = {
      brandName: formData.brand,
      brief: formData.brief,
      contactNo: formData.contact,
      whatsappLink: formData.whatsapp,
      platform: formData.platform,
      dresstype: formData.dressType,
    };
    try {
      await generateSeo(payload);
      toast.success("SEO generated successfully!");
    } catch (err: any) {
      const apiMessage =
        err?.response?.data?.error || err.message || "Failed to generate SEO.";
      toast.error(apiMessage);
      console.error("SEO generation error:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const sectionA = (
    <div className="w-full max-w-md bg-transparent px-2 sm:px-0">
      <h2 className="text-xl font-semibold mb-6 text-white">SEO Generator</h2>
      <form onSubmit={handleSubmit} className="space-y-5 h-full">
        <div className="mb-2">
          <Label className="mb-2">Brand Name (*)</Label>
          <Input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div className="mb-2 mt-8">
          <Label className="mb-2">Brief about post/Reel (*)</Label>
          <Textarea
            name="brief"
            value={formData.brief}
            onChange={handleChange}
            rows={3}
            className="mt-1"
          />
        </div>

        <div className="mb-2 mt-8">
          <Label className="mb-2">Contact No (*)</Label>
          <Input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div className="mb-2 mt-8">
          <Label className="mb-2">WhatsApp Link (optional)</Label>
          <Input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="mt-1"
          />
        </div>

        <div className="mb-2 mt-8">
          <Label className="mb-2">Platform (*)</Label>
          <RadioGroup
            name="platform"
            value={formData.platform}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, platform: value }))
            }
            className="flex gap-6 mt-1"
          >
            <Label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="YouTube" id="platform-youtube" />
              <span>YouTube</span>
            </Label>
            <Label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="Instagram" id="platform-instagram" />
              <span>Instagram</span>
            </Label>
          </RadioGroup>
        </div>

        <div className="mb-4 mt-8">
          <Label className="mb-2">Dress Type (*)</Label>
          <RadioGroup
            name="dressType"
            value={formData.dressType}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, dressType: value }))
            }
            className="flex gap-4 flex-wrap mt-1"
          >
            {["Nighty", "TShirt", "Kurty", "Churidar"].map((type) => (
              <Label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <RadioGroupItem value={type} id={`dressType-${type}`} />
                <span>{type}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-semibold mt-2"
        >
          Generate SEO Content
        </button>
      </form>
    </div>
  );

  const sectionB = (
    <div className="w-full  px-2 sm:pl-8 min-h-screen flex flex-col">
      <h2 className="text-lg font-semibold mb-6">Generated Results</h2>
      <div className="bg-slate-800 mb-8 rounded-lg p-8 flex-1 flex items-center justify-center text-gray-400 relative">
        {Loader.isLoading ? (
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        ) : seoResponse ? (
          <div className="w-full relative">
            <button
              className="absolute top-2 right-2 p-2 rounded hover:bg-gray-700 text-gray-300 z-10"
              onClick={() => {
                navigator.clipboard.writeText(seoResponse);
                toast.success("Copied to clipboard!");
              }}
              title="Copy to clipboard"
            >
              <Copy size={20} />
            </button>
            <span className="text-white whitespace-pre-line block">
              {seoResponse}
            </span>
          </div>
        ) : (
          "Your SEO content will appear here..."
        )}
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex lg:px-8 py-8 lg:gap-8 h-full relative">
      <TwoSectionSwitcher
        sectionA={sectionA}
        sectionB={sectionB}
        initialSection="A"
        sectionALabel="Form"
        sectionBLabel="Result"
        showSwitch={isMobile || submitted}
      />
      {Loader.isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
          <LoadingState
            title={Loader.title}
            subtitle={Loader.subtitle}
            progress={Loader.progress}
          />
        </div>
      )}
    </div>
  );
};

export default SeoGenerator;
