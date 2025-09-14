import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./user/Login";
import Register from "./user/Register";
import DesignPage from "./pages/DesignPage";
import SeoGeneratorPage from "./pages/SeoGeneratorPage";
import NotFound from "./pages/NotFound";
import Trending from "./pages/Trending";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import Subscription from "./pages/Subscription";
import CatalogsPage from "./pages/CatalogsPage";
import DesignListPage from "./pages/DesignListPage";
import TryOn from "./pages/Tryon";
import HomePage from "./pages/HomePage";

// PrivateRoute component
const PrivateRoute = ({ element }: { element: React.ReactElement }) => {
  const [isLoggin, setIsLoggin] = useState(false);
  const [token, setToken] = useState(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );

  // Re-check token when isLoggin changes
  React.useEffect(() => {
    if (isLoggin) {
      setToken(localStorage.getItem("token"));
    }
  }, [isLoggin]);

  return token ? element : <Login onLogin={() => setIsLoggin(true)} />;
};

const AuthRouter: React.FC = (props) => (
  <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login onLogin={() => {}} />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes */}
      <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
      <Route
        path="/tryon"
        element={<PrivateRoute element={<TryOn {...props} />} />}
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
