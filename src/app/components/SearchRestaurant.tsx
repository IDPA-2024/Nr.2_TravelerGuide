import React from "react";
import Input from "./Input";
import { Loader } from "@googlemaps/js-api-loader";

const SearchRestaurant = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const [searchResults, setSearchResults] = React.useState<Array<any>>([]);
  const mapRef = React.useRef(null);
  const [showResults, setShowResults] = React.useState(false);

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
            setSearchResults(searchResults);
            console.log(searchResults);
          }
        }
      );
    };
    searchAPI();
  }, [search]);
  return (
    <div className="relative w-3/4 flex justify-center items-center">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-white text-xl outline-none focus:outline-none w-3/4 flex-grow bg-black/50 rounded-lg shadow-md shadow-black focus-within:border-b-[#0BCAAD] focus-within:border-b-2 focus-within:shadow-none md:pt-2 md:pb-2 pl-2 relative"
        placeholder="Name des Restaurants"
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      />
      <div
        className={
          " absolute top-full left-0 right-0 bg-black max-h-20 overflow-scroll z-10" +
          (showResults ? " block" : " hidden")
        }
      >
        {searchResults.map((result: any) => (
          <div
            key={result.place_id}
            onClick={() => {
              setSearch(result.name);
            }}
            className="p-2 hover:bg-gray-700 cursor-pointer"
          >
            <p>
              {result.name}, {result.formatted_address}
            </p>
          </div>
        ))}
      </div>
      <div className="hidden" ref={mapRef}></div>
    </div>
  );
};

export default SearchRestaurant;
