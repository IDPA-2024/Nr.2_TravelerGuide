import React from "react";
import Input from "./Input";
import { Loader } from "@googlemaps/js-api-loader";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const SearchRestaurant = ({
  search,
  setSearch,
  setId,
}: {
  search: string;
  setSearch: (value: string) => void;
  setId: (value: string) => void;
}) => {
  const [searchResults, setSearchResults] = React.useState<Array<any>>([]);
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    const searchAPI = async () => {
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
      if (!search) {
        setSearchResults([]);
        return;
      }
      service.textSearch(
        {
          query: search,
          bounds: {
            north: 47.559815,
            south: 47.469519,
            east: 8.827701,
            west: 8.653782,
          },
        },
        (results: Array<{ types: Array<string> }>, status: any) => {
          if (status === "OK") {
            let searchResults = results.filter(
              (x) => x.types.includes("restaurant") || x.types.includes("food")
            );
            let searchResultsFormatted = searchResults.map((result: any) => {
              return {
                label: result.name + ", " + result.formatted_address,
                place_id: result.place_id,
              };
            });
            setSearchResults(searchResultsFormatted);
          }
        }
      );
    };
    searchAPI();
  }, [search]);
  return (
    <>
      <Autocomplete
        onChange={(e, value) => {
          if (!value) {
            return;
          }
          setSearch(value.label);
          setId(value.place_id);
        }}
        disablePortal
        id="combo-box-demo"
        options={searchResults}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Name des Restaurant"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
        )}
      />
      <div className="hidden" ref={mapRef}></div>
    </>
  );
};

export default SearchRestaurant;
