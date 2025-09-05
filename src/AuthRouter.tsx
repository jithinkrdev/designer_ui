import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./user/Login";
import Register from "./user/Register";
import Dashboard from "./pages/Dashboard";
import EditorPage from "./pages/EditorPage";
import DesignPage from "./pages/DesignPage";
import SeoGeneratorPage from "./pages/SeoGeneratorPage";
import NotFound from "./pages/NotFound";
import Trending from "./pages/Trending";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import Subscription from "./pages/Subscription";
import CatalogsPage from "./pages/CatalogsPage";
import DesignListPage from "./pages/DesignListPage";

// PrivateRoute component
const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? element : <div>Access Denied. Please login.</div>;
};

const AuthRouter: React.FC = () => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={<PrivateRoute element={<Dashboard />} />}
      />
      <Route
        path="/tryon"
        element={<PrivateRoute element={<EditorPage />} />}
      />
      <Route
        path="/design/new"
        element={<PrivateRoute element={<DesignPage />} />}
      />
      <Route
        path="/designlist"
        element={<PrivateRoute element={<DesignListPage />} />}
      />

      {/* Trending */}
      <Route
        path="/trending"
        element={<PrivateRoute element={<Trending />} />}
      />

      {/* Sales */}
      <Route
        path="/subscription"
        element={<PrivateRoute element={<Subscription />} />}
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={<PrivateRoute element={<Settings />} />}
      />

      {/* SEO */}
      <Route
        path="/seo"
        element={<PrivateRoute element={<SeoGeneratorPage />} />}
      />
      <Route
        path="/change-password"
        element={<PrivateRoute element={<ChangePassword />} />}
      />
      <Route
        path="/catalogs"
        element={<PrivateRoute element={<CatalogsPage />} />}
      />
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AuthRouter;
