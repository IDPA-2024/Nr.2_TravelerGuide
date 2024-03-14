"use client";
import React from "react";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from 'next/link';


const page = () => {
  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-2/3 md:w-1/3 md:mr-10">
        <p className="font-bold text-white md:h-1/4 text-6xl">Anmelden</p>
        <div className="flex flex-col gap-5 md:h-2/4 justify-center items-center w-full">
          <Input placeholder="Email" />
          <PasswordInput placeholder="Passwort" />
        </div>
        <Button button="Anmelden" size="lg"/>
        <Link href="/register" className="text-white text-lg md:h-1/4 text-center">Klicke hier, um zu registrieren?</Link>
      </div>
    </div>
  );
};

export default page;
