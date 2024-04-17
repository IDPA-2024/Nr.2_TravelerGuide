"use client";
import React, { useEffect } from "react";
import SearchRestaurant from "../components/SearchRestaurant";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckboxLabels from "../components/CheckboxLabels";
import CustomButton from "../components/CustomButton";
import { Loader } from "@googlemaps/js-api-loader";
import SelectInput from "../components/SelectInput";
import { useTokenContext } from "@/context/useToken";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";

const page = () => {
  const { token } = useTokenContext();
  const router = useRouter();
  const mapRef = React.useRef(null);
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
  const [restaurantId, setRestaurantId] = React.useState("");
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  const createRestaurant: any = async () => {
    setLoading(true);
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
    });

    const { PlacesService } = await loader.importLibrary("places");

    const { Map } = await loader.importLibrary("maps");
    const position = {
      lat: 47.500229,
      lng: 8.72875,
    };

    const mapOptions = {
      center: position,
      zoom: 16,
      mapId: "1d3709bffc5c137f",
      fullscreenControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
    };

    const map = new Map(mapRef.current, mapOptions);
    const service = new PlacesService(map);
    if (
      !search ||
      category.length === 0 ||
      !price ||
      !quality ||
      !restaurantId
    ) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      toast.error("Es ist ein Fehler aufgetreten", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    } else if (checked == false) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      toast.error("Bitte akzeptiere die AGB's", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    let data;

    await service.getDetails(
      { placeId: restaurantId },
      async (result: any, status: any) => {
        if (status === "OK") {
          data = {
            restaurant: {
              name: result.name,
              category: category,
              price: price,
              quality: quality,
              ambience: ambiance,
              vegan: vegan,
              seating_option: seatingOption,
              indoor_seating: seatingIndoor,
              outdoor_seating: seatingOutdoor,
              take_away: takeaway,
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng(),
              address: result.formatted_address,
              image: result.photos[0].getUrl(),
              website: result.website,
              opening_hours: result.opening_hours,
              comments: [],
              place_id: restaurantId,
            },
            token: token,
          };
          const response = await fetch("/api/restaurant", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          if (response.status === 200) {
            setTimeout(() => {
              setLoading(false);
            }, 500);
            toast.success("Restaurant erfolgreich erstellt", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
            setTimeout(() => {
              router.push("/");
            }, 2000);
          } else {
            setTimeout(() => {
              setLoading(false);
            }, 500);
            toast.error("Restaurant konnte nicht erstellt werden", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }
        }
      }
    );
  };

  return (
    <div className="bg-bg bg-cover bg-fixed min-h-screen max-w-screen flex justify-center items-center md:justify-end">
      {loading && (
        <div className="absolute top-0 left-0 bottom-0 right-0 z-10 bg-[#0BCAAD] flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter backdrop-blur-md md:h-3/4 md:w-1/3 md:mr-10 md:my-8 p-16 ">
        <p className="font-bold text-white md:h-1/4 text-6xl text-center">
          Neues Restaurant
        </p>
        <div className="flex flex-col gap-5 justify-center items-center w-full ">
          <p className="text-center">Bitte ein Restaurant auswählen, was angezeigt wird</p>
          <p className="text-center">Wenn Ihr Restaurant nicht angezeigt wird, passen Sie die Sucheingabe an</p>
          <SearchRestaurant
            search={search}
            setSearch={setSearch}
            setId={setRestaurantId}
          />
          
          <div className="bg-black/50 rounded-xl max-w-full min-w-full p-5 shadow-lg shadow-black">
            <div className="w-full flex items-center flex-col ">
              <p className="self-start text-lg">
                Welche Kategorien liefert das Restaurant?
              </p>
              <FormControl className="w-full max-w-5/6 flex-grow">
                <Select
                  id="category-select"
                  value={category}
                  label="Kategorie"
                  onChange={(e) => setCategory(e.target.value as [])}
                  variant="standard"
                  multiple
                  input={<SelectInput />}
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
            </div>
            <div className="w-full flex items-center flex-col ">
              <p className="self-start text-lg">Wie ist der Preis</p>
              <FormControl className="w-full flex-grow">
                <Select
                  id="price-select"
                  value={price}
                  label="Preis"
                  onChange={(e) => setPrice(e.target.value)}
                  variant="standard"
                  input={<SelectInput />}
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
            </div>
            <div className="w-full flex items-center flex-col">
              <p className="self-start text-lg">Wie ist die Qualität?</p>
              <FormControl className="w-full flex-grow">
                <Select
                  value={quality}
                  label="Qualität"
                  onChange={(e) => setQuality(e.target.value)}
                  variant="standard"
                  input={<SelectInput />}
                >
                  <MenuItem value="sehrlecker">Sehr Lecker</MenuItem>
                  <MenuItem value="lecker">Lecker</MenuItem>
                  <MenuItem value="io">In Ordnung</MenuItem>
                  <MenuItem value="nichtlecker">nicht Lecker</MenuItem>
                  <MenuItem value="ekelhaft">Ekelhaft</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="w-full flex text-start flex-col bg-black/50 rounded-xl p-5 shadow-lg shadow-black">
            <FormControl className="gap-2">
              <p className="self-start text-lg">Wie ist das Ambiente?</p>
              <div>
                <p className="self-start text-md">Wie ist der Style?</p>
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
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#0BCAAD",
                          },
                        }}
                      />
                    }
                    label="Modern"
                  />
                  <FormControlLabel
                    value="old-fashioned"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#0BCAAD",
                          },
                        }}
                      />
                    }
                    label="Altmodisch"
                  />
                </RadioGroup>
              </div>
              <div>
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
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#0BCAAD",
                          },
                        }}
                      />
                    }
                    label="Klein"
                  />
                  <FormControlLabel
                    value="spacious"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#0BCAAD",
                          },
                        }}
                      />
                    }
                    label="Gross"
                  />
                </RadioGroup>
              </div>
              <div>
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
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#0BCAAD",
                          },
                        }}
                      />
                    }
                    label="Düster"
                  />
                  <FormControlLabel
                    value="bright"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#0BCAAD",
                          },
                        }}
                      />
                    }
                    label="Hell"
                  />
                </RadioGroup>
              </div>
              <div>
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
                  <FormControlLabel
                    value="loud"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#0BCAAD",
                          },
                        }}
                      />
                    }
                    label="Laut"
                  />
                  <FormControlLabel
                    value="quiet"
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "&.Mui-checked": {
                            color: "#0BCAAD",
                          },
                        }}
                      />
                    }
                    label="Ruhig"
                  />
                </RadioGroup>
              </div>
            </FormControl>
          </div>
          <div className="w-full flex text-start flex-col bg-black/50 rounded-xl p-5 shadow-lg shadow-black ">
            <p className="self-start text-lg">Wähle alle passende Attribute</p>
            <CheckboxLabels
              label="Vegane Optionen"
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
          <div className="flex items-center justify-center ">
            <Checkbox
              onChange={handleChecked}
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "#0BCAAD",
                },
              }}
            />
            <p>
              Ich akzeptiere die{" "}
              <Link
                href="/privacyPolicy"
                className="text-[#0BCAAD] hover:underline"
              >
                AGB's
              </Link>
            </p>
          </div>
          <CustomButton
            text="Erstellen"
            size="custom"
            custom="text-2xl w-full h-16"
            onClick={createRestaurant}
          />
          <CustomButton
            text="Zurück"
            size="custom"
            custom="self-center min-h-8 w-1/3 text-lg mb-5"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center w-full"></div>
      </div>
      <div className="hidden" ref={mapRef}></div>
      <ToastContainer />
    </div>
  );
};

export default page;
