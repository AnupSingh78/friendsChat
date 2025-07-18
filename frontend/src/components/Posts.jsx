import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const postState = useSelector((store) => store.post);
  const posts = postState?.posts || [];

  return (
    <div className="flex flex-col items-center gap-4 mt-4">
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
      
    </div>
  );
};

export default Posts;
