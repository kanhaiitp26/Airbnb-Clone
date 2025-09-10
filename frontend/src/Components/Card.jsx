import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { FaStar } from "react-icons/fa6";

const Card = ({ id, title, landMark, city, image1, image2, image3, rent, ratings }) => {
  let { userData } = useContext(userDataContext);
  let { handleViewCard } = useContext(listingDataContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };

  // Collect only non-empty images
  const images = [image1, image2, image3].filter(Boolean);
  const [current, setCurrent] = useState(0);

  return (
    <div
      onClick={handleClick}
      className="relative w-full h-[400px] flex flex-col rounded-2xl cursor-pointer 
                 bg-white shadow-lg hover:shadow-2xl hover:-translate-y-2 
                 transition-all duration-300 ease-out overflow-hidden group"
    >
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        {images.length > 0 && !imageError ? (
          <>
            <img
              src={images[current]}
              alt={title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              onError={() => setImageError(true)}
            />
            {/* Image indicator dots */}
            {images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === current ? "bg-white" : "bg-white/60"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <div className="text-center p-4">
              <div className="text-lg mb-1">NO IMAGE</div>
              <div className="text-xs">Image not available</div>
            </div>
          </div>
        )}

        {/* Carousel Arrows */}
        {images.length > 1 && !imageError && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 
                         hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100
                         transition-all duration-300 transform hover:scale-110"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 
                         hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100
                         transition-all duration-300 transform hover:scale-110"
            >
              ›
            </button>
          </>
        )}

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 shadow-sm flex items-center gap-1">
          <FaStar className="text-[#eb6262] text-xs" />
          <span className="text-xs font-medium text-gray-700">{ratings || "New"}</span>
        </div>

        {/* Wishlist Heart */}
        <button
          className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-sm 
                     transform transition-all duration-300 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
        >
          <Heart
            className={`h-4 w-4 transition-all duration-300 ${
              liked ? "text-red-500 fill-red-500 scale-110" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">{title}</h3>

        {/* Location */}
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-sm text-gray-600 line-clamp-1">
            {city} {landMark && `- ${landMark}`}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Rent */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ₹{rent.toLocaleString()}
              <span className="font-normal text-gray-500 text-sm ml-1">/ night</span>
            </p>
          </div>
          <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
            <span className="hidden sm:inline">View details</span>
            <span className="inline sm:hidden">View</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

