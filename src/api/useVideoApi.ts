import { useState, useCallback } from "react";
import api from "./config";
import { withLoader } from "../utils/withLoader";
import type { LoaderState } from "../utils/withLoader";

interface VideoResponse {
  _id: string;
  user: string;
  videoUrl: string;
  prompt: string;
  imageRef: string;
  createdAt: string;
  __v: number;
}

export function useVideoApi() {
  // Import LoaderState type from withLoader
  const [Loader, setLoader] = useState<LoaderState>({
    isLoading: false,
    title: "",
    subtitle: "",
    progress: 0,
  });
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videos, setVideos] = useState<VideoResponse[]>([]);

  const _generateVideo = useCallback(async (formData: FormData) => {
    const token = localStorage.getItem("token");
    const res = await api.post<VideoResponse>("/video/generate", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    setVideoUrl(res.data.videoUrl || "");
    return res.data;
  }, []);

  const generateVideo = withLoader(_generateVideo, setLoader, {
    title: "Generating Video",
    subtitle: "Please wait...",
    progress: 1,
  });

  const getAllVideos = useCallback(async () => {
    const token = localStorage.getItem("token");
    const res = await api.get<VideoResponse[]>("/video/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setVideos(res?.data);
    return res.data || [];
  }, []);

  return { generateVideo, getAllVideos, videoUrl, videos, Loader };
}
