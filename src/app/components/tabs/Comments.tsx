import React, { use, useEffect, useState } from "react";
import Comment from "../Comment";
import { useTokenContext } from "@/context/useToken";
import { useUserContext } from "@/context/useUser";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const Comments = ({ restaurant }: { restaurant: any }) => {
  //Define state variables
  const [comments, setComments] = useState([]); 
  const { token, setToken } = useTokenContext();
  const { user, setUser } = useUserContext(); 
  const router = useRouter();
  const [newComment, setNewComment] = useState(""); 

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`/api/comment?id=${restaurant._id}`); // Fetch comments for the given restaurant ID
      const data = await res.json(); // Parse response as JSON
      data.data.sort((a: any, b: any) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime(); // Sort comments by creation date
      });
      setComments(data.data); // Update comments state with fetched data
    };
    getData(); // Call the getData function when the component mounts
  }, []);

  let profile = {
    __html: user
      ? user.image
      : `<svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" id="user"><path d="M256 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96z"></path></svg>`,
  };

  const createComment = async (e: any) => {
    e.preventDefault();
    if (user === null) {
      return;
    }
    const res = await fetch(`/api/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        content: newComment,
        restaurant_id: restaurant._id,
        user_id: user._id,
      }),
    });
    const data = await res.json();
    if (data.message === "ok") {
      const updatedCommentsRes = await fetch(
        `/api/comment?id=${restaurant._id}`
      );
      const updatedCommentsData = await updatedCommentsRes.json();
      setComments(updatedCommentsData.data); // Update comments state with newly created comment
      setNewComment(""); // Clear the new comment input field
      toast.success("Kommentar erfolgreich erstellt", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      console.log(data.message)
      toast.error("Fehler beim erstellen des Kommentars", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const handleRedirect = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col gap-10">
      {token !== null && (
        <form>
          <div className="flex items-center px-3 py-2 rounded-lg bg-black/25">
            <div className="rounded-full w-12 h-auto border border-dotted border-black overflow-hidden cursor-pointer  ">
              <div
                dangerouslySetInnerHTML={profile}
                className={" w-full h-full bg-gray-300 " + (user ? "" : "p-1")}
              />
            </div>
            <textarea
              id="chat"
              rows={1}
              className="caret-white block mx-4 p-2.5 overflow-hidden w-full text-sm text-white bg-transparent focus:outline-none focus:border-b-[#0BCAAD]"
              placeholder="Schreibe einen Kommentar..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-white transition duration-150 ease-in-out rounded-full cursor-pointer hover:text-[#0BCAAD]"
              onClick={createComment}
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
      )}
      {token === null && (
        <div
          className="text-center justify-between flex items-center px-3 py-2 rounded-lg bg-black/25 cursor-pointer hover:bg-black/50 transition duration-150 ease-in-out "
          onClick={handleRedirect}
        >
          Schreibe einen Kommentar...
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-white "
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
      )}
      {comments.map((comment: any) => (
        <Comment key={comment._id} comment={comment} /> // Render each comment component
      ))}
      <ToastContainer /> 
    </div>
  );
};

export default Comments;
