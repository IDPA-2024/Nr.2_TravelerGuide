import React from "react";
import { RiMapPinLine } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { IoRestaurantOutline } from "react-icons/io5";
import { LuLeaf } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const Overview = () => {
  const openingHours = {
    Monday: ["11:30-14:00", "17:00-22:00"],
    Tuesday: ["11:30-14:00", "17:00-22:00"],
    Wednesday: ["11:30-14:00", "17:00-22:00"],
    Thursday: ["11:30-14:00", "17:00-22:00"],
    Friday: ["11:30-14:00", "17:00-22:00"],
  };
  const [localClosed, setLocalClosed] = React.useState(false);
  const [todayOpeningHours, setTodayOpeningHours] = React.useState(
    "11:30-14:00, 17:00-22:00"
  );

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center font-bold text-2xl">RestaurantName</h1>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-6">
          <RiMapPinLine size={40} />
          <p className="flex items-center gap-5 col-span-5">
            DieStrasse 15, 12345 Ortschaft
          </p>
        </div>
        <div className="grid grid-cols-6">
          <IoMdTime size={40} />
          <Accordion className="flex flex-col items-start col-span-5 " sx={{   background: "rgba(0, 0, 0, 0.25)", color: "white" }} >
            <AccordionSummary
            className="flex flex-row justify-between w-full"
              expandIcon={<IoIosArrowDown color="white" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {localClosed ? "Geschlossen" : todayOpeningHours}
            </AccordionSummary>
            <AccordionDetails>
              {Object.keys(openingHours).map((day) => (
                <div key={day} className="flex flex-col mt-4">
                  <p>{day}</p>
                  <p>{openingHours[day].join(", ")}</p>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="grid grid-cols-6">
          <GrMoney size={40} />
          <p className="flex items-center gap-5 col-span-5">4/5</p>
        </div>
        <div className="grid grid-cols-6">
          <IoRestaurantOutline size={40} />
          <p className="flex items-center gap-5 col-span-5">Qualität</p>
        </div>
        <div className="grid grid-cols-6">
          <LuLeaf size={40} />
          <p className="flex items-center gap-5 col-span-5">Vegan</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
