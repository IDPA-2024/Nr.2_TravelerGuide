"use client";
import React from "react";
import PasswordInput from "../components/PasswordInput";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "next/link";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const page = () => {
  const [checked, setChecked] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <div className="bg-bg bg-cover h-screen w-screen flex justify-center items-center md:justify-end">
      <div className="flex flex-col gap-20 md:gap-10 justify-center items-center w-full h-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-5/6 md:w-1/3 md:mr-10">
        <p className="font-bold text-white md:h-1/4 text-6xl">Anmelden</p>
        <div className="flex flex-col gap-5 md:h-2/4 justify-center items-center w-full">
          <Input
            value={email}
            placeholder="Schul-Mail"
            onChange={(e)=> {setEmail(e.target.value)}}
          />
          <PasswordInput placeholder="Passwort" value={password} onChange={(e) => {setPassword(e.target.value)}} />
          <PasswordInput placeholder="Passwort bestätigen" value={passwordConfirm} onChange={(e) => {setPasswordConfirm(e.target.value)}} />
          <FormControlLabel
            control={<Checkbox />}
            label="Ich akzeptiere die AGB's"
          />
        </div>
        <Button button="Registrieren" size="lg"  />
        <Link href="/login" className="text-white text-lg md:h-1/4 text-center">
          Klicke hier, um anzumelden?
        </Link>
      </div>
    </div>
  );
};

export default page;
