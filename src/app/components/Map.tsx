"use client";
import React, { useEffect } from "react";
import google from "@/lib/google";

const Map = ({
  setRestaurant,
  setOpenDrawer,
  restaurants,
  mapRef
}: {
  setRestaurant: (restaurant: any) => void;
  setOpenDrawer: (value: boolean) => void;
  restaurants: any;
  mapRef: any;
}) => {

  useEffect(() => {
    const initMap = async () => {
      const { Map, Marker, mapOptions } = await google();

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
