"use client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import * as React from "react";
import Popover from "./Popover";

const Header = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="flex justify-center items-center flex-row ">
      <div className=" absolute top-7 flex flex-row items-center justify-center placeholder-gray-300 bg-gray-700 md:w-1/4 rounded-lg pl-3">
        <div>
          <FaMagnifyingGlass />
        </div>
        <input
          type="text"
          className=" w-full rounded-md text-center bg-transparent text-lg pl-3 border-none focus:outline-none focus:placeholder:text-transparent"
          placeholder="Suche"
        />
        <button onClick={handleClick}>
          <div className=" bg-black rounded-r-lg py-4 px-5">
            <FaFilter />
          </div>
        </button>
        {open && <Popover content={["test", "lol", "haha"]} type="checkbox" item="test" />}
      </div>
    </div>
  );
};

export default Header;
