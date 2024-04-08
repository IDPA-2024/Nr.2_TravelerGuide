"use client";
import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useRestaurants } from "@/hooks/useRestaurants";

const Map = ({
  setRestaurant,
  setOpenDrawer,
  restaurants,
}: {
  setRestaurant: (restaurant: any) => void;
  setOpenDrawer: (value: boolean) => void;
  restaurants: any;
}) => {
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
      if (!restaurants) return;
      restaurants.forEach(async (restaurant: any) => {
        const marker = new Marker({
          position: { lat: restaurant.lat, lng: restaurant.lng },
          map: map,
          title: restaurant.name,
          label: restaurant.name.charAt(0),
        });
        marker.addListener("click", () => {
          setRestaurant(restaurant);
          setOpenDrawer(true);
        });
      });

      return map;
    };
    initMap();
  }, [restaurants]);

  return <div className="w-screen h-screen" ref={mapRef} />;
};

export default Map;
