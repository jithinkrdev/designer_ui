import {
  Menu,
  Settings,
  Shirt,
  Image,
  TextSelect,
  User,
  LogOut,
  Video,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const currentPath =
    typeof window !== "undefined" ? window.location.pathname : "";
  const sidebarIcons = [
    { icon: Menu, href: "/" },
    { icon: Shirt, href: "/tryon" },
    { icon: Video, href: "/video" },
    { icon: Image, href: "/catalogs" },
    { icon: TextSelect, href: "/seo" },
    { icon: Settings, href: "/settings" },
  ].map((item) => ({
    ...item,
    active: currentPath === item.href,
  }));

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleNavigation = (href: string) => {
    navigate(href);
  };

  // console.log({
  //   sidebarIcons
  // });

  function getUsername() {
    if (typeof window === "undefined") return "";
    const userName = localStorage.getItem("userName");
    if (!userName) return "";
    try {
      return userName ?? "";
    } catch {
      return "";
    }
  }

  return (
    <>
      {/* Drawer Sidebar */}
      <div className="w-12 bg-gray-800 flex flex-col items-center py-4 space-y-4 h-full justify-between">
        <div>
          {sidebarIcons.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item.href)}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                item.active
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <item.icon size={20} />
            </button>
          ))}
        </div>
        <div className="mb-2">
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2 cursor-pointer rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors flex items-center justify-center">
                <User size={24} />
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" sideOffset={8} className="p-0 w-48">
              <div className="flex flex-col">
                <div className="px-4 py-3 border-b border-gray-700 text-white font-semibold">
                  {getUsername()}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 px-4 py-3 text-red-400 hover:bg-gray-800 w-full text-left"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* No overlay when sidebar is open */}
    </>
  );
};

export default Sidebar;
