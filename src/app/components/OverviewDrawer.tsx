"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "./Tabs";
import CustomButton from "./CustomButton";
import { IoMdClose } from "react-icons/io";
import { Loader } from "@googlemaps/js-api-loader";

export default function OverviewDrawer({
  openDrawer,
  setOpenDrawer,
  restaurant,
}: {
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  restaurant: any;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Define breakpoint for mobile screens
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4mOnM6YDMVtCl6d8niAbJ1zOh64PErQakw&s"
  );
  const mapRef = React.useRef(null);

  useEffect(() => {
    const getImage = async () => {
      if (!restaurant) return;

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");
      const { PlacesService } = await loader.importLibrary("places");

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
      service.getDetails(
        { placeId: restaurant.place_id },
        (result: any, status: any) => {
          if (status === "OK") {
            setImage(result.photos[0].getUrl());
          }
        }
      );
    };
    getImage();
  }, [restaurant]);

  return (
    <div>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: isMobile ? "100vw" : 410,
            backgroundColor: "#2d2d30",
            color: "white",
            height: "100%",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            justifyItems: "start",
            scrollbarWidth: "none",
          }}
          role="presentation"
        >
          <div>
            <div
              className="w-full overflow-hidden flex justify-center items-center"
              style={{ height: "40vh" }}
            >
              <img src={image} alt="My Image" style={{ width: "100%" }} />
            </div>
            <Tabs restaurant={restaurant} />
          </div>
          <CustomButton
            text={<IoMdClose size={30} />}
            size="custom"
            custom="bg-black/15 backdrop-filter backdrop-blur-md shadow-none hover:bg-black/50 absolute right-4 top-4 "
            onClick={() => {
              setOpenDrawer(false);
            }}
          />
        </Box>
      </Drawer>
      <div className="hidden" ref={mapRef}></div>
    </div>
  );
}
