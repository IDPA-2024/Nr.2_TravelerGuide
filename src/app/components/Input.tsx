import React, { InputHTMLAttributes } from "react";

const InputPassword = ({ value, onChange, placeholder }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
      <input
        value={value}
        onChange={onChange}
        className="text-white text-3xl outline-none focus:outline-none flex-grow pl-4 flex flex-row gap-0 h-20 justify-center w-3/4 items-center bg-black/50 rounded-lg shadow-md shadow-black md:h-1/2 focus:border-b-[#0BCAAD] focus:border-b-2 focus:shadow-none"
        placeholder={placeholder}
      />

  );
};

export default InputPassword;
