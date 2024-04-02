import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ProfilDrawer = ({ openProfile, setOpenProfile } : { openProfile: boolean, setOpenProfile: (value: boolean) => void }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let profile = {
    __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" version="1.1"><rect fill="#e0e0e0" cx="128" width="256" height="256" cy="128" r="128"/><text x="50%" y="50%" style="color: #000000; line-height: 1;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;" alignment-baseline="middle" text-anchor="middle" font-size="112" font-weight="400" dy=".1em" dominant-baseline="middle" fill="#000000">EL</text></svg>`,
  };

  return (
    <div>
      <Drawer open={openProfile} onClose={()=>{setOpenProfile(false)}}>
        <Box
          sx={{
            width: isMobile ? "100vw" : 410,
            backgroundColor: "#374151",
            color: "white",
            height: "100vh",
          }}
          role="presentation"
        >
          <div
            className="rounded-full w-24 h-24 border border-dotted border-black  overflow-hidden cursor-pointer "
          >
            <div dangerouslySetInnerHTML={profile} className=" w-full h-full" />
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default ProfilDrawer;
