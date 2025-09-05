const links = [
  { name: "Home", href: "/dashboard" },
  { name: "TryOn", href: "/tryon" },
  { name: "Create Designs", href: "/design/new" },
  { name: "Create Seo", href: "/seo" },
  { name: "Catalog", href: "/catalogs" },
  { name: "Design List", href: "/designlist" },
  { name: "Subscription", href: "/subscription" },
  { name: "Settings", href: "/settings" },
];

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  return (
    <>
      {/* Drawer Sidebar */}
      <div
        id="designer-sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-white  z-40 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <div className="p-6 mt-24">
          <h2 className="text-2xl font-bold text-emerald-600">Designer App</h2>
        </div> */}
        <nav className="mt-24">
          <ul>
            {links.map((link) => (
              <li key={link.name} className="mb-2">
                <a
                  href={link.href}
                  className="block px-6 py-3 cursor-pointer rounded-lg text-gray-700 font-medium hover:bg-emerald-50 hover:text-emerald-600 transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* No overlay when sidebar is open */}
    </>
  );
};

export default Sidebar;
