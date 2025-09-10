import React from 'react'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { listingDataContext } from '../Context/ListingContext';
const ListingPage3 = () => {

    let navigate = useNavigate();
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
        handleAddListing,
        adding,setAdding,
      } = useContext(listingDataContext);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 sm:px-10 py-16 relative" >
        {/* Back button */}
        <button
            onClick={() => navigate("/listingpage2")}
            className="fixed top-5 left-5 w-11 h-11 flex items-center justify-center 
                    bg-red-600 rounded-full hover:bg-red-700 transition z-20 shadow-md"
        >
            <FaArrowLeftLong size={22} className="text-white" />
        </button>

        <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px]">
            <h1 className="text-[25px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden">
                {`In ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
            </h1>
        </div>

        <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
            <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white bg-red-500">
                <img src={frontEndImage1} alt="" className="w-[100%]" />
            </div>

            <div className="w-[100%] h-[35%] flex items-center justify-center md:w-[50%] md:h-[100%] md:flex-col bg-black">
                <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white">
                    <img src={frontEndImage2} alt="" className="w-[100%]" />
                </div>
                <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] border-white">
                    <img src={frontEndImage3} alt="" className="w-[100%]" />
                </div>
            </div>
        </div>
        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
          {`${title.toUpperCase()}, ${category.toUpperCase()}, ${landmark.toUpperCase()}`}
        </div>

        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px] text-gray-800">
           {description.toUpperCase()}
        </div>

        <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[25px]">
          {`Rs.${rent} /day`}
        </div>

        <button onClick={handleAddListing} className="px-[50px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px] rounded-lg right-[5%] bottom-[5%]" disabled={adding} >
          {adding ? "adding..." : "Add Listing"}
        </button>

    </div>
  )
}

export default ListingPage3