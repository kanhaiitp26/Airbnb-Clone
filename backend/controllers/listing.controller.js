import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../model/user.model.js";
import Listing from "../model/listing.model.js";

export const addListing = async (req, res) => {
  try {
    let host = req.userId;
    let { title, description, rent, city, landMark, category } = req.body;

    // Upload image to Cloudinary
    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);
    // Save listing to database
    let listing = await Listing.create({
      host,
      title,
      description,
      rent,
      city,
      landMark,
      category,
      image1,
      image2,
      image3
    });
    let user = await User.findByIdAndUpdate(host,{ $push: { listing:listing._id }},
    { new: true });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
     return res.status(201).json(listing);
    
  } catch (error) {
     return res.status(500).json({ message: `AddListing error ${error}` });
  }
};


export const getListing = async (req, res) => {
  try {
    // Fetch listings sorted by latest first
    let listing = await Listing.find().sort({ createdAt: -1 });
     return res.status(200).json(listing);
  } catch (error) {
     return res.status(500).json({
      message: "getListing error",
      error: error.message,
    });
  }
};

export const findListing = async (req, res) => {
  try {
    let { id } = req.params;

    // Find listing by ID
    let listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (error) {
     return res.status(500).json({
      message: "findListing error",
      error: error.message,
    });
  }
};

// Updated backend controller with proper file handling
export const updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, rent, city, landMark, category } = req.body;

    // Find the current listing first to get old image data
    const currentListing = await Listing.findById(id);
    if (!currentListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Initialize with current images
    let image1 = currentListing.image1;
    let image2 = currentListing.image2;
    let image3 = currentListing.image3;

    // Only upload new images if they are provided
    if (req.files && req.files.image1) {
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }
    
    if (req.files && req.files.image2) {
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
    }
    
    if (req.files && req.files.image3) {
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }

    // Update the listing
    let listing = await Listing.findByIdAndUpdate(id, {
      title,
      description,
      rent,
      city,
      landMark,
      category,
      image1,
      image2,
      image3
    }, { new: true });

    return res.status(200).json(listing);

  } catch (error) {
    res.status(500).json({
      message: `updateListing error: ${error.message}`,
    });
  }
};


export const deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the listing
    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Remove listing reference from user
    let user = await User.findByIdAndUpdate(listing.host, {
      $pull: { listing: listing._id },
    },{new: true});

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(200).json({ message: "Listing deleted successfully" });

  } catch (error) {
    return res.status(500).json({
      message: `deleteListing error: ${error.message}`,
    });
  }
};
