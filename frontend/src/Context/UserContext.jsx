import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { authDataContext } from "./AuthContext.jsx";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const { serverUrl } = useContext(authDataContext); // ✅ comes from AuthContext
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ track loading

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentUser`, {
        withCredentials: true,
      });
      setUserData(result.data?.user || null);
    } catch (error) {
      console.error("getCurrentUser error:", error);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <userDataContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;

