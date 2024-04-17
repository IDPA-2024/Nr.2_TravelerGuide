import React from "react";

const Comment = ({ comment }: { comment: any }) => {
  let profile = {
    __html: comment
      ? comment.user_image
      : `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" id="user"><path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"></path></svg>`,
  };
  return (
    <div className="flex flex-row items-start border-t gap-3 border-t-white pt-4">
      <div className="rounded-full border border-dotted border-black  overflow-hidden cursor-pointer max-h-10 w-10">
        <div
          dangerouslySetInnerHTML={profile}
          className={" w-full h-full bg-gray-300 size-5"}
        />
      </div>
      <div className="relative w-full">
        <h1 className="font-bold text-md">{comment.user_name}</h1>
        <p className="text-sm">{comment.text}</p>
        <p className="text-xs text-gray-300 absolute top-0 right-0 ">{new Date(comment.created_at).getDate() + "." + (new Date(comment.created_at).getMonth() < 10 ? "0" +new Date(comment.created_at).getMonth() : new Date(comment.created_at).getMonth() ) + "." + new Date(comment.created_at).getFullYear()}</p>
      </div>
    </div>
  );
};

export default Comment;
