// import jwt from "jsonwebtoken";

// const isAuth = async (req, res, next) => {
//   try {
//     let {token} = req.cookies;

//     if (!token) {
//       return res.status(400).json({ message: "User doesn't have a token" });
//     }

//     let verifyToken = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verifyToken) {
//       return res.status(400).json({ message: "User doesn't have a valid token" });
//     }
//     req.userId = verifyToken.userId; // attach user info from token
//     next();
//   } catch (error) {
//     res.status(500).json({ message: `isAuth error: ${error}` });
//   }
// };

// export default isAuth;

import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No token provided, unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Attach user info to req
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("isAuth error:", error);
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};

export default isAuth;
