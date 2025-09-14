import React, { useState } from "react";

interface TwoSectionSwitcherProps {
  sectionA: React.ReactNode;
  sectionB: React.ReactNode;
  initialSection?: "A" | "B";
  sectionALabel?: string;
  sectionBLabel?: string;
  showSwitch?: boolean; // If false, always show both sections (desktop)
}

const TwoSectionSwitcher: React.FC<TwoSectionSwitcherProps> = ({
  sectionA,
  sectionB,
  initialSection = "A",
  sectionALabel = "Section A",
  sectionBLabel = "Section B",
  showSwitch = false,
}) => {
  const [active, setActive] = useState<"A" | "B">(initialSection);

  return (
    <div className="w-full">
      {/* Mobile: show switcher */}
      {showSwitch ? (
        <div className="mb-4 flex gap-2 justify-center">
          <button
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              active === "A"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActive("A")}
          >
            {sectionALabel}
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              active === "B"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActive("B")}
          >
            {sectionBLabel}
          </button>
        </div>
      ) : null}
      <div>
        {showSwitch ? (
          active === "A" ? (
            sectionA
          ) : (
            sectionB
          )
        ) : (
          <div className="flex">
            {sectionA}
            {sectionB}
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoSectionSwitcher;
