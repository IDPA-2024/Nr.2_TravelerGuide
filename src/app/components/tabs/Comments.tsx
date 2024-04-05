import React, { useEffect, useState } from "react";
import Comment from "../Comment";

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
      <h1 className="text-center font-bold text-2xl">{restaurant.name}</h1>
      {comments.map((comment: any) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
