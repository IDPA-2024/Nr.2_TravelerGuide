import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useUserContext } from "@/context/useUser";
import PasswordInput from "./PasswordInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomButton from "./CustomButton";
import { IoMdClose } from "react-icons/io";

const ProfilDrawer = ({
  openProfile,
  setOpenProfile,
}: {
  openProfile: boolean;
  setOpenProfile: (value: boolean) => void;
}) => {
  // Define state variables
  // Get Context
  const { user } = useUserContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  // Function to handle password change
  const handleChangePassword = async () => {
    if (password === "" || passwordConfirm === "") {
      setOpenProfile(false);
      toast.error("Bitte fülle alle Felder aus", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (password.length < 6) {
      setOpenProfile(false);
      toast.error("Passwort muss mindestens 6 Zeichen lang sein", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (password !== passwordConfirm) {
      setOpenProfile(false);
      toast.error("Passwörter stimmen nicht überein", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      if (user !== null) {
        const result = await fetch("/api/auth/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user._id,
            newPassword: password,
          }),
        });
        const data = await result.json();
        if (data.status === 200) {
          setPassword("");
          setPasswordConfirm("");
          setOpenProfile(false);
          setTimeout(() => {
            toast.success("Passwort erfolgreich geändert", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }, 50);
        } else {
          setOpenProfile(false);
          toast.error("Fehler beim ändern des Passworts", {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      }
    }
  };

  let profile = {
    __html: user ? user.image : "",
  };

  return (
    <div
      style={{
        height: "--webkit-fill-available",
      }}
    >
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
            height: "100%",
            overflowY: "auto",
          }}
          role="presentation"
        >
          <div className="h-full w-full flex flex-col justify-center items-center p-10 gap-8">
            <div className="h-full w-full items-center justify-center flex flex-col gap-4">
              <div className="rounded-full w-44 h-44 md:w-36 md:h-36 border border-dotted border-black overflow-hidden cursor-pointer border-b ">
                <div
                  dangerouslySetInnerHTML={profile}
                  className=" w-full h-full"
                />
              </div>
              <p className="font-bold text-3xl md:text-xl">
                Hallo {user ? user.name : ""}
              </p>
            </div>

            <div className="text-xl gap-3 border-t border-t-white pt-8 w-full items-center justify-center ">
              <p className="text-lg font-bold">Deine Email</p>
              {user ? user.email : ""}
            </div>
            <form
              className="flex flex-col gap-5 w-full border-t border-t-white pt-8 text-start  items-center justify-center"
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
            >
              <p className="font-bold text-xl">Passwort ändern</p>
              <PasswordInput
                custom="w-full max-h-12"
                customFont="placeholder:text-lg text-lg"
                placeholder="Passwort"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <PasswordInput
                custom="w-full max-h-12 "
                customFont="placeholder:text-lg text-lg"
                placeholder="Passwort bestätigen"
                value={passwordConfirm}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
              <CustomButton
                text="Ändern"
                size="custom"
                custom=" bg-[#0BCAAD] rounded-lg flex justify-center h-10 w-2/3 items-center shadow-md shadow-black hover:bg-opacity-50 transition duration-150 ease-in-out cursor-pointer "
                type="submit"
              />
            </form>
            <CustomButton
              text={<IoMdClose size={30} />}
              size="custom"
              custom="bg-black/15 backdrop-filter backdrop-blur-md shadow-none hover:bg-black/50 absolute right-4 top-4 "
              onClick={() => {
                setOpenProfile(false);
              }}
            />
          </div>
        </Box>
      </Drawer>

      <ToastContainer />
    </div>
  );
};

export default ProfilDrawer;
