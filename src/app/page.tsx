import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";

const page = () => {
  return (
    <div className="flex justify-center items-center flex-row">
      <form className="mt-7 flex flex-row items-center justify-center placeholder-gray-300 bg-gray-700 md:w-1/4 rounded-lg pl-3">
        <div>
          <FaMagnifyingGlass />
        </div>
        <input
          type="text"
          className=" w-full rounded-md text-center bg-transparent text-lg pl-3 border-none focus:outline-none focus:placeholder:text-transparent"
          placeholder="Suche"
        />
        <div className=" bg-black rounded-r-lg py-4 px-5">
          <FaFilter />
        </div>
      </form>
    </div>
  );
};

export default page;
