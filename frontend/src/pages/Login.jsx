import { useState, useContext } from "react";
import { Eye, EyeOff } from "lucide-react"; // Import icons
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext.jsx";
import axios from "axios"
import { userDataContext } from "../Context/UserContext.jsx";


export default function Login() {

    let { serverUrl } = useContext(authDataContext);
    let { userData, setUserData } = useContext(userDataContext);
    console.log(userData)
    const [showPassword, setShowPassword] = useState(false); // State for toggle
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let {loading, setLoading} = useContext(authDataContext);

   const navigate = useNavigate();
  

   const handleLogin = async (e) => {
        e.preventDefault();   //  always first
        setLoading(true);
        try {
            let result = await axios.post(
            serverUrl + "/api/auth/login",
            { email, password },
            { withCredentials: true }
            );
            setLoading(false);
            setUserData(result.data);
            navigate("/");
            console.log(result)
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Back Button */}
        <button onClick={() => navigate("/")} className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-red-600 rounded-full hover:bg-red-700 transition"> 
          <FaArrowLeftLong size={22} className="text-white" />
        </button>

        {/* Logo */}
        <h1 className="text-3xl font-bold text-center text-red-500 mb-6">
          Welcome to AirBnb
        </h1>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Password with eye toggle */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-xl hover:bg-red-600 transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a href="/signup" className="text-red-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
