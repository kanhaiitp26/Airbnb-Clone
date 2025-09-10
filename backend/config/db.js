import mongoose from "mongoose";

const connectDb = async () => {
  try {
    // Simply pass the connection string without deprecated options
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("DB connection error:", error.message);
  }
};

export default connectDb;
