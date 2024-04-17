import React from "react";

const Input = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e:any) => void;
  placeholder: string
}) => {
  return (
    <div className="flex flex-row gap-0 h-20 w-3/4 justify-center items-center bg-black/50 rounded-lg shadow-md shadow-black md:h-1/2 focus-within:border-b-[#0BCAAD] focus-within:border-b-2 focus-within:shadow-none md:pt-2 md:pb-2">
      <input
        value={value}
        onChange={onChange}
        className="text-white text-xl md:text-3xl outline-none bg-transparent focus:outline-none flex-grow w-full ml-4 "
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
