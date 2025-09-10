import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

// ================== SIGN UP ==================
export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    // Check if user already exists
    let existUser = await User.findOne({ email }).populate("listing","title image1 image2 image3 description rent category city landMark");
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    let hashPassword = await bcrypt.hash(password, 10);

    // Create new user
    let user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    // Generate JWT token
    let token = await genToken(user._id);

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT = "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Signup error",
      error: error.message,
    });
  }
};

// ================== LOGIN ==================
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email }).populate("listing","title image1 image2 image3 description rent category city landMark");
    if (!user) {
      return res.status(400).json({ message: "User does not exists" });
    }

    // Compare password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    // Generate JWT token
    let token = await genToken(user._id);

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENVIRONMENT = "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login error",
      error: error.message,
    });
  }
};

// ================== LOGOUT ==================
export const logOut = async (req, res) => {
  try {
    // Clear the cookie
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout error",
      error: error.message,
    });
  }
};


