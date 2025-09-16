// components/LoadingState.tsx
import type { FC } from "react";
import * as Progress from "@radix-ui/react-progress";
import { motion } from "framer-motion";

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  progress?: number;
}

const LoadingState: FC<LoadingStateProps> = ({
  title = "Preparing your plan",
  subtitle = "Setting up your nutrition plan and analyzing your goals...",
  progress = 66,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 text-gray-200">
      {/* Circular Loader */}
      <div className="relative mb-6">
        <Progress.Root
          className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-800"
          value={progress}
        >
          <Progress.Indicator
            className="bg-green-500 w-full h-full origin-left"
            style={{ transform: `translateX(-${100 - progress}%)` }}
          />
        </Progress.Root>

        {/* Inner pulse icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">📊</span>
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-400 text-center max-w-xs mt-2">
        {subtitle}
      </p>
    </div>
  );
};

export { LoadingState };
