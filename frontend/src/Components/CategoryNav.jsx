import React, { useState, useContext } from "react";
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
import { listingDataContext } from "../Context/ListingContext";

const category = [
  { name: "Trending", icon: Flame },   // 👈 sabse pehle la diya
  { name: "Beach", icon: Umbrella },
  { name: "Mountains", icon: Mountain },
  { name: "City", icon: Building2 },
  { name: "Lake", icon: Waves },
  { name: "Cabins", icon: Home },
  { name: "Adventure", icon: Compass },
  { name: "Luxury", icon: Crown },
  { name: "Islands", icon: Umbrella },
];

const CategoryNav = () => {
  const [active, setActive] = useState("Trending"); // 👈 default = Trending
  let { listingData, setNewListData } = useContext(listingDataContext);

  const handleCategory = (category) => {
    setActive(category);

    if (category === "Trending") {
      // 👈 Trending = show all listings
      setNewListData(listingData);
    } else {
      setNewListData(listingData.filter((list) => list.category === category));
    }
  };

  return (
    <div className="w-full border-b bg-white sticky top-[64px] z-40">
      <div className="flex justify-start md:justify-center gap-6 px-4 py-3 overflow-x-auto scrollbar-hide">
        {category.map((cat) => {
          const isActive = active === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => handleCategory(cat.name)}
              className={`flex flex-col items-center justify-center cursor-pointer min-w-[70px] transition-colors relative
                ${isActive ? "text-black" : "text-gray-500 hover:text-black"}`}
            >
              <cat.icon className={`h-6 w-6 mb-1 ${isActive ? "text-red-500" : ""}`} />
              <span className="text-xs sm:text-sm">{cat.name}</span>

              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNav;






