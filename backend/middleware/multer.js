import multer from "multer"


// Set storage engine
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // 'uploads' is the folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // For unique file names
  }
});

// Create the multer instance
const upload = multer({ storage });

export default upload;
