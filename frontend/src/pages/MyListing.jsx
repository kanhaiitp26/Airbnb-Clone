import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";
import Card from "../Components/Card"; // 👈 import Card

const MyListing = () => {
  const navigate = useNavigate();
  let { userData } = useContext(userDataContext);

  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center items-start py-12 px-4">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition shadow-md"
      >
        <FaArrowLeftLong size={22} className="text-white" />
      </button>

      {/* 🏡 Card Container */}
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10 border-b pb-4">
          My Listings
        </h1>

        {/* 📦 Listings */}
        {userData?.listing && userData.listing.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData.listing.map((list) => (
              <Card
                key={list._id}
                title={list.title}
                landMark={list.landMark}
                city={list.city}
                image1={list.image1}
                image2={list.image2}
                image3={list.image3}
                rent={list.rent}
                id={list._id}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16 text-gray-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No Listings"
              className="w-28 h-28 mb-4 opacity-70"
            />
            <p className="text-lg font-medium">No listings found</p>
            <button
              onClick={() => navigate("/listingpage1")}
              className="mt-5 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              + Create a Listing
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListing;

