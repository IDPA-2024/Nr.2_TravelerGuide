import React, { InputHTMLAttributes } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";

const InputPassword = ({ value, onChange, placeholder, custom, customFont }: {value:string, onChange: (e:any) => void, placeholder:string, custom?:string, customFont?:string }) => {
  const [show, setShow] = React.useState(false);
  let actualSize = custom || "";
  let fontSize = customFont || "";
  return (
    <div className={" flex flex-row gap-0 h-20 w-3/4 justify-center items-center bg-black/50 rounded-lg shadow-md shadow-black md:h-1/2 focus-within:border-b-[#0BCAAD] focus-within:border-b-2 focus-within:shadow-none md:pt-2 md:pb-2 " + actualSize}>
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={" text-white text-xl md:text-3xl outline-none border-none p-0 bg-transparent focus:outline-transparent focus:border-transparent flex-grow w-full ml-4 " + fontSize }
        placeholder={placeholder}
      />
      {show ? (
        <RiEyeCloseLine
          className="text-white text-xl hover:opacity-50 cursor-pointer md:h-1/2 mr-4 "
          onClick={() => setShow(!show)}
          size={48}
        />
      ) : (
        <RiEyeLine
          className="text-white text-xl hover:opacity-50 cursor-pointer md:h-1/2 mr-4 "
          onClick={() => setShow(!show)}
          size={48}
        />
      )}
    </div>
  );
};

export default InputPassword;
