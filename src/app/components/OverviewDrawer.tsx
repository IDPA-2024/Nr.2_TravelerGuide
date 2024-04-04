"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "./Tabs";

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

  return (
    <div>
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: isMobile ? "100vw" : 410,
            backgroundColor: "#2d2d30",
            color: "white",
            height: "100%",
            overflowY: "auto",
          }}
          role="presentation"
        >
          <div className="w-full max-h-64 overflow-hidden flex justify-center items-center">
            <img
              src={
                restaurant
                  ? restaurant.image
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4mOnM6YDMVtCl6d8niAbJ1zOh64PErQakw&s"
              }
              alt="My Image"
              style={{ width: "100%" }}
            />
          </div>
          <Tabs />
        </Box>
      </Drawer>
    </div>
  );
}
