import React from 'react';
import Comment from '../Comment';


const Comments = () => {
    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-center font-bold text-2xl">RestaurantName</h1>
            <Comment/>
            <Comment/>
        </div>
    );
};

export default Comments;