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
import { MdChairAlt } from "react-icons/md";
import { TbPaperBag } from "react-icons/tb";

const Overview = ({ restaurant }: { restaurant: any }) => {
  const [todayOpeningHours, setTodayOpeningHours] = React.useState("");
  const [vegan, setVegan] = React.useState(false);
  const [seatingOption, setSeatingOption] = React.useState(false);
  const [takeAway, setTakeAway] = React.useState(false);

  enum quality {
    "io" = "In Ordnung",
    "sehrlecker" = "Sehr lecker",
    "lecker" = "Lecker",
    "nichtlecker" = "Nicht lecker",
    "ekelhaft" = "Ekelhaft",
  }

  enum price {
    "sehrguenstig" = "Sehr Günstig (5 CHF für 1 Mahlzeit)",
    "guenstig" = "Günstig (>7 CHF für 1 Mahlzeit)",
    "io" = "In Ordnung (>10 CHF für 1 Mahlzeit)",
    "teuer" = "Teuer (>15 CHF für 1 Mahlzeit)",
    "sehrteuer" = "sehr Teuer (>20 CHF für 1 Mahlzeit)",
  }

  useEffect(() => {
    setTodayOpeningHours(
      restaurant.opening_hours.weekday_text[new Date().getDay() - 1]
    );
    if (restaurant.vegan) {
      setVegan(true);
    }
    if (restaurant.seating_option) {
      setSeatingOption(true);
    }
    if (restaurant.take_away) {
      setTakeAway(true);
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
        {takeAway && (
          <div className="grid grid-cols-6">
            <TbPaperBag size={40} />
            <p className="flex items-center gap-5 col-span-5">Take Away</p>
          </div>
        )}
        {vegan && (
          <div className="grid grid-cols-6">
            <LuLeaf size={40} />
            <p className="flex items-center gap-5 col-span-5">Vegan</p>
          </div>
        )}
        {seatingOption && (
          <div className="grid grid-cols-6">
            <MdChairAlt size={40} />
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
                <div key="indoor_seating" className="flex flex-col">
                  <p>
                    Innen Sitzmöglichkeiten:{" "}
                    {restaurant.indoor_seating ? "Ja" : "Nein"}
                  </p>
                </div>
                <div key="outdoor_seating" className="flex flex-col mt-4">
                  <p>
                    Aussen Sitzmöglichkeiten:{" "}
                    {restaurant.outdoor_seating ? "Ja" : "Nein"}
                  </p>
                </div>
                <div key="style" className="flex flex-col mt-4">
                  <p>
                    Stil:{" "}
                    {restaurant.ambience.style === "modern"
                      ? "Modern"
                      : "Altmodisch"}
                  </p>
                </div>
                <div key="space" className="flex flex-col mt-4">
                  <p>
                    Platz:{" "}
                    {restaurant.ambience.space === "spacious"
                      ? "Klein"
                      : "Gross"}
                  </p>
                </div>
                <div key="brightness" className="flex flex-col mt-4">
                  <p>
                    Helligkeit:{" "}
                    {restaurant.ambience.brightness === "bright"
                      ? "Hell"
                      : "Dunkel"}
                  </p>
                </div>
                <div key="loudness" className="flex flex-col mt-4">
                  <p>
                    Lautstärke:{" "}
                    {restaurant.ambience.loudness === "loud" ? "Laut" : "Leise"}
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
