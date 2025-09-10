import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  Mountain,
  Building2,
  Waves,
  Home,
  Flame,
  Compass,
  Crown,
  Umbrella,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

const ListingPage2 = () => {
  const navigate = useNavigate();
  const { category, setCategory } = useContext(listingDataContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-10 py-16 relative">
      {/* Back button */}
      <button
        onClick={() => navigate("/listingpage1")}
        className="fixed top-5 left-5 w-11 h-11 flex items-center justify-center 
                   bg-red-600 rounded-full hover:bg-red-700 transition z-20 shadow-md"
      >
        <FaArrowLeftLong size={22} className="text-white" />
      </button>

      {/* Setup Categories (top-right) */}
      <button
        className="fixed top-5 right-5 bg-red-500 text-white px-6 py-2.5 rounded-full 
                   font-medium shadow hover:bg-red-600 transition z-20"
      >
        Setup Categories
      </button>

      {/* Title */}
      <div className="text-center mt-4 mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Choose a Category
        </h1>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Select the type of place you want to list
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
        {/* Beach */}
        <div
          onClick={() => setCategory("Beach")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "Beach"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Umbrella className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">Beach</span>
        </div>

        {/* Mountains */}
        <div
          onClick={() => setCategory("Mountains")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "Mountains"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Mountain className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">Mountains</span>
        </div>

        {/* City */}
        <div
          onClick={() => setCategory("City")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "City"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Building2 className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">City</span>
        </div>

        {/* Lake */}
        <div
          onClick={() => setCategory("Lake")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "Lake"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Waves className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">Lake</span>
        </div>

        {/* Cabins */}
        <div
          onClick={() => setCategory("Cabins")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "Cabins"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Home className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">Cabins</span>
        </div>

        {/* Trending */}
        <div
          onClick={() => setCategory("Trending")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "Trending"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Flame className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">Trending</span>
        </div>

        {/* Adventure */}
        <div
          onClick={() => setCategory("Adventure")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "Adventure"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Compass className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">Adventure</span>
        </div>

        {/* Luxury */}
        <div
          onClick={() => setCategory("Luxury")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "Luxury"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Crown className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">Luxury</span>
        </div>

        {/* Islands */}
        <div
          onClick={() => setCategory("Islands")}
          className={`flex flex-col items-center justify-center p-6 rounded-2xl border bg-white shadow-sm cursor-pointer transition
            ${
              category === "Islands"
                ? "border-red-500 ring-2 ring-red-300 scale-105"
                : "border-gray-200 hover:border-gray-400"
            }`}
        >
          <Umbrella className="h-10 w-10 mb-3 text-gray-700" />
          <span className="text-base font-medium text-gray-800">Islands</span>
        </div>
      </div>

      {/* Next Button - fixed bottom center */}
      <div className="fixed bottom-6 left-0 w-full flex justify-center z-20">
        <button
          type="button"
          onClick={() => navigate("/listingpage3")}
          disabled={!category}
          className="px-8 py-3 bg-red-500 text-white rounded-full text-base font-semibold
                     shadow-lg hover:bg-red-600 hover:shadow-xl active:scale-95
                     transition-all duration-200 "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingPage2;





