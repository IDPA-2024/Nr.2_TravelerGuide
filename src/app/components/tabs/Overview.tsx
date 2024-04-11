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
import { TbPaperBag } from "react-icons/tb";

const Overview = ({ restaurant }: { restaurant: any }) => {
  // Define state variables
  const [todayOpeningHours, setTodayOpeningHours] = React.useState("");
  const [vegan, setVegan] = React.useState(false);
  const [seatingOption, setSeatingOption] = React.useState(false);
  const [takeAway, setTakeAway] = React.useState(false);
  const [opening_hours, setOpeningHours] = React.useState<
    { day: number; text: string }[]
  >([]);

  // Enum for quality levels
  enum quality {
    "io" = "In Ordnung",
    "sehrlecker" = "Sehr lecker",
    "lecker" = "Lecker",
    "nichtlecker" = "Nicht lecker",
    "ekelhaft" = "Ekelhaft",
  }

  // Enum for price levels
  enum price {
    "sehrguenstig" = "Sehr Günstig (5 CHF pro Mahlzeit)",
    "guenstig" = "Günstig (7 CHF oder mehr pro Mahlzeit)",
    "io" = "In Ordnung (10 CHF oder mehr pro Mahlzeit)",
    "teuer" = "Teuer (15 CHF oder mehr pro Mahlzeit)",
    "sehrteuer" = "sehr Teuer (20 CHF oder mehr pro Mahlzeit)",
  }

  useEffect(() => {
    // Set state values based on restaurant data
    if (restaurant.vegan) {
      setVegan(true);
    }
    if (restaurant.seating_option) {
      setSeatingOption(true);
    }
    if (restaurant.take_away) {
      setTakeAway(true);
    }

    // Format and set opening hours
    let openingHoursFormat: { day: number; text: string }[] = [];
    restaurant.opening_hours.periods.map((period: any) => {
      let string = "";
      switch (period.open.day) {
        case 0:
          string = "Sonntag";
          break;
        case 1:
          string = "Montag";
          break;
        case 2:
          string = "Dienstag";
          break;
        case 3:
          string = "Mittwoch";
          break;
        case 4:
          string = "Donnerstag";
          break;
        case 5:
          string = "Freitag";
          break;
        case 6:
          string = "Samstag";
          break;
      }
      string += ": ";
      if (period.open.hours === 0) {
        string += "00";
      }
      string +=
        (period.open.hours < 10 ? "0" + period.open.hours : period.open.hours) +
        ":" +
        (period.open.minutes < 10
          ? "0" + period.open.minutes
          : period.open.minutes) +
        " - " +
        (period.close.hours < 10
          ? "0" + period.close.hours
          : period.close.hours) +
        ":" +
        (period.close.minutes < 10
          ? "0" + period.close.minutes
          : period.close.minutes);
      openingHoursFormat.push({
        day: period.open.day,
        text: string,
      });
    });

    // Add closed days if not present in opening hours
    let days = [0, 1, 2, 3, 4, 5, 6];
    if (openingHoursFormat.length < 7) {
      days.map((day) => {
        if (!openingHoursFormat.some((e) => e.day === day)) {
          let string = "";
          switch (day) {
            case 0:
              string = "Sonntag";
              break;
            case 1:
              string = "Montag";
              break;
            case 2:
              string = "Dienstag";
              break;
            case 3:
              string = "Mittwoch";
              break;
            case 4:
              string = "Donnerstag";
              break;
            case 5:
              string = "Freitag";
              break;
            case 6:
              string = "Samstag";
              break;
          }
          string += ": Geschlossen";
          openingHoursFormat.push({
            day: day,
            text: string,
          });
        }
      });
    }

    // Set today's opening hours and all opening hours
    setTodayOpeningHours(
      openingHoursFormat.find((e) => e.day === new Date().getDay())?.text || ""
    );
    setOpeningHours(openingHoursFormat);
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
              {opening_hours.map((day: { day: number; text: string }) => (
                <div key={day.day} className="flex flex-col mt-4">
                  <p>{day.text}</p>
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
