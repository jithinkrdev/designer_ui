// src/utils/withLoader.ts
import type { Dispatch, SetStateAction } from "react";

export interface LoaderState {
  isLoading: boolean;
  title: string;
  subtitle: string;
  progress?: number;
}

export function withLoader<T extends any[], R>(
  asyncFn: (...args: T) => Promise<R>,
  setLoader: Dispatch<SetStateAction<LoaderState>>,
  options?: { title?: string; subtitle?: string; progress?: number }
) {
  return async (...args: T): Promise<R> => {
    setLoader({
      isLoading: true,
      title: options?.title || "Loading...",
      subtitle: options?.subtitle || "Please wait...",
      progress: options?.progress ?? 0,
    });
    let progress = options?.progress ?? 0;
    // Simulate progress increment
    const interval = setInterval(() => {
      progress = Math.min(progress + 0.1, 99);
      setLoader((prev) => ({ ...prev, progress }));
    }, 300);
    try {
      const result = await asyncFn(...args);
      clearInterval(interval);
      setLoader({ isLoading: false, title: "", subtitle: "", progress: 100 });
      return result;
    } catch (error) {
      clearInterval(interval);
      setLoader({ isLoading: false, title: "", subtitle: "", progress: 0 });
      throw error;
    }
  };
}
