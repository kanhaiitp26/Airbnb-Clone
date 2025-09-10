import React, { useContext } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext.jsx";

export default function ListingPage1() {
  const navigate = useNavigate();

  const {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory,
  } = useContext(listingDataContext);

  // ✅ Improved Image Handlers with validation
  const handleImage1 = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackEndImage1(file);
      setFrontEndImage1(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleImage2 = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackEndImage2(file);
      setFrontEndImage2(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleImage3 = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackEndImage3(file);
      setFrontEndImage3(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 relative px-4">
      {/* ✅ Back Button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 flex items-center justify-center 
                   bg-red-600 rounded-full hover:bg-red-700 transition z-10 shadow-md"
      >
        <FaArrowLeftLong size={22} className="text-white" />
      </button>

      {/* ✅ Setup Your Home (Top-Right) */}
      <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-red-500 text-white 
                      px-5 py-2 rounded-full shadow-md font-semibold text-sm sm:text-base">
        Setup Your Home
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mt-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/listingpage2");
          }}
          className="space-y-5"
        >
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Listing title"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your place..."
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              rows="4"
              required
            />
          </div>

          {/* ✅ Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Image 1 */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 relative cursor-pointer hover:border-red-400 transition">
                {frontEndImage1 ? (
                  <img
                    src={frontEndImage1}
                    alt="Image 1"
                    className="w-24 h-24 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Image 1</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImage1}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Image 2 */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 relative cursor-pointer hover:border-red-400 transition">
                {frontEndImage2 ? (
                  <img
                    src={frontEndImage2}
                    alt="Image 2"
                    className="w-24 h-24 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Image 2</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImage2}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Image 3 */}
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 relative cursor-pointer hover:border-red-400 transition">
                {frontEndImage3 ? (
                  <img
                    src={frontEndImage3}
                    alt="Image 3"
                    className="w-24 h-24 object-cover rounded-lg mb-2"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">Image 3</span>
                )}
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImage3}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* ✅ Rent */}
          <div>
            <label htmlFor="rent" className="block text-sm font-medium text-gray-700">
              Rent (per night)
            </label>
            <input
              id="rent"
              type="number"
              value={rent}
              onChange={(e) => setRent(e.target.value)}
              placeholder="e.g. 2000"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* ✅ Landmark */}
          <div>
            <label htmlFor="landmark" className="block text-sm font-medium text-gray-700">
              Landmark
            </label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Nearby landmark"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* ✅ City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

