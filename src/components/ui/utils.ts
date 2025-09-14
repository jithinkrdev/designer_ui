// Returns the availableQuata value from localStorage subscription object
export function getAvailableQuata(): number {
  if (typeof window === "undefined") return 0;
  const sub = localStorage.getItem("subscription");
  if (!sub) return 0;
  try {
    const parsed = JSON.parse(sub);
    return parsed.availableQuata ?? 0;
  } catch {
    return 0;
  }
}
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
