import React from "react";
let profile = {
  __html: `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" id="user"><path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"></path></svg>`,
};

const Comment = () => {
  return (
    <div className="flex flex-row items-start gap-3">
      <div className="rounded-full border border-dotted border-black  overflow-hidden cursor-pointer max-h-56 w-56">
        <div
          dangerouslySetInnerHTML={profile}
          className={" w-full h-full bg-gray-300 p-1 size-5"}
        />
      </div>
      <div>
        <h1 className="font-bold text-xl">Person</h1>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum.
        </p>
      </div>
    </div>
  );
};

export default Comment;
