import React, { useContext, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";

const ViewCard = () => {
  let navigate = useNavigate();
  let { cardDetails, updateListingInContext } = useContext(listingDataContext);
  let { userData } = useContext(userDataContext);
  let [updatePopUp, setUpdatePopUp] = useState(false);
  let [bookingPopUp, setBookingPopUp] = useState(false);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  let { serverUrl } = useContext(authDataContext);

  // States for updating listing
  const [title, setTitle] = useState(cardDetails.title);
  const [description, setDescription] = useState(cardDetails.description);
  const [backEndImage1, setBackEndImage1] = useState(null);
  const [backEndImage2, setBackEndImage2] = useState(null);
  const [backEndImage3, setBackEndImage3] = useState(null);
  const [rent, setRent] = useState(cardDetails.rent);
  const [city, setCity] = useState(cardDetails.city);
  const [landmark, setLandmark] = useState(cardDetails.landMark);
  let { updating, setUpdating } = useContext(listingDataContext);
  let { deleting, setDeleting } = useContext(listingDataContext);

  // States for booking
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Handle update
  const handleUpdateListing = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError("");

    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landmark);
      formData.append("category", cardDetails.category);

      if (backEndImage1) formData.append("image1", backEndImage1);
      if (backEndImage2) formData.append("image2", backEndImage2);
      if (backEndImage3) formData.append("image3", backEndImage3);

      let result = await axios.put(
        `${serverUrl}/api/listing/update/${cardDetails._id}`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUpdating(false);

      if (result.data && updateListingInContext) {
        updateListingInContext(cardDetails._id, result.data);
      }

      navigate("/");
      setUpdatePopUp(false);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to update listing");

      if (error.response?.status === 404) {
        setError("The update endpoint was not found. Please check your server configuration.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDeleteListing = async () => {
    setDeleting(true);
    try {
      let result = await axios.delete(
        `${serverUrl}/api/listing/delete/${cardDetails._id}`,
        { withCredentials: true }
      );
      console.log(result.data);
      navigate("/");
      setDeleting(false);
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  // Handle booking
  const handleBooking = async () => {
    setBookingLoading(true);
    setBookingError("");

    try {
      let result = await axios.post(
        `${serverUrl}/api/booking/create/${cardDetails._id}`,
        { checkIn, checkOut, totalRent: cardDetails.rent },
        { withCredentials: true }
      );

      console.log("Booking successful:", result.data);
      setBookingPopUp(false);
      navigate("/"); // Or navigate to booking history
    } catch (error) {
      console.error(error);
      setBookingError(error.response?.data?.message || "Failed to create booking");
    } finally {
      setBookingLoading(false);
    }
  };

  if (!cardDetails) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        Loading details...
      </div>
    );
  }

  const isHost =
    String(cardDetails?.host?._id || cardDetails?.host) === String(userData?._id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-10 py-16 relative">
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-5 left-5 w-11 h-11 flex items-center justify-center 
                   bg-red-600 rounded-full hover:bg-red-700 transition z-20 shadow-md"
      >
        <FaArrowLeftLong size={22} className="text-white" />
      </button>

      {/* Title & Location */}
      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
        <h1 className="text-[25px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden">
          {`IN ${cardDetails.landMark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
        </h1>
      </div>

      {/* Image Section */}
      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white bg-red-500">
          <img src={cardDetails.image1} alt="" className="w-[100%] h-full object-cover" />
        </div>

        <div className="w-[100%] h-[35%] flex items-center justify-center md:w-[50%] md:h-[100%] md:flex-col bg-black">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white">
            <img src={cardDetails.image2} alt="" className="w-[100%] h-full object-cover" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white">
            <img src={cardDetails.image3} alt="" className="w-[100%] h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] mt-4">
        {`${cardDetails.title.toUpperCase()}, ${cardDetails.category.toUpperCase()}, ${cardDetails.landMark.toUpperCase()}`}
      </div>

      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[20px] text-gray-800 mt-2">
        {cardDetails.description.toUpperCase()}
      </div>

      <div className="w-[95%] flex items-start justify-start text-[20px] md:w-[80%] md:text-[25px] mt-2 font-semibold text-gray-900">
        {`Rs.${cardDetails.rent} /day`}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        {isHost ? (
          <button
            onClick={() => setUpdatePopUp((prev) => !prev)}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 
                       text-white text-lg font-semibold rounded-xl 
                       shadow-lg hover:scale-105 hover:shadow-xl 
                       transition-all duration-300"
          >
            ✏️ Edit Listing
          </button>
        ) : (
          <button
            onClick={() => setBookingPopUp((prev) => !prev)}
            className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-700 
                       text-white text-lg font-semibold rounded-xl 
                       shadow-lg hover:scale-105 hover:shadow-xl 
                       transition-all duration-300"
          >
            🏠 Reserve
          </button>
        )}
      </div>

      {/* Update Listing Popup */}
      {updatePopUp && (
        <div className="fixed inset-0 flex items-center justify-center 
                        bg-black/70 backdrop-blur-sm z-[100]">
          {/* Close button */}
          <button
            onClick={() => setUpdatePopUp(false)}
            className="fixed top-4 left-4 w-10 h-10 flex items-center justify-center 
                      bg-red-600 rounded-full hover:bg-red-700 transition 
                      text-white shadow-md z-[110]"
          >
            <RxCross2 className="w-6 h-6" />
          </button>

          {/* Title */}
          <div className="fixed top-4 right-4 sm:top-6 sm:right-6 bg-red-500 text-white 
                          px-5 py-2 rounded-full shadow-md font-semibold text-sm sm:text-base">
            Update Your Details
          </div>

          {/* Form wrapper */}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg 
                          p-8 mt-[70px] max-h-[90vh] overflow-y-auto">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleUpdateListing} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                  rows="3"
                ></textarea>
              </div>

              {/* Upload Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Images</label>
                <div className="grid grid-cols-3 gap-4">
                  {/* Image 1 */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer p-4 hover:border-red-400">
                    {backEndImage1 ? (
                      <img
                        src={URL.createObjectURL(backEndImage1)}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : cardDetails.image1 ? (
                      <img
                        src={cardDetails.image1}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-500">Image 1</span>
                    )}
                    <input type="file" onChange={(e) => setBackEndImage1(e.target.files[0])} className="hidden" />
                  </label>

                  {/* Image 2 */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer p-4 hover:border-red-400">
                    {backEndImage2 ? (
                      <img
                        src={URL.createObjectURL(backEndImage2)}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : cardDetails.image2 ? (
                      <img
                        src={cardDetails.image2}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-500">Image 2</span>
                    )}
                    <input type="file" onChange={(e) => setBackEndImage2(e.target.files[0])} className="hidden" />
                  </label>

                  {/* Image 3 */}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer p-4 hover:border-red-400">
                    {backEndImage3 ? (
                      <img
                        src={URL.createObjectURL(backEndImage3)}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : cardDetails.image3 ? (
                      <img
                        src={cardDetails.image3}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-500">Image 3</span>
                    )}
                    <input type="file" onChange={(e) => setBackEndImage3(e.target.files[0])} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Rent */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Rent</label>
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Landmark</label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 
                          text-white font-semibold rounded-xl shadow-lg 
                          hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                {loading ? "Updating..." : "Update Listing"}
              </button>

              <button
                onClick={handleDeleteListing}
                type="submit"
                disabled={deleting}
                className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 
                          text-white font-semibold rounded-xl shadow-lg 
                          hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                {deleting ? "deleting..." : "Delete Listing"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Booking Popup */}
      {bookingPopUp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-[100]">
          {/* Close button */}
          <button
            onClick={() => setBookingPopUp(false)}
            className="fixed top-4 left-4 w-10 h-10 flex items-center justify-center 
                       bg-red-600 rounded-full hover:bg-red-700 transition 
                       text-white shadow-md z-[110]"
          >
            <RxCross2 className="w-6 h-6" />
          </button>

          {/* Booking form */}
          <form className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
              Confirm & Book
            </h2>

            {/* Check-In */}
            <div className="mb-4">
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700">
                Check-In
              </label>
              <input
                id="checkIn"
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Check-Out */}
            <div className="mb-4">
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700">
                Check-Out
              </label>
              <input
                id="checkOut"
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            {/* Confirm Button */}
            <button
              type="button"
              onClick={handleBooking}
              className="w-full py-3 bg-gradient-to-r from-red-500 to-red-600 
                        text-white font-semibold rounded-xl shadow-lg 
                        hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              {bookingLoading ? "Booking..." : "Book Now"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewCard;








