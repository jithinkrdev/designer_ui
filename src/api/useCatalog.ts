import { useEffect, useState, useCallback } from "react";
import api from "./config";
import { toast } from "sonner";

export function useCatalog() {
  const [catalogs, setCatalogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch catalogs
  const fetchCatalogs = useCallback(() => {
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
      })
      .catch(() => {
        toast.error("Failed to fetch catalogs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Add catalog
  const addCatalog = useCallback(async (catalogData: any) => {
    const accessToken = localStorage.getItem("token");
    try {
      const res = await api.post("/catelog", catalogData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCatalogs((prev) => [...prev, res.data]);
      toast.success("Catalog added successfully");
    } catch {
      toast.error("Failed to add catalog");
    }
  }, []);

  // Delete catalog
  const deleteCatalog = useCallback(async (catalogId: string) => {
    const accessToken = localStorage.getItem("token");
    try {
      await api.delete(`/catelog/${catalogId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCatalogs((prev) => prev.filter((c) => c.id !== catalogId));
      toast.success("Catalog deleted successfully");
    } catch {
      toast.error("Failed to delete catalog");
    }
  }, []);

  useEffect(() => {
    fetchCatalogs();
  }, [fetchCatalogs]);

  return { catalogs, loading, fetchCatalogs, addCatalog, deleteCatalog };
}
