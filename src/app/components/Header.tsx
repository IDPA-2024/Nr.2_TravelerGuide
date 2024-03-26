"use client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import * as React from "react";
import CustomButton from "./CustomButton";
import Checkbox from "./CheckboxLabels";

const Header = () => {
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const handleClick = () => {
    setFilterOpen(!filterOpen);
  };

  const handleFilter = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checkedValues: Array<string> = [];
    checkboxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        checkedValues.push((checkbox as HTMLInputElement).value);
      }
    });
    console.log(checkedValues);
    setFilterOpen(false);
    
  };

  return (
    <div className="flex justify-center items-center flex-row ">
      <div className=" absolute top-7 flex flex-row items-center justify-center placeholder-gray-300 bg-gray-700 md:w-1/4 rounded-lg pl-3 ">
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
        {filterOpen && (
          <form
            className="flex flex-col justify-center w-full bg-black/50 rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-[55vh] absolute top-full right-0 mt-5 p-5 md:w-1/2"
            onSubmit={(e) => {handleFilter(e)}}
          >
            <div>
              <Checkbox label="Asiatisch"  />
              <Checkbox label="Griechisch"/>
              <Checkbox label="Italienisch" />
              <Checkbox label="Fast Food" />
              <Checkbox label="Burger" />
              <Checkbox label="Kebab" />
              <Checkbox label="Sandwhich" />
              <Checkbox label="Sonstiges" />
            </div>
            <CustomButton
              text="Übernehmen"
              size="custom"
              custom=" min-h-10 w-full "
              type="submit"
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default Header;
