import React from "react";
import { Zap } from "lucide-react";

interface CreditActivityPopoverProps {
  total?: number;
  aiOutfit?: number;
  count?: number;
}

const CreditActivityPopover: React.FC<CreditActivityPopoverProps> = ({
  total = 5,
  aiOutfit = 5,
  count = 1,
}) => {
  return (
    <div className="absolute left-0 bottom-12 min-w-[220px] bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-4 text-white z-50">
      <div className="font-bold text-lg mb-2">Credit Activity</div>
      <div className="border-b border-gray-700 mb-2"></div>
      <div className="flex justify-between mb-1">
        <span>AI Outfit</span>
        <span>{aiOutfit}</span>
      </div>
      <div className="flex justify-between mb-1">
        <span>Count</span>
        <span>x{count}</span>
      </div>
      <div className="border-b border-gray-700 mt-2 mb-2"></div>
      <div className="flex justify-between items-center font-bold text-green-400">
        <span>Total:</span>
        <span className="flex items-center gap-1">
          {" "}
          <Zap size={18} className="inline-block" /> {total}
        </span>
      </div>
    </div>
  );
};

export default CreditActivityPopover;
