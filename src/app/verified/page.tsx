"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const Verified = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const result = await fetch(`/api/auth/verify?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.status === 200) {
        router.replace("/login");
      } else {
        router.replace("/verify");
      }
    };
    verify();
  }, []);

  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-2/3 md:w-1/3 md:mr-10">
        <p className="font-bold text-white text-6xl">Verifiziert</p>
        <p className="text-2xl text-center">Erfolgreich verifiziert </p>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Verified />
    </Suspense>
  );
};

export default page;
