import React from "react";
import ImageSlider from "../components/common/ImageSlider";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

const beforeImages = [
  {
    url: "./assets/6799c8a37f5ffa390a48eb3c_before.webp",
    tag: "Mannequin",
  },
  {
    url: "./assets/6799c8c1a225f0b832f47de6_before-1.webp",
    tag: "Models",
  },
  {
    url: "./assets/6799c97e70a8bb46165ca4e3_before-2.webp",
    tag: "Ghost Mannequin",
  },
  {
    url: "./assets/679ad320fb94f44d2bc88f6c_before-3.webp",
    tag: "Hanger",
  },
  {
    url: "./assets/679ad5d58d51e24f1ffb6945_before-4.webp",
    tag: "Mannequin",
  },
  {
    url: "./assets/679ad5f4aca6afdc49576bc9_before-5.webp",
    tag: "Ghost Mannequin",
  },
  {
    url: "./assets/679ad62c427f6bab606842cd_before-6.webp",
    tag: "Hanger",
  },
  {
    url: "./assets/679ad803fd7428ba691c0db7_before-7.webp",
    tag: "Ghost Mannequin",
  },
  {
    url: "./assets/679ad9e0fd7428ba691dab6d_before-8.webp",
    tag: "Models",
  },
  {
    url: "./assets/679ada2b2ab03b93c7c4806e_before-9.webp",
    tag: "Models",
  },
];

const afterImages = [
  {
    url: "./assets/6799c8ac8ad36b4b50bb03f9_after.webp",
    tag: "Alexandre Ascenção",
  },
  {
    url: "./assets/6799c8ca0aab7f3698abda33_after-1.webp",
    tag: "Myqe Qemy",
  },
  {
    url: "./assets/6799c986260aa09e80a9ee0d_after-2.webp",
    tag: "Oğuz Maden",
  },
  {
    url: "./assets/679ad329ed610cc78a223d4b_after-3.webp",
    tag: "Rose Nthite",
  },
  {
    url: "./assets/679ad5e0427f6bab60680249_after-4.webp",
    tag: "Vishal Puri",
  },
  {
    url: "./assets/679ad5fb651ba01b885a0610_after-5.webp",
    tag: "Etico Grafik",
  },
  {
    url: "./assets/679ad6342fdafad9f54e3a8d_after-6.webp",
    tag: "Chroma None",
  },
  {
    url: "./assets/679ad80a8c5e16cf856ee065_after-7.webp",
    tag: "Etico Grafik",
  },
  {
    url: "./assets/679ad9ea82da7ce6327bb6df_after-8.webp",
    tag: "The Cotton",
  },
  {
    url: "./assets/679ada338cb7964066f2fc25_after-9.webp",
    tag: "Ankita Kataria",
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/tryon");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 flex flex-col items-center justify-start py-12 px-4">
      <div className="max-w-2xl w-full text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          The most accurate AI model generator for fashion brands.
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Create realistic photos and videos in 60 seconds.
          <br />
          Save hundreds of hours and $2K–$30K a month on studio costs.
          <br />
          Trusted by 600+ brands · Over 1M images generated
        </p>
        <Button
          onClick={handleButtonClick}
          className=" cursor-pointer bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-4 rounded-xl shadow-lg shadow-purple-600/30 transition-all font-semibold"
        >
          ✨ Generate your first photo
        </Button>
        <p className="mt-4 text-sm text-gray-400">
          Enjoy your first week for just $1 · Our plans cost less than 1% of
          physical photoshoot
        </p>
      </div>
      {/* Single moving slider with before/after transition for first image */}
      <ImageSlider
        arr1={beforeImages.map((img) => img.url)}
        arr2={afterImages.map((img) => img.url)}
      />
      <div className="w-full text-center mt-8">
        <h2 className="text-lg text-purple-400 font-semibold mb-2">
          Powering visual content for clothing brands around the world
        </h2>
      </div>
    </div>
  );
};

export default HomePage;
