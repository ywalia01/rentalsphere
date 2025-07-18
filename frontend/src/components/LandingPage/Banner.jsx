import React from 'react';

const Banner = () => {
  return (
    <section className="h-screen bg-black flex justify-center items-center">
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <div className="w-1/2">
                    <div className="text-white">
                        <h1 className="text-4xl font-bold mb-6">Welcome to Rental Sphere, where every corner holds an adventure, and every space tells a story</h1>
                        <p className="text-lg text-gray-300 mb-8">Explore limitless possibilities and discover your perfect rental oasis in our vibrant sphere of possibilities</p>
                        <button className="bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-600 font-semibold">Get Started</button>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="w-full h-full">
                        <img src="img/trans.gif" alt="Banner" className="w-full h-full" /> 
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Banner;
    