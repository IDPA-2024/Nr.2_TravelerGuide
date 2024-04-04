"use client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import * as React from "react";
import CustomButton from "./CustomButton";
import Checkbox from "./CheckboxLabels";
import Link from "next/link";

const Header = ({
  filterOpen,
  setFilterOpen,
  userMenuOpen,
  setUserMenuOpen,
  openProfile,
  setOpenProfile,
}: {
  filterOpen: boolean;
  setFilterOpen: (value: boolean) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (value: boolean) => void;
  openProfile: boolean;
  setOpenProfile: (value: boolean) => void;
}) => {
  const [filterOptions, setFilterOptions] = React.useState([
    { label: "Asiatisch", value: "asian", checked: false },
    { label: "Griechisch", value: "greek", checked: false },
    { label: "Italienisch", value: "italian", checked: false },
    { label: "Fast Food", value: "fastfood", checked: false },
    { label: "Burger", value: "burger", checked: false },
    { label: "Kebab", value: "kebab", checked: false },
    { label: "Sandwhich", value: "sandwhich", checked: false },
    { label: "Sonstiges", value: "other", checked: false },
  ]);
  let profile = {
    __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" version="1.1"><rect fill="#e0e0e0" cx="128" width="256" height="256" cy="128" r="128"/><text x="50%" y="50%" style="color: #000000; line-height: 1;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" alignment-baseline="middle" text-anchor="middle" font-size="112" font-weight="400" dy=".1em" dominant-baseline="middle" fill="#000000">EL</text></svg>`,
  };

  const handleOpenFilter = () => {
    setFilterOpen(!filterOpen);
    // TODO: API call with checkedValues
  };

  const handleOpenMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let checkedValues: Array<string> = [];
    checkboxes.forEach((checkbox) => {
      if ((checkbox as HTMLInputElement).checked) {
        checkedValues.push((checkbox as HTMLInputElement).value);
      }
    });
    let newFilterOptions = filterOptions.map((option) => {
      if (checkedValues.includes(option.value)) {
        return { ...option, checked: true };
      } else {
        return { ...option };
      }
    });
    setFilterOptions(newFilterOptions);
    // TODO: API call with checkedValues

    setFilterOpen(false);
  };

  return (
    <div className="flex justify-center items-center flex-row ">
      <div className=" z-20 absolute top-7 flex flex-row items-center justify-center bg-black/50 backdrop-filter backdrop-blur-md md:w-1/4 w-2/3 mr-24 md:mr-0 rounded-lg pl-3 ">
        <div>
          <FaMagnifyingGlass />
        </div>
        <input
          type="text"
          className=" w-full rounded-md text-center bg-transparent text-lg pl-3 placeholder:text-white/50 border-none focus:outline-none focus:placeholder:text-transparent"
          placeholder="Suche"
        />
        <button onClick={handleOpenFilter}>
          <div className=" md:hover:bg-black transition duration-150 ease-in-out cursor-pointer rounded-r-lg py-4 px-5 ">
            <FaFilter />
          </div>
        </button>
        {filterOpen && (
          <div className="flex flex-col justify-center bg-[#78797A] rounded-xl shadow-lg shadow-black absolute top-full right-0 mt-5 p-5 md:w-1/2 w-full ">
            <form
              onSubmit={(e) => {
                handleFilter(e);
              }}
              className="flex flex-col gap-2"
            >
              <div className="md:flex md:flex-col md:justify-center grid grid-cols-2">
                {filterOptions.map((option) => (
                  <Checkbox
                    label={option.label}
                    checked={option.checked}
                    onChange={() => {
                      let newFilterOptions = filterOptions.map(
                        (filterOption) => {
                          if (filterOption.label === option.label) {
                            return {
                              ...filterOption,
                              checked: !filterOption.checked,
                            };
                          } else {
                            return { ...filterOption };
                          }
                        }
                      );
                      setFilterOptions(newFilterOptions);
                    }}
                  />
                ))}
              </div>
              <CustomButton
                text="Schliessen"
                size="custom"
                custom=" h-8 w-full "
                type="submit"
              />
            </form>
          </div>
        )}
      </div>
      <div className="absolute right-4 top-7 md:right-7 z-20">
        <div
          className="rounded-full w-12 h-12 border border-dotted border-black  overflow-hidden cursor-pointer  "
          onClick={handleOpenMenu}
        >
          <div dangerouslySetInnerHTML={profile} className=" w-full h-full" />
        </div>
        {userMenuOpen && (
          <div className="flex flex-col gap-2 justify-center bg-[#78797A] rounded-xl shadow-lg shadow-black mt-2 p-5 w-56 absolute right-0 top-full ">
            <div
              className="cursor-pointer hover:text-[#0BCAAD] transition duration-150 ease-in-out"
              onClick={() => {
                setOpenProfile(!openProfile);
              }}
            >
              Mein Konto
            </div>
            <Link href="/restaurant" className="hover:text-[#0BCAAD] transition duration-150 ease-in-out">Restaurant hinzufügen</Link>
            <div className="border-t border-white mt-2 pt-2 cursor-pointer hover:text-[#0BCAAD] transition duration-150 ease-in-out">
              Abmelden
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
