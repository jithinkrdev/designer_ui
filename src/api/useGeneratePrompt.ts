import { useState, useCallback } from "react";
import api from "./config";
import { withLoader } from "../utils/withLoader";

interface UseGeneratePromptOptions {
  onPrompt?: (prompt: string) => void;
}

export function useGeneratePrompt(options?: UseGeneratePromptOptions) {
  type LoaderState = {
    isLoading: boolean;
    title: string;
    subtitle: string;
    progress?: number;
  };

  const [Loader, setLoader] = useState<LoaderState>({
    isLoading: false,
    title: "",
    subtitle: "",
    progress: 0,
  });
  const [prompt, setPrompt] = useState<string>("");

  const _generatePrompt = useCallback(async (fullDetails: string, language: string) => {
    const token = localStorage.getItem("token");
    const payload = { fullDetails, language };
    const res = await api.post("/video/generate-prompt", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPrompt(res?.data?.generatedPrompt);
    if (options?.onPrompt) options.onPrompt(res?.data?.generatedPrompt);
    return res.data;
  }, [options]);

  const generatePrompt = withLoader(_generatePrompt, setLoader, {
    title: "Generating Prompt",
    subtitle: "Please wait...",
    progress: 10,
  });

  return { generatePrompt, prompt, Loader, setPrompt };
}
