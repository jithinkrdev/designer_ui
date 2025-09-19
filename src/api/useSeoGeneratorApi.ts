import { useState, useCallback } from "react";
import api from "../api/config";
import { withLoader } from "../utils/withLoader";
import type { LoaderState } from "../utils/withLoader";

export function useSeoGeneratorApi() {
  const [Loader, setLoader] = useState<LoaderState>({
    isLoading: false,
    title: "",
    subtitle: "",
    progress: 0,
  });
  const [seoResponse, setSeoResponse] = useState("");

  const _generateSeo = useCallback(async (payload: any) => {
    const token = localStorage.getItem("token");
    const res = await api.post("/seo-generator", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSeoResponse(res.data || "");
    return res.data;
  }, []);

  const generateSeo = withLoader(_generateSeo, setLoader, {
    title: "Generating SEO Content",
    subtitle: "Please wait...",
    progress: 1,
  });

  return { generateSeo, seoResponse, Loader };
}
