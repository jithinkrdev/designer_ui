import React, { useState } from "react";
import api from "../api/config"; // Adjust the import based on your project structure
import Snackbar from "./common/Snackbar";
import SeoDialog from "./modals/SeoDialog";
import BusyIndicator from "./common/BusyIndicator";

const SeoGenerator: React.FC = () => {
  const [brief, setBrief] = useState("");
  const [contact, setContact] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [platform, setPlatform] = useState<string>("");
  const [dressType, setDressType] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [seoDialogOpen, setSeoDialogOpen] = useState(false);
  const [seoResponse, setSeoResponse] = useState("");
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setLoading(true);
    // Prepare payload
    const payload = {
      brandName,
      brief,
      contactNo: contact,
      whatsappLink: whatsapp,
      platform,
      dresstype: dressType,
    };
    try {
      const token = localStorage.getItem("token");
      const res = await api.post("/seo-generator", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log({ res });
      setSeoResponse(res.data || "");
      setSeoDialogOpen(true);
      setSnackbar({ message: "SEO generated successfully!", type: "success" });
    } catch (err) {
      setSnackbar({ message: "Failed to generate SEO.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-24 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-emerald-600 text-center">
        SEO Generator
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Brand Name (*)
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 mb-4"
            placeholder="Enter brand name"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Brief about post/Reel (*)
          </label>
          <textarea
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={3}
            placeholder="Describe your post..."
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Contact No (*)
          </label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter contact number"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            WhatsApp Link (optional)
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter WhatsApp link"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Platform(*)
          </label>
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="platform"
                value="youtube"
                checked={platform === "youtube"}
                onChange={(e) => setPlatform(e.target.value)}
              />
              YouTube
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="platform"
                value="instagram"
                checked={platform === "instagram"}
                onChange={(e) => setPlatform(e.target.value)}
              />
              Instagram
            </label>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Dress Type (*)
          </label>
          <div className="flex gap-6 items-center">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dressType"
                value="Nighty"
                checked={dressType === "Nighty"}
                onChange={(e) => setDressType(e.target.value)}
              />
              Nighty
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dressType"
                value="TShirt"
                checked={dressType === "TShirt"}
                onChange={(e) => setDressType(e.target.value)}
              />
              TShirt
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dressType"
                value="Kurty"
                checked={dressType === "Kurty"}
                onChange={(e) => setDressType(e.target.value)}
              />
              Kurty
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="dressType"
                value="Churidar"
                checked={dressType === "Churidar"}
                onChange={(e) => setDressType(e.target.value)}
              />
              Churidar
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-700 text-white px-4 py-2 rounded-md hover:bg-emerald-800 font-semibold transition-colors"
        >
          Generate SEO Content
        </button>
      </form>
      {submitted && (
        <div className="mt-6 text-center text-green-700 font-semibold">
          Form submitted! (You can handle API logic here)
        </div>
      )}
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
      <SeoDialog
        response={seoResponse}
        open={seoDialogOpen}
        onClose={() => setSeoDialogOpen(false)}
      />
      <BusyIndicator show={loading} />
    </div>
  );
};

export default SeoGenerator;
