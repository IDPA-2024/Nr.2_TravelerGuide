"use client";
import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = () => {
  const mapRef = React.useRef(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      const position = {
        lat: 47.500229,
        lng: 8.72875,
      };

      const mapOptions = {
        center: position,
        zoom: 16,
        mapId: "1d3709bffc5c137f",
      };

      const map = new Map(mapRef.current, mapOptions);
      return map;
    };
    initMap();
  }, []);
  return <div className="w-screen h-[calc(100vh+3rem)] -mt-12" ref={mapRef} />;
};

export default Map;
