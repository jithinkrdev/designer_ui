import React, { useState } from "react";
import Sidebar from "../layout/Sidebar";
import CatalogDialog from "../components/modals/CatalogDialog";

const designs = [
  {
    id: 1,
    img: "https://img.icons8.com/fluency/256/design--v2.png",
    name: "Poster Design 1",
  },
  {
    id: 2,
    img: "https://img.icons8.com/fluency/256/design.png",
    name: "Logo Design 2",
  },
  {
    id: 3,
    img: "https://img.icons8.com/fluency/256/paint-palette.png",
    name: "Art Design 3",
  },
  {
    id: 4,
    img: "https://img.icons8.com/fluency/256/brush.png",
    name: "Brush Design 4",
  },
  // Add more as needed
];

const DesignListPage: React.FC = () => {
  const [selected, setSelected] = useState<{
    image: string;
    name: string;
  } | null>(null);
  const fallbackImg = "https://img.icons8.com/fluency/96/image.png";

  return (
    <div className="min-h-screen bg-emerald-50">
      <Sidebar />
      <main className="pt-24 pl-0 md:pl-64">
        <div className="max-w-6xl mx-auto p-6 mt-8">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
            Designs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {designs.map((design) => (
              <div
                key={design.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-center p-4"
                onClick={() =>
                  setSelected({ image: design.img, name: design.name })
                }
              >
                <img
                  src={design.img}
                  alt={design.name}
                  className="w-40 h-40 object-contain mb-4 rounded-lg"
                  onError={(e) => (e.currentTarget.src = fallbackImg)}
                />
                <h3 className="text-lg font-semibold text-emerald-700">
                  {design.name}
                </h3>
              </div>
            ))}
          </div>
          {selected && (
            <CatalogDialog
              image={selected.image}
              name={selected.name}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default DesignListPage;
