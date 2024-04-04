"use client";
import React from "react";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useTokenContext } from "@/context/useToken";
import { useUserContext } from "@/context/useUser";

const page = () => {
  const router = useRouter();
  const { setToken } = useTokenContext();
  const { setUser } = useUserContext();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    if (email === "" || password === "") {
      toast.error("Bitte fülle alle Felder aus", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setToken(data.token);
        setUser(data.user);
        setTimeout(() => {
          router.push("/");
        }, 10000);
      } else {
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

      router.push("/");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-3/4 md:w-1/3 md:mr-10">
        <p className="font-bold text-white md:h-1/4 text-6xl">Anmelden</p>
        <div className="flex flex-col gap-5 md:h-2/4 justify-center items-center w-full">
          <Input
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <PasswordInput
            placeholder="Passwort"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
        </div>
        <div className="flex flex-col gap-2 justify-center items-center w-full">
          <CustomButton text="Anmelden" size="lg" onClick={handleLogin} />
          <Link
            href="/register"
            className="text-white text-lg md:h-1/4 text-center hover:underline"
          >
            Klicke hier, um zu registrieren
          </Link>
          <Link
            href="/resetPassword"
            className="text-white text-lg md:h-1/4 text-center hover:underline"
          >
            Passwort vergessen
          </Link>
        </div>
        <CustomButton
          text="Gast"
          size="sm"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default page;
