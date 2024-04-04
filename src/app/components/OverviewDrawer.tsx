"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "./Tabs";
import CustomButton from "./CustomButton";

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
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: isMobile ? "100vw" : 410,
            backgroundColor: "#2d2d30",
            color: "white",
            height: "100%",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            jusitfyItems: "center",
          }}
          role="presentation"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4mOnM6YDMVtCl6d8niAbJ1zOh64PErQakw&s"
            alt="My Image"
            style={{ width: "100%", maxHeight: "30vh" }}
          />
          <Tabs />
        </Box>
      </Drawer>
    </div>
  );
}
