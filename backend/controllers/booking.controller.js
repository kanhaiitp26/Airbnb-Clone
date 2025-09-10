import Listing from "../model/listing.model.js";
import Booking from "../model/booking.model.js";
import User from "../model/user.model.js";

export const createBooking = async (req, res) => {
  try {
    const { id } = req.params; // listing id
    const { checkIn, checkOut, totalRent } = req.body;

    // Check listing exists
    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing is not found" });
    }

    // Validate check-in & check-out dates booking controller
    
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res
        .status(400)
        .json({ message: "Invalid checkIn/checkOut date" });
    }

    if (listing.isBooked) {
      return res
        .status(400)
        .json({ message: "Listing is already booked for these dates" });
    }

    // Create booking
    const booking = await Booking.create({
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
      checkIn,
      checkOut,
      totalRent
    });

    let user = await User.findByIdAndUpdate(req.userId, {
        $push:{booking:listing}
    },{new:true})

    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save()

    return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
