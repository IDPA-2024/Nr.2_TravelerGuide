"use client";
import React, { useEffect } from "react";
import google from "@/lib/google";

const Map = ({
  setRestaurant,
  setOpenDrawer,
  restaurants,
  mapRef,
}: {
  setRestaurant: (restaurant: any) => void;
  setOpenDrawer: (value: boolean) => void;
  restaurants: any;
  mapRef: any;
}) => {
  useEffect(() => {
    const initMap = async () => {
      const { Map, Marker, mapOptions, Point } = await google();

      const school = {
        filePath: "/school.svg",
        width: 36,
        height: 36,
      };
      const map = new Map(mapRef.current, mapOptions);
      const kbw = new Marker({
        position: { lat: 47.49548613940601, lng: 8.730583365510228 },
        map: map,
        title: "Kantonsschule Büelrain Winterthur",
        icon: {
          anchor: new Point(school.width / 2, school.height / 2),
          url: school.filePath,
        },
      });
      const krw = new Marker({
        position: { lat: 47.50520867288037, lng: 8.736993698705605 },
        map: map,
        title: "Kantonsschule Rychenberg Winterthur",
        icon: {
          anchor: new Point(school.width / 2, school.height / 2),
          url: school.filePath,
        },
      });
      const klw = new Marker({
        position: { lat: 47.504326919378066, lng: 8.739798563563818 },
        map: map,
        title: "Kantonsschule Im Lee",
        icon: {
          anchor: new Point(school.width / 2, school.height / 2),
          url: school.filePath,
        },
      });
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
