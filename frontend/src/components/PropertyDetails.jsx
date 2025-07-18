import React, { useEffect, useState } from "react";
import { PiMapPin, PiBathtubBold } from "react-icons/pi";
import { BiHotel, BiBuildingHouse } from "react-icons/bi";
import CarouselSlider from "./carousel/CarouselSlider";
import { GiElectric } from "react-icons/gi";
import { FaWifi } from "react-icons/fa";
import { LuParkingCircle } from "react-icons/lu";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { MdPets } from "react-icons/md";
import { TbRulerMeasure } from "react-icons/tb";
import { LuSofa } from "react-icons/lu";
import { GiWashingMachine } from "react-icons/gi";
import { IoSnow } from "react-icons/io5";
import { PiPottedPlant } from "react-icons/pi";
import { LuCigarette } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { sampleListingsData } from "../Utils/SampleData";

const PropertyDetails = () => {
  const { id } = useParams();

  const data = sampleListingsData.find((obj) => obj.id == id);
  console.log(data, "data");

  return (
    <div className="w-full p-10">
      <div className="flex justify-center gap-6 ml-12">
        <div className="w-[48%]">
          <CarouselSlider>
            <div className="h-full w-full">
              <img
                className="object-cover"
                src="https://media.designcafe.com/wp-content/uploads/2023/01/31151510/contemporary-interior-design-ideas-for-your-home.jpg"
              />
            </div>
            <div className="h-full w-full">
              <img
                className="object-cover"
                src="https://media.designcafe.com/wp-content/uploads/2020/07/23205856/home-interior-design-ideas.jpg"
              />
            </div>
            <div className="h-full w-full">
              <img
                className="object-cover"
                src="https://media.istockphoto.com/id/1449364000/photo/minimalist-style-tiny-room.jpg?s=612x612&w=0&k=20&c=uokTOpJl8Hoc4HGqJPicYjy8SBMwCEWkGLUhhvJYgTA="
              />
            </div>
          </CarouselSlider>
          <div className="mt-6">
            <div className="bg-white p-4 border border-gray-300 drop-shadow-sm">
              <h6 className="text-center font-bold ">Request a viewing</h6>
              <p className="text-center mt-4 text-gray-600">
                Check out the rental property in person! Schedule time with the
                landlord for a viewing.
              </p>
              <button className="bg-[#373373] w-full rounded-[4px] py-2 text-white font-semibold mt-6">
                Request a viewing
              </button>
            </div>

            <div className="bg-white p-4 border border-gray-300 mt-6 drop-shadow-sm">
              <h6 className="text-center font-bold ">Contact User</h6>
              <button className="bg-[#373373] w-full rounded-[4px] py-2 text-white font-semibold mt-6">
                Send message
              </button>
            </div>

            <div className="text-center">
              <button className="bg-[#373373] w-1/2  rounded-[4px] py-2 text-white font-semibold mt-6">
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="w-[48%] justify-center">
          {/* ### TITLE BOX DIV START### */}
          <div className="bg-white p-4 border border-gray-300  drop-shadow-sm ">
            <div className="flex justify-between gap-6">
              <h2 className="text-[20px] font-bold text-gray-800">
                Gorgeous 3 BDR Unit with Lovely Backyard Centrally Located
              </h2>

              <div className="text-right w-[25%]">
                <p className="text-green-600 font-bold text-[20px]">$2,995</p>
                <p className="text-gray-600 text-[12px]">
                  Some Utilities Included
                </p>
              </div>
            </div>

            <div className="flex gap-2 my-6">
              <PiMapPin className="text-[20px] mt-1" />
              <div>
                <p className="font-semibold ">Halifax, NS B3N 1P9</p>
                <p className="text-gray-600 text-[14px]">Posted 3 days ago</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-4 my-4">
                <div className="flex gap-2 items-center border-black pr-4 border-r">
                  <BiBuildingHouse className="text-[20px]" />{" "}
                  <p className="text-[14px]">House</p>
                </div>

                <div className="flex gap-2 items-center border-black pr-4 border-r">
                  <BiHotel className="text-[20px]" />{" "}
                  <p className="text-[14px]">Bedrooms: 3</p>
                </div>

                <div className="flex gap-2 items-center">
                  <PiBathtubBold className="text-[20px]" />{" "}
                  <p className="text-[14px]">Bathrooms: 1</p>
                </div>
              </div>
              <div>
                <button className="rounded-[4px] bg-[#F1454F] py-2 px-4 text-white text-[12px] font-bold">
                  FEATURED
                </button>
              </div>
            </div>
          </div>
          {/* ### TITLE BOX DIV END### */}

          {/* ### DESCRIPTION START ### */}
          <div className="bg-white  p-4 border border-gray-300 drop-shadow-sm  mt-6">
            <h6 className="text-[20px] text-[#373373]">Description</h6>
            <p className="mt-4 ">
              One bedroom in a 5 bedroom house in Clayton Park close to all
              amenities, bus route . Everything included including a shared
              kitchen living room and dining room . Each bedroom will have their
              own individual mini fridge and microwave .Cable and internet
            </p>
          </div>
          {/* ### DESCRIPTION END ### */}

          {/* ### OVERVIEW 2 BOX LAYOUT START ### */}
          <div className="flex gap-4 mt-6">
            <div className="w-1/2 bg-white p-4 border border-gray-300 drop-shadow-sm">
              <h2 className="text-[20px]  text-[#373373]">Overview</h2>
              <div className="flex gap-2 mt-4">
                <GiElectric className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Utilities Included</p>
                  <p className="text-[14px]">Not Included</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <FaWifi className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Wi-Fi and More</p>
                  <p className="text-[14px]">Not Included</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <LuParkingCircle className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Parking Included</p>
                  <p className="text-[14px]">3+</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <FaClockRotateLeft className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Agreement Type</p>
                  <p className="text-[14px]">1 Year</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <IoCalendarNumberOutline className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Move-In Date</p>
                  <p className="text-[14px]">April 1, 2024</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <MdPets className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Pet Friendly</p>
                  <p className="text-[14px]">No</p>
                </div>
              </div>
            </div>

            <div className="w-1/2 bg-white p-4 border border-gray-300 drop-shadow-sm">
              <h2 className="text-[20px]  text-[#373373]">The Unit</h2>
              <div className="flex gap-2 mt-4">
                <TbRulerMeasure className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Size (sqft)</p>
                  <p className="text-[14px]">3,000</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <LuSofa className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Furnished</p>
                  <p className="text-[14px]">Yes</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <GiWashingMachine className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Appliances</p>
                  <p className="text-[14px]">Not Included</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <IoSnow className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Air Conditioning</p>
                  <p className="text-[14px]">Yes</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <PiPottedPlant className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Personal Outdoor Space</p>
                  <p className="text-[14px]">Not Included</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <LuCigarette className="text-[20px] mt-1" />
                <div>
                  <p className="font-semibold">Smoking Permitted</p>
                  <p className="text-[14px]">No</p>
                </div>
              </div>
            </div>
          </div>
          {/* ### OVERVIEW 2 BOX LAYOUT END ### */}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
