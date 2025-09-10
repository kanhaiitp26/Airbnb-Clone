import React, { useContext } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer.jsx";
import CategoryNav from "../Components/CategoryNav.jsx";
import { listingDataContext } from "../Context/ListingContext.jsx";
import Card from "../Components/Card.jsx";

const Home = () => {
  let { listingData,setListingData, newListData } = useContext(listingDataContext);

  return (
    <div>
      {/* Navbar */}
      <Nav />

      {/* Category Nav */}
      <div className="border-t w-full mt-2 sticky top-16 bg-white z-40">
        <CategoryNav />
      </div>

      {/* Card Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {newListData.map((list) => (
            <Card title={list.title} landMark={list.landMark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} id={list._id} ratings={list.ratings} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;


