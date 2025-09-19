import { useState, useCallback } from "react";
import api from "../api/config";
import { withLoader } from "../utils/withLoader";
import type { LoaderState } from "../utils/withLoader";
import type { TryOnResponse, Model } from "../types";

export function useTryOnApi() {
  const [Loader, setLoader] = useState<LoaderState>({
    isLoading: false,
    title: "",
    subtitle: "",
    progress: 0,
  });
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [catalogs, setCatalogs] = useState<any[]>([]);

  // Generate Try-On
  const _generateTryOn = useCallback(
    async (
      modelImg: File | string | null,
      selectedModel: Model | null,
      uploadedImages: File[]
    ) => {
      const formData = new FormData();
      if (modelImg instanceof File) {
        formData.append("person", modelImg);
      } else if (typeof selectedModel === "object" && selectedModel !== null) {
        formData.append("personUrl", selectedModel?.imageUrl);
      }
      uploadedImages.forEach((input) => {
        formData.append("garments", input);
      });
      const token = localStorage.getItem("token");
      try {
        const res = await api.post<TryOnResponse>("/tryon", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setGeneratedImages([res.data.imageUrl]);
        return res.data;
      } catch (err: any) {
        // Axios error: err.response?.data?.message or err.message
        const apiMessage =
          err?.response?.data?.error || err.message || "Unknown error";
        console.log({ apiMessage, err });

        throw new Error(apiMessage);
      }
    },
    []
  );

  const generateTryOn = withLoader(_generateTryOn, setLoader, {
    title: "Generating Try-On",
    subtitle: "Please wait...",
    progress: 1,
  });

  // Get all catalogs
  const getAllCatalogs = useCallback(async () => {
    const token = localStorage.getItem("token");
    const res = await api.get<any[]>("/catelog", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setCatalogs(res.data);
    return res.data;
  }, []);

  return { generateTryOn, getAllCatalogs, generatedImages, catalogs, Loader };
}
