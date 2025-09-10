import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    // Create a JWT token with userId as payload
    let token = await jwt.sign(
      { userId },              // payload
      process.env.JWT_SECRET,      // secret key from .env
      { expiresIn: "7d" }          // token expiry (7 days)
    );
    return token;
  } catch (error) {
    console.log("token error");
  }
};

export default genToken;
