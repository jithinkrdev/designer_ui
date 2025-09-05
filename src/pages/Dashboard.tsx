import React, { useState } from "react";
import { theme } from "./theme";
import Header from "../layout/Header";
import Tile from "./Tile";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={theme.gradientBg}>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Tile />
    </div>
  );
};

export default Dashboard;
