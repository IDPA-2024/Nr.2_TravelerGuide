"use client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CheckboxLabels from "./CheckboxLabels";
import Button from "./Button";

const SearchBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        <button aria-describedby={id} onClick={handleClick}>
          <div className=" bg-black rounded-r-lg py-4 px-5">
            <FaFilter />
          </div>
        </button>
        </div>
        <Popover
        className="mt-4 mr-10"
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography>
            <CheckboxLabels />
          </Typography>
        </Popover>
    </div>
  );
};

export default SearchBar;
