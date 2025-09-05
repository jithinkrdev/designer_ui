import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import CatalogDialog from "../components/modals/CatalogDialog";
import api from "../api/config";

const fallbackImg = "https://img.icons8.com/fluency/96/image.png";

const CatalogsPage: React.FC = () => {
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [selected, setSelected] = useState<{
    image: string;
    name: string;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const accessToken = localStorage.getItem("token");
    api
      .get("/catelog", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCatalogs(res.data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to fetch catalogs");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-emerald-50">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="pt-24 pl-0 md:pl-64">
        <div className="max-w-6xl mx-auto p-6 mt-8">
          <h2 className="text-2xl font-bold text-emerald-700 mb-6 text-center">
            Catalogs
          </h2>
          {loading && (
            <div className="text-center text-gray-500">Loading...</div>
          )}
          {error && <div className="text-center text-red-500">{error}</div>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center items-start">
            {catalogs.map((cat: any) => (
              <div
                key={cat.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer flex flex-col items-center p-4 w-80 h-96 justify-center"
                onClick={() =>
                  setSelected({ image: cat.imageUrl, name: cat.name })
                }
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-48 h-64 object-contain mb-4 rounded-lg"
                  onError={(e) => (e.currentTarget.src = fallbackImg)}
                />
                <h3 className="text-lg font-semibold text-emerald-700 text-center">
                  {cat.name}
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

export default CatalogsPage;
