import React from "react";

const Button = ({ text, size, onClick }: { text: string; size: string, onClick: () => void }) => {
  let actualSize = "";
  switch (size) {
    case "lg":
      actualSize = "min-h-16 w-3/4 text-3xl";
      break;
    case "sm":
      actualSize = "h-10 w-1/3 text-lg";
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
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;