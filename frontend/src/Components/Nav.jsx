import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaAirbnb, FaGlobe, FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { authDataContext } from "../Context/AuthContext.jsx";
import { userDataContext } from "../Context/UserContext.jsx";
import axios from "axios";

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  let { userData, setUserData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);

  const handleLogOut = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true });
      setUserData(null);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <FaAirbnb className="text-red-500" size={32} />
            <span className="text-xl font-bold text-red-500 hidden sm:block">
              airbnb
            </span>
          </button>

          {/* Middle: Search (hidden on mobile) */}
          <div
            onClick={() => navigate("/")}
            className="hidden md:flex items-center divide-x rounded-full border shadow-md hover:shadow-lg transition bg-white px-2 cursor-pointer max-w-md w-full h-12"
          >
            <span className="px-4 text-sm font-medium text-gray-700">Anywhere</span>
            <span className="px-4 text-sm text-gray-600">Any week</span>
            <span className="flex items-center gap-2 px-4 text-sm text-gray-600">
              Add guests
              <div className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white">
                <FiSearch size={16} />
              </div>
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/listingpage1")}
              className="hidden md:block text-sm font-medium px-3 py-2 rounded-full hover:bg-gray-100"
            >
              List your home
            </button>

            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100">
              <FaGlobe size={18} />
            </button>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setOpenMenu((p) => !p)}
                className="flex items-center gap-3 border rounded-full pl-3 pr-2 py-2 hover:shadow-md transition"
              >
                <RxHamburgerMenu size={20} />
                {userData ? (
                  <span className="w-[30px] h-[30px] bg-[#008080] text-white rounded-full flex items-center justify-center font-bold">
                    {userData.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <FaUser className="w-[30px] h-[30px] p-1.5 rounded-full bg-gray-200 text-gray-600" />
                )}
              </button>

              {/* Dropdown */}
              {openMenu && (
                <div
                  className="absolute right-0 mt-2 w-60 rounded-2xl bg-white shadow-lg border p-3"
                  onMouseLeave={() => setOpenMenu(false)}
                >
                  {!userData ? (
                    <Link
                      to="/login"
                      className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-base"
                      onClick={() => setOpenMenu(false)}
                    >
                      Login
                    </Link>
                  ) : (
                    <button
                      className="block w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-base"
                      onClick={() => {
                        setOpenMenu(false);
                        handleLogOut();
                      }}
                    >
                      Logout
                    </button>
                  )}

                  <div className="my-2 h-px bg-gray-200" />

                  <button
                    onClick={() => navigate("/listingpage1")}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-base"
                  >
                    List your home
                  </button>
                  <button onClick={() => navigate("/mylisting")} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-base">
                    My Listing
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 text-base">
                    Check Booking
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (only visible on small screens) */}
        <button
          onClick={() => navigate("/")}
          className="md:hidden mt-2 w-full flex items-center justify-between gap-3 rounded-full border shadow-md hover:shadow-lg transition bg-white px-4 py-2 h-12"
        >
          <div className="flex flex-col text-left leading-tight">
            <span className="text-sm font-medium">Anywhere</span>
            <span className="text-xs text-gray-600">Any week • Add guests</span>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500 text-white">
            <FiSearch size={16} />
          </div>
        </button>
      </nav>
    </header>
  );
}
