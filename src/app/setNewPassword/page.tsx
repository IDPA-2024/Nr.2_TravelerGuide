"use client";
import React, { useEffect } from "react";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/CustomButton";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  useEffect(() => {
    if (id === null || id === "" || id === undefined) {
      router.push("/");
    }
  }, []);

  // Function to handle password change
  const handleChangePassword = async () => {
    if (password === "" || passwordConfirm === "") {
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
      const result = await fetch("/api/auth/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          newPassword: password,
        }),
      });
      const data = await result.json();
      if (data.status === 200) {
        toast.success("Passwort erfolgreich geändert", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setPassword("");
        setPasswordConfirm("");
      } else {
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
  };

  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:size-11/12 md:w-1/3 md:mr-10">
        <p className="font-bold text-white md:h-1/4 text-6xl text-center">
          Neues Passwort setzen
        </p>
        <div className="flex flex-col gap-5 md:h-2/4 justify-center items-center w-full">
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
        </div>
        <CustomButton
          text="Passwort ändern"
          size="lg"
          onClick={handleChangePassword}
        />
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
