import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUserContext } from "@/context/useUser";

const ProfilDrawer = ({
  openProfile,
  setOpenProfile,
}: {
  openProfile: boolean;
  setOpenProfile: (value: boolean) => void;
}) => {
  const { user } = useUserContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  let profile = {
    __html: user ? user.image : "",
  };

  return (
    <div>
      <Drawer
        open={openProfile}
        onClose={() => {
          setOpenProfile(false);
        }}
      >
        <Box
          sx={{
            width: isMobile ? "100vw" : 410,
            backgroundColor: "#2d2d30",
            color: "white",
            height: "100vh",
          }}
          role="presentation"
        >
          <div className="rounded-full w-24 h-24 border border-dotted border-black  overflow-hidden cursor-pointer ">
            <div dangerouslySetInnerHTML={profile} className=" w-full h-full" />
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default ProfilDrawer;
