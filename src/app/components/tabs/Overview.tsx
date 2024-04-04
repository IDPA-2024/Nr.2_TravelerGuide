import React from "react";
import { RiMapPinLine } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { IoRestaurantOutline } from "react-icons/io5";
import { LuLeaf } from "react-icons/lu";

const Overview = () => {
  const openingHours = {
    Monday: ["11:30-14:00", "17:00-22:00"],
    Tuesday: ["11:30-14:00", "17:00-22:00"],
    Wednesday: ["11:30-14:00", "17:00-22:00"],
    Thursday: ["11:30-14:00", "17:00-22:00"],
    Friday: ["11:30-14:00", "17:00-22:00"],
  };
  const [localClosed, setLocalClosed] = React.useState(false);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center font-bold text-2xl">RestaurantName</h1>
      <div className="flex flex-col gap-6">
        <p className="flex items-center gap-5">
          <RiMapPinLine size={40} /> DieStrasse 15, 12345 Ortschaft
        </p>
        <div className="flex flex-row items-center gap-5">
          <IoMdTime size={40} className="max-width"/>
          <p>
            Heute Geschlossen oder 11:30 - 14:00 Uhr 17:00 - 22:00 Uhr
          </p>
        </div>

        <p className="flex items-center gap-5">
          <GrMoney size={40} /> 4/5
        </p>
        <p className="flex items-center gap-5">
          <IoRestaurantOutline size={40} /> Qualität
        </p>
        <p className="flex items-center gap-5">
          <LuLeaf size={40} /> Vegan
        </p>
      </div>
    </div>
  );
};

export default Overview;
