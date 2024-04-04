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
      const { Marker } = await loader.importLibrary("marker");

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

      const marker = new Marker({
        position,
        map,
        title: "Hello World!",
        label: "H",
      });
      marker.addListener("click", () => {
        alert("Hello World!");
      });
      return map;
    };
    initMap();
  }, []);
  return <div className="w-screen h-screen" ref={mapRef} />;
};

export default Map;
