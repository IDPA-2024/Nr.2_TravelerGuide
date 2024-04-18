"use client";
import Header from "./components/Header";
import Map from "./components/Map";
import OverviewDrawer from "./components/OverviewDrawer";
import { useState } from "react";
import ProfileDrawer from "./components/ProfileDrawer";
import { useTokenContext } from "@/context/useToken";
import { useUserContext } from "@/context/useUser";
import { useRestaurants } from "@/hooks/useRestaurants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

// Define the page component
const page = () => {
  // Define state variables
  const { token, setToken } = useTokenContext();
  const { user, setUser } = useUserContext();
  const [filterOpen, setFilterOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const { data, setData } = useRestaurants();
  const mapRef = React.useRef(null);

  const handleClick = () => {
    if (userMenuOpen) {
      setUserMenuOpen(false);
    }
  };

  return (
    <div onClick={handleClick} className="h-screen w-screen overflow-y-hidden">
      <OverviewDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        restaurant={restaurant}
      />
      <Map
        setRestaurant={setRestaurant}
        setOpenDrawer={setOpenDrawer}
        restaurants={data}
        mapRef={mapRef}
      />
      <div
        className={
          "absolute bg-black/75 top-0 left-0 right-0 bottom-0 z-10  " +
          (filterOpen || userMenuOpen ? "block" : "hidden")
        }
        onClick={() => {
          setFilterOpen(false);
        }}
      />
      <Header
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
        setData={setData}
      />
      <ProfileDrawer
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
      />
      <ToastContainer />
    </div>
  );
};

export default page;
