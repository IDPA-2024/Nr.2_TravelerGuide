import React from "react";

const Button = ({ text, size }: { text: string; size: string }) => {
  let actualSize = "";
  switch (size) {
    case "lg":
      actualSize = "h-24 w-3/4 text-3xl";
      break;
    case "sm":
      actualSize = "h-10 w-2/4 text-lg";
      break;
    default:
      break;
  }
  return (
    <div
      className={
        " bg-[#0BCAAD] rounded-lg flex justify-center items-center shadow-md shadow-black hover:bg-opacity-50 transition duration-150 ease-in-out cursor-pointer " +
        actualSize
      }
    >
      {text}
    </div>
  );
};

export default Button;