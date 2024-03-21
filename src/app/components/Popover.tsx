import React from "react";
import CheckboxLabels from "./CheckboxLabels";

const Popover = ({
  content,
  type,
  item,
}: {
  content: Array<string>;
  type: string;
  item: string;
}) => {
  return (
    <div className="flex flex-col gap-3 justify-center h-screen w-full bg-black/50 md:rounded-xl shadow-lg shadow-black backdrop-filter py-5 backdrop-blur-md md:h-[200px] md:w-1/3 md:mr-10 absolute top-full right-0">
      {content.map((item) => {
        return (
          <div className="">
            {type === "checkbox" ? <CheckboxLabels label={item} /> : null}
            {type === "menu" ? <div>{item}</div> : null}
          </div>
        );
      })}
    </div>
  );
};

export default Popover;
