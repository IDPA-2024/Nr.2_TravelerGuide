"use client";
import React from "react";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import Link from "next/link";

const page = () => {
  const handleSend = () => {
    console.log("Login");
  };

  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-3/4 md:w-1/3 md:mr-10">
        <p className="font-bold text-white md:h-1/4 text-center text-5xl">
          Passwort zurücksetzen
        </p>
        <div className="flex flex-col gap-5 md:h-1/3 justify-center items-center w-full">
          <Input placeholder="Email" onChange={() => {}} value={""} />
          <CustomButton text="Anmelden" size="lg" onClick={handleSend} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-white text-lg md:h-1/4 text-center hover:underline">
            Email erneut senden
          </div>
          <Link
            href="/login"
            className="text-white text-lg md:h-1/4 text-center hover:underline"
          >
            Hier klicken, um anzumelden
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
