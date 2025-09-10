import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroImage from './../assets/heroimage.jpg'
const listings = [
  {
    name: 'Paris Apartment',
    location: 'Paris, France',
    price: '$120 / night',
    image: 'https://images.unsplash.com/photo-1528111057883-4f5a995343bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXMlMjBhcGFydG1lbnR8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'New York Loft',
    location: 'New York, USA',
    price: '$200 / night',
    image: 'https://plus.unsplash.com/premium_photo-1680428729442-a5793eeef1c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TmV3WW9yayUyMGxvZnR8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Tokyo Studio',
    location: 'Tokyo, Japan',
    price: '$150 / night',
    image: 'https://images.unsplash.com/photo-1681217665335-98da0f257c8f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Bali Villa',
    location: 'Bali, Indonesia',
    price: '$180 / night',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    name: 'London Flat',
    location: 'London, UK',
    price: '$170 / night',
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRyYXZlbCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    name: 'Sydney House',
    location: 'Sydney, Australia',
    price: '$190 / night',
    image: 'https://images.unsplash.com/photo-1688707387287-59f6096b8ce7?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRyYXZlbCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    name: 'Rome Apartment',
    location: 'Rome, Italy',
    price: '$160 / night',
    image: 'https://images.unsplash.com/photo-1712777826094-cca648b22635?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHRyYXZlbCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    name: 'Barcelona Loft',
    location: 'Barcelona, Spain',
    price: '$140 / night',
    image: 'https://images.unsplash.com/photo-1717369876871-11dae93539b9?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHRyYXZlbCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    name: 'Dubai Condo',
    location: 'Dubai, UAE',
    price: '$220 / night',
    image: 'https://images.unsplash.com/photo-1691055657038-cac5a5930821?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fHRyYXZlbCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    name: 'Istanbul Flat',
    location: 'Istanbul, Turkey',
    price: '$130 / night',
    image: 'https://images.unsplash.com/photo-1699424938742-886f4c0a680d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHRyYXZlbCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    name: 'Amsterdam Studio',
    location: 'Amsterdam, Netherlands',
    price: '$150 / night',
    image: 'https://images.unsplash.com/photo-1684920333013-e43f9fb0e9eb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fHRyYXZlbCUyMGltYWdlfGVufDB8fDB8fHww',
  },
  {
    name: 'Singapore Apartment',
    location: 'Singapore',
    price: '$210 / night',
    image: 'https://images.unsplash.com/photo-1699424495131-ab928183d4f0?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAzfHx0cmF2ZWwlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'LA Villa',
    location: 'Los Angeles, USA',
    price: '$200 / night',
    image: 'https://images.unsplash.com/photo-1680419928114-97b44ce6f8ba?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHx0cmF2ZWwlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Hong Kong Condo',
    location: 'Hong Kong',
    price: '$180 / night',
    image: 'https://images.unsplash.com/photo-1710131761087-a0667ec6ed18?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHx0cmF2ZWwlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    name: 'Rio Apartment',
    location: 'Rio de Janeiro, Brazil',
    price: '$160 / night',
    image: 'https://images.unsplash.com/photo-1710886456661-037a71461f48?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI0fHx0cmF2ZWwlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D',
  },
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="h-[500px] w-full relative">
        <img
          src={heroImage}
          alt="hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore the world with Airbnb
            </h1>
            <p className="text-lg md:text-xl">
              Discover unique places to stay and experiences
            </p>
          </div>
        </div>
      </div>

      {/* Listings / Destination Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {listings.map((item, idx) => (
          <div
            key={idx}
            className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition shadow-md"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 bg-white">
              <h3 className="text-gray-800 font-semibold text-sm">{item.name}</h3>
              <p className="text-gray-500 text-xs">{item.location}</p>
              <p className="text-gray-800 font-bold mt-1">{item.price}</p>
              <button
                onClick={() => navigate('/booking')}
                className="mt-2 w-full bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
