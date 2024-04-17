import React from "react";

// CustomButton component
const CustomButton = ({ text, size, onClick, custom, type, disabled }: { text: any ; size: string, onClick?: () => void, custom?: string, type?: any, disabled?: boolean }) => {
  let actualSize = "";

  // Determine the actual size of the button based on the 'size' prop
  switch (size) {
    case "lg":
      actualSize = "min-h-16 w-3/4 text-3xl"; 
      break;
    case "sm":
      actualSize = "h-10 w-1/3 text-lg "; 
      break;
    case "custom": 
      actualSize = custom || ""; 
      break;
    default:
      break;
  }

  // Render the button component
  return (
    <button
      className={
        " bg-[#0BCAAD] rounded-lg flex justify-center items-center shadow-md shadow-black hover:bg-opacity-50 transition duration-150 ease-in-out cursor-pointer " +
        actualSize
      }
      onClick={onClick}
      type={type || "button"}
      disabled={disabled !== undefined ? disabled : false}
    >
      {text}
    </button>
  );
};

export default CustomButton;