import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const listingDataContext = createContext();

function ListingContext({ children }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frontEndImage1, setFrontEndImage1] = useState(null);
  const [frontEndImage2, setFrontEndImage2] = useState(null);
  const [frontEndImage3, setFrontEndImage3] = useState(null);
  const [backEndImage1, setBackEndImage1] = useState(null);
  const [backEndImage2, setBackEndImage2] = useState(null);
  const [backEndImage3, setBackEndImage3] = useState(null);
  const [rent, setRent] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [category, setCategory] = useState("");
  const [adding, setAdding] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [listingData, setListingData] = useState([]);
  const [newListData, setNewListData] = useState([]);
  const [cardDetails, setCardDetails] = useState(null);

  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  // Add Listing
  const handleAddListing = async () => {
    setAdding(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backEndImage1);
      formData.append("image2", backEndImage2);
      formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landMark", landmark);
      formData.append("category", category);

      let result = await axios.post(
        `${serverUrl}/api/listing/add`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setAdding(false);
      console.log("Listing added:", result.data);

      // Refresh listing after add
      getListing();
      navigate("/");

      resetForm();
    } catch (err) {
      setAdding(false);
      console.error("Error adding listing:", err.response?.data || err.message);
    }
  };

  // Fetch all listings
  const getListing = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/listing/get`, {
        withCredentials: true,
      });
      setListingData(result.data);
      setNewListData(result.data);
    } catch (error) {
      console.error("Error fetching listings:", error.message);
    }
  };

  // View single listing
  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(`${serverUrl}/api/listing/findlistingbyid/${id}`, {
        withCredentials: true,
      });
      setCardDetails(result.data);
      navigate("/viewcard");
    } catch (error) {
      console.error("Error fetching listing details:", error.message);
    }
  };

  // Update listing in context (instant UI update)
  const updateListingInContext = (id, updatedData) => {
    setListingData((prev) =>
      prev.map((listing) => (listing._id === id ? updatedData : listing))
    );
    setNewListData((prev) =>
      prev.map((listing) => (listing._id === id ? updatedData : listing))
    );

    if (cardDetails?._id === id) {
      setCardDetails(updatedData);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFrontEndImage1(null);
    setFrontEndImage2(null);
    setFrontEndImage3(null);
    setBackEndImage1(null);
    setBackEndImage2(null);
    setBackEndImage3(null);
    setRent("");
    setCity("");
    setLandmark("");
    setCategory("");
  };

  useEffect(() => {
    getListing();
  }, [adding, updating, deleting]);

  const value = {
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
    handleAddListing,
    adding, setAdding,
    listingData, setListingData,
    newListData, setNewListData,
    getListing,
    handleViewCard,
    cardDetails, setCardDetails,
    updating, setUpdating,
    updateListingInContext,
    resetForm,
    deleting, setDeleting,
  };

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
}

export default ListingContext;


