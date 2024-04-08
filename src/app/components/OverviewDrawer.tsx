"use client";
import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs from "./Tabs";
import CustomButton from "./CustomButton";
import { IoMdClose } from "react-icons/io";


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
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            justifyItems: "start",
            scrollbarWidth: "none",
          }}
          role="presentation"
        ><div>
          
            <div className="w-full overflow-hidden flex justify-center items-center" style={{height: "40vh"}}>
              <img
                src={
                  restaurant
                    ? restaurant.image
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH4mOnM6YDMVtCl6d8niAbJ1zOh64PErQakw&s"
                }
                alt="My Image"
                style={{ width: "100%",}}
              />
            </div>
            <Tabs restaurant={restaurant} />
        </div>
         <CustomButton text={<IoMdClose size={30} />} size="custom" custom="bg-black/15 backdrop-filter backdrop-blur-md shadow-none hover:bg-black/50 absolute right-4 top-4 " onClick={() => {setOpenDrawer(false)}} />
        </Box>
      </Drawer>
    </div>
  );
}
