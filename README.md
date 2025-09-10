Airbnb Clone - MERN Stack Project

Overview:
This project is a full-stack Airbnb clone built using the MERN stack (MongoDB, Express.js, React.js, Node.js). 
It allows users to browse listings, view property details, add their own listings, and book stays. 
Hosts can manage their listings, and users can reserve properties seamlessly. 

The application replicates core Airbnb features with a clean UI, responsive design, and smooth user experience.

Features:

For Users:
- Browse and search property listings
- View property details including images, description, rent, and ratings
- Reserve properties for selected dates
- Add/remove properties to wishlist (like/heart feature)
- Responsive design for desktop and mobile

For Hosts:
- Add new property listings with images
- Update or delete existing listings
- Manage bookings and property details

Admin/General Features:
- Authentication & protected routes (login/signup)
- Real-time UI updates on listings and bookings
- Image upload support using Cloudinary
- Smooth carousel for multiple property images


Tech Stack:
- Frontend: React.js, React Router, Tailwind CSS, Lucide & React Icons
- Backend: Node.js, Express.js
- Database: MongoDB (Mongoose ODM)
- Authentication: JWT, Cookies for session management
- File Uploads: Cloudinary (for storing property images)
- State Management: React Context API

Installation & Setup:

1. Clone the Repository
> git clone <your-repo-url>
> cd airbnb-clone

2. Backend Setup
> cd backend
> npm install

- Create a .env file:
PORT=8000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>

- Run backend server:
> npm run dev

3. Frontend Setup
> cd frontend
> npm install
> npm start

The frontend will run on http://localhost:3000 and communicate with the backend at http://localhost:8000.

Folder Structure:

airbnb-clone/
│
├── backend/
│   ├── controllers/        # Express controllers for listings, users, bookings
│   ├── models/             # Mongoose models (User, Listing, Booking)
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & error handling middleware
│   └── server.js           # Express server setup
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components (Cards, Navbars, etc.)
│   │   ├── Context/        # React Context for global state
│   │   ├── pages/          # React pages (Home, ViewCard, Login, etc.)
│   │   └── App.jsx         # Main React component
│   └── package.json
│
└── README.txt

Screenshots:
(You can add screenshots here of your Home page, listing page, and booking page.)

Future Improvements:
- Add filter and search functionality for listings
- Implement user reviews and ratings
- Add payment gateway integration
- Optimize for mobile devices and improve UI/UX

Author:
- Your Name
- Email: lalkanhaiya1931@gmail.com

