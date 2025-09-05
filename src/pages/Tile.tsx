import { Link } from "react-router-dom";

const features = [
  {
    title: "Virtual Try-On",
    desc: "Upload garments and preview on models.",
    link: "/tryon",
    img: "https://img.icons8.com/fluency/96/virtual-reality.png",
  },
  {
    title: "Create New Design",
    desc: "Generate your own fashion by creating designs.",
    link: "/design/new",
    img: "https://img.icons8.com/fluency/96/design.png",
  },
  {
    title: "SEO Content",
    desc: "Generate optimized content for your products.",
    link: "/seo",
    img: "https://img.icons8.com/fluency/96/search--v1.png",
  },
  {
    title: "Trending",
    desc: "Explore the latest design and fashion trends.",
    link: "/trending",
    img: "https://img.icons8.com/fluency/96/fire-element.png",
  },
  {
    title: "Catalogs",
    desc: "Explore the latest design and fashion trends.",
    link: "/catalogs",
    img: "https://img.icons8.com/fluency/96/open-book--v2.png",
  },
  {
    title: "Designs",
    desc: "Browse and manage your created designs.",
    link: "/designs",
    img: "https://img.icons8.com/fluency/96/design--v2.png",
  },
];

export default function Tile() {
  return (
    <div className="p-6 mt-16">
      <h2 className="text-2xl font-bold text-green-800 mb-6"></h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-center">
        {/* Center tiles horizontally */}
        {features.map((f, i) => (
          <Link
            key={i}
            to={f.link}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center text-center aspect-square w-64 max-w-full p-6"
          >
            {/* consistent square size */}
            <img src={f.img} alt={f.title} className="w-16 h-16 mb-3" />
            {/* smaller icon */}
            <h3 className="text-lg font-semibold text-green-700 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600 text-sm">{f.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
