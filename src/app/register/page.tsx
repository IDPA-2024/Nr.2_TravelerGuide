"use client";
import React from "react";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import Link from "next/link";
import Checkbox from "@mui/material/Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [checked, setChecked] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleRegister = async () => {
    setLoading(true);
    if (email === "" || password === "" || passwordConfirm === "") {
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
      setTimeout(() => {
        setLoading(false);
      }, 500);
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
      setTimeout(() => {
        setLoading(false);
      }, 500);
      toast.error("Passwörter stimmen nicht überein", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (checked == false) {
      setTimeout(() => {
      setLoading(false);
      }, 500);
      toast.error("Bitte akzeptiere die AGB's", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setTimeout(() => {
        setLoading(false);
        }, 500);
          router.push("/verify?email=" + email);
      } else {
        setTimeout(() => {
        setLoading(false);
        }, 500);
        toast.error(data.message, {
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
    setChecked(false);
    setPassword("");
    setPasswordConfirm("");
    setEmail("");
  };

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
      {loading && (
        <div className="absolute top-0 left-0 bottom-0 right-0 z-10 bg-[#0BCAAD] flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:size-11/12 md:w-1/3 md:mr-10">
        <p className="font-bold text-white md:h-1/4 text-6xl">Registrieren</p>
        <div className="flex flex-col gap-5 md:h-2/4 justify-center items-center w-full">
          <Input
            value={email}
            placeholder="Schul-Mail"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <PasswordInput
            placeholder="Passwort"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <PasswordInput
            placeholder="Passwort bestätigen"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />
          <div className="flex items-center justify-center ">
            <Checkbox
              onChange={handleChecked}
              sx={{
                color: "white",
                "&.Mui-checked": {
                  color: "#0BCAAD",
                },
              }}
            />
            <p>
              Ich akzeptiere die{" "}
              <Link
                href="/privacyPolicy"
                className="text-[#0BCAAD] hover:underline"
              >
                AGB's
              </Link>
            </p>
          </div>
        </div>
        <CustomButton text="Registrieren" size="lg" onClick={handleRegister} />
        <Link
          href="/login"
          className="text-white text-lg md:h-1/4 text-center hover:underline"
        >
          Klicke hier, um anzumelden
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
