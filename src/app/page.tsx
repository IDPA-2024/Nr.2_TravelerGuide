'use client'
import Header from "./components/Header";
import Map from "./components/Map";
import OverviewDrawer from "./components/OverviewDrawer";
import { useState } from "react";

const page = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div>
        {/* <OverviewDrawer/> */}
      <Map />
      <div className={"absolute bg-black/75 top-0 left-0 right-0 bottom-0 z-10  " + (filterOpen ? "block" : "hidden")}/>
      <Header filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
    </div>
  );
};

export default page;