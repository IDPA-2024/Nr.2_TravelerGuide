import React from "react";
import { IoIosGlobe } from "react-icons/io";
import { SiGooglemaps } from "react-icons/si";

const Route = ({ restaurant }: { restaurant: any }) => {
  return (
    <div className="flex flex-col justify-center gap-5">
      <a
        href={`https://www.google.com/maps/place/${restaurant.lat},${restaurant.lng}`}
        target="_blank"
        className="bg-[#0BCAAD] rounded-lg flex gap-5 justify-center items-center shadow-md shadow-black hover:bg-opacity-50 transition duration-150 ease-in-out cursor-pointer w-full h-16 text-xl"
      >
        <SiGooglemaps size={32} /> Google Maps
      </a>
      {restaurant.website && (
        <a
          href={restaurant.website}
          target="_blank"
          className="bg-[#0BCAAD] rounded-lg flex gap-5 justify-center items-center shadow-md shadow-black hover:bg-opacity-50 transition duration-150 ease-in-out cursor-pointer w-full h-16 text-xl"
        >
          <IoIosGlobe size={32} /> Website
        </a>
      )}
    </div>
  );
};

export default Route;
