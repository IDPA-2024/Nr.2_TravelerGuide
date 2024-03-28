"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FaBlackTie } from "react-icons/fa6";
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
      <Button onClick={toggleDrawer(true)}>Prototype Drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: isMobile ? "100vw" : 410,
            backgroundColor: "#374151",
            color: "white",
            height: "100vh",
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
