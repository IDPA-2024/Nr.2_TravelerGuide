import React, { useEffect, useState } from "react";
import Comment from "../Comment";
import CustomButton from "../CustomButton";

const Comments = ({ restaurant }: { restaurant: any }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/comment?id=${restaurant._id}`);
      const data = await res.json();
      setComments(data.data);
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <form>
          <div className="flex items-center px-3 py-2 rounded-lg bg-black/25">
            <textarea
              id="chat"
              rows={1}
              className="caret-white block mx-4 p-2.5 w-full text-sm text-gray-900 bg-transparent border-b-white border-b focus:outline-none focus:border-b-[#0BCAAD]"
              placeholder="Schreibe einen Kommentar..."
            ></textarea>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-white transition duration-150 ease-in-out rounded-full cursor-pointer hover:text-[#0BCAAD]"
              onClick={(e) => {}}
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns=" http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
      {comments.map((comment: any) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
