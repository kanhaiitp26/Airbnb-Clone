import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">About</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Press</li>
            <li className="hover:underline cursor-pointer">Blog</li>
          </ul>
        </div>

        {/* Discover */}
        <div>
          <h3 className="font-semibold mb-4">Discover</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Trust & Safety</li>
            <li className="hover:underline cursor-pointer">Travel Credit</li>
            <li className="hover:underline cursor-pointer">Gift Cards</li>
            <li className="hover:underline cursor-pointer">Airbnb Luxe</li>
          </ul>
        </div>

        {/* Host */}
        <div>
          <h3 className="font-semibold mb-4">Host</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Host your home</li>
            <li className="hover:underline cursor-pointer">Host an Experience</li>
            <li className="hover:underline cursor-pointer">Responsible hosting</li>
            <li className="hover:underline cursor-pointer">Community Center</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">Cancellation Options</li>
            <li className="hover:underline cursor-pointer">Neighborhood Support</li>
            <li className="hover:underline cursor-pointer">Trust & Safety</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-6 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Airbnb Clone. All rights reserved.
      </div>
    </footer>
  );
}
