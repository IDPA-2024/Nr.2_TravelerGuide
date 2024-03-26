"use client";
import React from "react";
import CustomButton from "../components/CustomButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  return (
        <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
          <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-2/3 md:w-1/3 md:mr-10">
            <p className="font-bold text-white text-6xl">Verifizieren</p>
            <p className="text-2xl text-center">
              Es wurde eine Email gesendet. Bitte verifizieren Sie sich
            </p>
            <CustomButton text="Erneut senden" size="lg" onClick={() => {}} />
            <CustomButton text="Anmelden" size="sm" onClick={() => {router.push("/login")}} />
          </div>
        </div>
  );
};

export default page;