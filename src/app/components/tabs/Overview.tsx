import React, { useEffect } from "react";
import { RiMapPinLine } from "react-icons/ri";
import { IoMdTime } from "react-icons/io";
import { GrMoney } from "react-icons/gr";
import { IoRestaurantOutline } from "react-icons/io5";
import { LuLeaf } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { FaChair } from "react-icons/fa";

const Overview = ({ restaurant }: { restaurant: any }) => {
  const [todayOpeningHours, setTodayOpeningHours] = React.useState("");
  const [vegan, setVegan] = React.useState(true);


  enum quality {
    "io" = "In Ordnung",
    "sehrlecker" = "Sehr lecker",
    "lecker" = "Lecker",
    "nichtlecker" = "Nicht lecker",
    "ekelhaft" = "Ekelhaft",
  }

  enum price {
    "sehrguenstig" = "Sehr Günstig (5 CHF pro Mahlzeit)",
    "guenstig" = "Günstig (7 CHF oder mehr pro Mahlzeit)",
    "io" = "In Ordnung (10 CHF oder mehr pro Mahlzeit)",
    "teuer" = "Teuer (15 CHF oder mehr pro Mahlzeit)",
    "sehrteuer" = "sehr Teuer (20 CHF oder mehr pro Mahlzeit)",
  }

  useEffect(() => {
    setTodayOpeningHours(
      restaurant.opening_hours.weekday_text[new Date().getDay() - 1]
    );
    if (restaurant.vegan) {
      setVegan(true);
    }
  }, []);
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center font-bold text-2xl">{restaurant.name}</h1>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-6">
          <RiMapPinLine size={40} />
          <p className="flex items-center gap-5 col-span-5">
            {restaurant.address}
          </p>
        </div>
        <div className="grid grid-cols-6">
          <IoMdTime size={40} />
          <Accordion
            className="flex flex-col items-start col-span-5 "
            sx={{ background: "rgba(0, 0, 0, 0.25)", color: "white" }}
          >
            <AccordionSummary
              className="flex flex-row justify-between w-full"
              expandIcon={<IoIosArrowDown color="white" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {todayOpeningHours}
            </AccordionSummary>
            <AccordionDetails>
              {restaurant.opening_hours.weekday_text.map((day: string) => (
                <div key={day} className="flex flex-col mt-4">
                  <p>{day}</p>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="grid grid-cols-6">
          <GrMoney size={40} />
          <p className="flex items-center gap-5 col-span-5">
            Preis: {price[restaurant.price as keyof typeof price]}
          </p>
        </div>
        <div className="grid grid-cols-6">
          <IoRestaurantOutline size={40} />
          <p className="flex items-center gap-5 col-span-5">
            Qualität: {quality[restaurant.quality as keyof typeof quality]}
          </p>
        </div>
        {vegan && (
          <div className="grid grid-cols-6">
            <LuLeaf size={40} />
            <p className="flex items-center gap-5 col-span-5">Vegan</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-6">
          <FaChair size={40} />
          <Accordion
            className="flex flex-col items-start col-span-5 "
            sx={{ background: "rgba(0, 0, 0, 0.25)", color: "white" }}
          >
            <AccordionSummary
              className="flex flex-row justify-between w-full"
              expandIcon={<IoIosArrowDown color="white" />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Sitzmöglichkeiten und Ambiente
            </AccordionSummary>
            <AccordionDetails>
              {restaurant.opening_hours.weekday_text.map((day: string) => (
                <div key={day} className="flex flex-col mt-4">
                  <p>{day}</p>
                </div>
              ))}
            </AccordionDetails>
          </Accordion>
        </div>
    </div>
  );
};

export default Overview;
