import Link from "next/link";
import React from "react";

const Route = ({ restaurant }: { restaurant: any }) => {
  return (
    <div>
      <a
        href={`https://www.google.com/maps/place/${restaurant.lat},${restaurant.lng}`}
        target="_blank"
        className="bg-[#0BCAAD] rounded-lg flex justify-center items-center shadow-md shadow-black hover:bg-opacity-50 transition duration-150 ease-in-out cursor-pointer w-full h-10 text-xl"
      >
        Google Maps
      </a>
    </div>
  );
};

export default Route;
