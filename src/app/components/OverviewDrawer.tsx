"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "./Tabs";

export default function OverviewDrawer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Define breakpoint for mobile screens

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <button className="absolute z-40 text-black" onClick={toggleDrawer(true)}>Prototype Button</button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: isMobile ? "100%" : 410,
            backgroundColor: "#2d2d30",
            color: "white",
            height: "100%",
            overflowY: "auto",
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
