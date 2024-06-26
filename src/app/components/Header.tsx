"use client";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import * as React from "react";
import CustomButton from "./CustomButton";
import Checkbox from "./CheckboxLabels";
import Link from "next/link";
import { useUserContext } from "@/context/useUser";
import { useTokenContext } from "@/context/useToken";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

const Header = ({
  filterOpen,
  setFilterOpen,
  userMenuOpen,
  setUserMenuOpen,
  openProfile,
  setOpenProfile,
  setData,
}: {
  filterOpen: boolean;
  setFilterOpen: (value: boolean) => void;
  userMenuOpen: boolean;
  setUserMenuOpen: (value: boolean) => void;
  openProfile: boolean;
  setOpenProfile: (value: boolean) => void;
  setData: (value: any) => void;
}) => {
  const { user, setUser } = useUserContext(); // Using the useUserContext hook to get the user and setUser values from the user context
  const { token, setToken } = useTokenContext(); // Using the useTokenContext hook to get the token and setToken values from the token context
  const [filterOptions, setFilterOptions] = React.useState([
    // Using the useState hook to initialize the filterOptions state variable with an array of filter options
    { label: "Asiatisch", value: "asian", checked: false },
    { label: "Griechisch", value: "greek", checked: false },
    { label: "Italienisch", value: "italian", checked: false },
    { label: "Fast Food", value: "fastfood", checked: false },
    { label: "Burger", value: "burger", checked: false },
    { label: "Kebab", value: "kebab", checked: false },
    { label: "Sandwich", value: "sandwich", checked: false },
    { label: "Sonstiges", value: "other", checked: false },
  ]);

  const handleLogout = () => {
    setUserMenuOpen(false);
    setToken(null);
    setUser(null);
  };

  const router = useRouter();
  const [search, setSearch] = React.useState("");

  let profile = {
    __html: user
      ? user.image
      : `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" id="user"><path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"></path></svg>`,
  };

  React.useEffect(() => {
    profile.__html = user ? user.image : profile.__html;
  }, [user]);

  const handleOpenFilter = async () => {
    setFilterOpen(!filterOpen);
  };

  const handleOpenMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Search function
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    let search = e.target.value === "" ? "" : e.target.value;
    let checkedValues: Array<string> = [];
    filterOptions.forEach((option) => {
      if (option.checked) {
        checkedValues.push(option.value);
      }
    });
    const response = await fetch(`/api/restaurant`, {
      method: "PUT",
      body: JSON.stringify({ filter: checkedValues, search: search }),
    });
    const data = await response.json();
    setData(data.data);
  };

  // Filter function
  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
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
    let array = [];
    for (let i = 0; i < checkedValues.length; i++) {
      let value = filterOptions.find(
        (option) => option.label === checkedValues[i]
      );
      array.push(value?.value);
    }
    const response = await fetch(`/api/restaurant`, {
      method: "PUT",
      body: JSON.stringify({ filter: array, search: "" }),
    });
    const data = await response.json();
    setData(data.data);
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
          value={search}
          onChange={handleSearch}
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
          className="rounded-full w-12 h-12 border border-black overflow-hidden cursor-pointer  "
          onClick={handleOpenMenu}
        >
          <div
            dangerouslySetInnerHTML={profile}
            className={" w-full h-full bg-gray-300 " + (user ? "" : "p-1")}
          />
        </div>
        {userMenuOpen &&
          (token !== null ? (
            <div className="flex flex-col gap-2 justify-center bg-[#78797A] rounded-xl shadow-lg shadow-black mt-2 p-5 w-56 absolute right-0 top-full ">
              <div
                className="cursor-pointer hover:text-[#0BCAAD] transition duration-150 ease-in-out"
                onClick={() => {
                  setOpenProfile(!openProfile);
                }}
              >
                Mein Konto
              </div>
              <Link
                href="/restaurant"
                className="hover:text-[#0BCAAD] transition duration-150 ease-in-out"
              >
                Restaurant hinzufügen
              </Link>
              <div
                className="border-t border-white mt-2 pt-2 cursor-pointer hover:text-[#0BCAAD] transition duration-150 ease-in-out"
                onClick={handleLogout}
              >
                Abmelden
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 justify-center bg-[#78797A] rounded-xl shadow-lg shadow-black mt-2 p-5 w-56 absolute right-0 top-full hover:text-[#0BCAAD] transition duration-150 ease-in-out">
              <Link href="/login">Anmelden</Link>
            </div>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Header;
