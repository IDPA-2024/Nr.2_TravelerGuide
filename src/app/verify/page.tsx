"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 0) return 0;
        return prev - 1;
      });
      if (countdown === 0) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [setCountdown, countdown]);

  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-2/3 md:w-1/3 md:mr-10">
        <p className="font-bold text-white text-6xl">Verifizieren</p>
        <p className="text-2xl text-center">
          Es wurde eine Email gesendet. Bitte verifizieren Sie sich
        </p>
        <CustomButton
          text={
            "Erneut senden " + (countdown > 0 ? "in " + countdown + "s" : "")
          }
          size="custom"
        custom={countdown === 0 ?"min-h-16 w-3/4 text-3xl": "min-h-16 w-3/4 text-3xl cursor-not-allowed hover:bg-opacity-100 opacity-50"}
          disabled={countdown > 0}
          onClick={() => {
            setCountdown(30);
            fetch("/api/auth/resendVerify", {
              method: "POST",
              body: JSON.stringify({ email: email }),
              headers: {
                "Content-Type": "application/json",
              },
            });
          }}
        />
        <CustomButton
          text="Anmelden"
          size="sm"
          onClick={() => {
            router.push("/login");
          }}
        />
      </div>
    </div>
  );
};

export default page;
