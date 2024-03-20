"use client";
import React from "react";
import Button from "../components/Button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const email = searchParams.get("email");
  const [state, setState] = React.useState("email");
  const router = useRouter();

  React.useEffect(() => {
    if (id !== null || id !== undefined && email === null) {
      setState("id");
      //TODO: API request
    } else if (email !== null || email !== undefined) {
      setState("email");
    } else {
      setState("email");
    }
  });

  return (
    <>
      {state === "email" && (
        <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
          <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-2/3 md:w-1/3 md:mr-10">
            <p className="font-bold text-white text-6xl">Verifizieren</p>
            <p className="text-2xl text-center">
              Es wurde eine Email gesendet. Bitte verifizieren Sie sich
            </p>
            <Button text="Erneut senden" size="lg" onClick={() => {}} />
            <Button text="Anmelden" size="sm" onClick={() => {router.push("/login")}} />
          </div>
        </div>
      )}

      {state === "id" && (
        <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
          <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-2/3 md:w-1/3 md:mr-10">
            <p className="font-bold text-white text-6xl">Verifizieren</p>
            <p className="text-2xl text-center">Erfolgreich verifiziert </p>
            <Button text="Anmelden" size="lg" onClick={() => {router.push("/login")}} />
          </div>
        </div>
      )}
    </>
  );
};

export default page;
