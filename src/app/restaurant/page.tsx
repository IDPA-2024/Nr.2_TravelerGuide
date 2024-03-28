"use client";
import React from "react";
import Input from "../components/Input";
import { ToastContainer } from "react-toastify";
import SearchRestaurant from "../components/SearchRestaurant";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckboxLabels from "../components/CheckboxLabels";
import CustomButton from "../components/CustomButton";

const page = () => {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState([]);
  const [price, setPrice] = React.useState("");
  const [quality, setQuality] = React.useState("");
  const [ambiance, setAmbiance] = React.useState({
    style: "modern",
    space: "tight",
    brightness: "grim",
    loudness: "loud",
  });
  const [vegan, setVegan] = React.useState(false);
  const [seatingOption, setSeatingOption] = React.useState(false);
  const [takeaway, setTakeaway] = React.useState(false);
  const [seatingIndoor, setSeatingIndoor] = React.useState(false);
  const [seatingOutdoor, setSeatingOutdoor] = React.useState(false);

  return (
    <div className="bg-bg bg-cover bg-fixed min-h-screen w-screen flex justify-center items-center md:justify-end">
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full min-h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-3/4 md:w-1/3 md:mr-10 my-8">
        <p className="font-bold text-white md:h-1/4 text-6xl">
          Neues Restaurant
        </p>
        <div className="flex flex-col gap-5 justify-center items-center w-full">
          <SearchRestaurant search={search} setSearch={setSearch} />
          <p>Welchen Kategorien ordnest du das Restaurant ein?</p>
          <FormControl className="w-3/4 flex-grow">
            <InputLabel id="category-select">Kategorie</InputLabel>
            <Select
              id="category-select"
              value={category}
              label="Kategorie"
              onChange={(e) => setCategory(e.target.value as [])}
              variant="standard"
              multiple
            >
              <MenuItem value="asian">Asiatisch</MenuItem>
              <MenuItem value="greek">Griechisch</MenuItem>
              <MenuItem value="italian">Italienisch</MenuItem>
              <MenuItem value="fastfood">Fast Food</MenuItem>
              <MenuItem value="burger">Burger</MenuItem>
              <MenuItem value="kebab">Kebab</MenuItem>
              <MenuItem value="sandwich">Sandwich</MenuItem>
              <MenuItem value="other">Sonstiges</MenuItem>
            </Select>
          </FormControl>
          <p>Wie ist der Preis</p>
          <FormControl className="w-3/4 flex-grow">
            <InputLabel id="price-select">Preis</InputLabel>
            <Select
              id="price-select"
              value={price}
              label="Preis"
              onChange={(e) => setPrice(e.target.value)}
              variant="standard"
            >
              <MenuItem value="sehrguenstig">
                Sehr Günstig (5 CHF für 1 Mahlzeit)
              </MenuItem>
              <MenuItem value="guenstig">
                Günstig (&gt;7 CHF für 1 Mahlzeit)
              </MenuItem>
              <MenuItem value="io">
                In Ordnung (&gt;10 CHF für 1 Mahlzeit)
              </MenuItem>
              <MenuItem value="teuer">
                Teuer (&gt;15 CHF für 1 Mahlzeit)
              </MenuItem>
              <MenuItem value="sehrteuer">
                sehr Teuer (&gt;20 CHF für 1 Mahlzeit)
              </MenuItem>
            </Select>
          </FormControl>
          <p>Wie ist die Qualität?</p>
          <FormControl className="w-3/4 flex-grow">
            <InputLabel id="quality-select">Qualität</InputLabel>
            <Select
              id="quality-select"
              value={quality}
              label="Qualität"
              onChange={(e) => setQuality(e.target.value)}
              variant="standard"
            >
              <MenuItem value="sehrlecker">Sehr Lecker</MenuItem>
              <MenuItem value="lecker">Lecker</MenuItem>
              <MenuItem value="io">In Ordnung</MenuItem>
              <MenuItem value="nichtlecker">nicht Lecker</MenuItem>
              <MenuItem value="ekelhaft">Ekelhaft</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel id="radio-ambiance-group-label">Ambiance</FormLabel>
            <p>Wie ist der Style?</p>
            <RadioGroup
              row
              aria-labelledby="radio-ambiance-group-label"
              name="row-radio-style-group"
              value={ambiance.style}
              onChange={(e) => {
                setAmbiance({ ...ambiance, style: e.target.value });
              }}
            >
              <FormControlLabel
                value="modern"
                control={<Radio />}
                label="Modern"
              />
              <FormControlLabel
                value="old-fashioned"
                control={<Radio />}
                label="Altmodisch"
              />
            </RadioGroup>
            <p>Wie ist der Platz?</p>
            <RadioGroup
              row
              aria-labelledby="radio-ambiance-group-label"
              name="row-radio-space-group"
              value={ambiance.space}
              onChange={(e) => {
                setAmbiance({ ...ambiance, space: e.target.value });
              }}
            >
              <FormControlLabel
                value="tight"
                control={<Radio />}
                label="Klein"
              />
              <FormControlLabel
                value="spacious"
                control={<Radio />}
                label="Gross"
              />
            </RadioGroup>
            <p>Wie ist die Helligkeit?</p>
            <RadioGroup
              row
              aria-labelledby="radio-ambiance-group-label"
              name="row-radio-brightness-group"
              value={ambiance.brightness}
              onChange={(e) => {
                setAmbiance({ ...ambiance, brightness: e.target.value });
              }}
            >
              <FormControlLabel
                value="grim"
                control={<Radio />}
                label="Düster"
              />
              <FormControlLabel
                value="bright"
                control={<Radio />}
                label="Hell"
              />
            </RadioGroup>
            <p>Wie ist die Lautstärke?</p>
            <RadioGroup
              row
              aria-labelledby="radio-ambiance-group-label"
              name="row-radio-loudness-group"
              value={ambiance.loudness}
              onChange={(e) => {
                setAmbiance({ ...ambiance, loudness: e.target.value });
              }}
            >
              <FormControlLabel value="loud" control={<Radio />} label="Laut" />
              <FormControlLabel
                value="quiet"
                control={<Radio />}
                label="Ruhig"
              />
            </RadioGroup>
          </FormControl>
          <div className="flex flex-col justify-center items-start">
            <p>Suche die Optionen aus die dem Restaurant zustimmen!</p>
            <CheckboxLabels
              label="Vegan"
              checked={vegan}
              onChange={() => {
                setVegan(!vegan);
              }}
            />
            <CheckboxLabels
              label="Sitzmöglichkeit"
              checked={seatingOption}
              onChange={() => {
                setSeatingOption(!seatingOption);
              }}
            />
            {seatingOption && (
              <>
                <CheckboxLabels
                  label="Innenbereich"
                  checked={seatingIndoor}
                  onChange={() => {
                    setSeatingIndoor(!seatingIndoor);
                  }}
                />
                <CheckboxLabels
                  label="Aussenbereich"
                  checked={seatingOutdoor}
                  onChange={() => {
                    setSeatingOutdoor(!seatingOutdoor);
                  }}
                />
              </>
            )}
            <CheckboxLabels
              label="Takeaway"
              checked={takeaway}
              onChange={() => {
                setTakeaway(!takeaway);
              }}
            />
          </div>
          <CustomButton text="Erstellen" size="lg" />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center w-full"></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
