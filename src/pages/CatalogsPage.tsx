import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import CatalogDialog from "../components/modals/CatalogDialog";
import api from "../api/config";
import Layout from "../layout";
import History from "../components/tryon/History";

const fallbackImg = "https://img.icons8.com/fluency/96/image.png";

const CatalogsPage: React.FC = () => {
  return (
    <Layout>
      <History />
    </Layout>
  );
};

export default CatalogsPage;
