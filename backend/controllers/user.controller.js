// import User from "../model/user.model.js";

// export const getCurrentUser = async (req, res) => {
//   try {
//     let userId = req.user.id;
//     let user = await User.findById(userId).select("-password"); // exclude password

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: `getCurrentUser error: ${error}` });
//   }
// };

import User from "../model/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    // req.userId was set in isAuth middleware
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const user = await User.findById(userId).select("-password").populate("listing","title image1 image2 image3 description rent category city landMark"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

     return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("getCurrentUser error:", error);
     return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

