import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";

const Moreoption = ({ post }) => {
  const { user } = useSelector((store) => store.auth);
  const isAuthor = user?._id?.toString() === post?.author?._id?.toString();
  const {posts} = useSelector(store => store.post);
  const dispatch = useDispatch();

  const deletePostHandler = async () => {
    try {
      const res = await axios.delete(`https://friendschat-7iht.onrender.com/api/v1/post/delete/${post?._id}`, {withCredentials: true});
      console.log('res mila', res);
      if(res.data.success){
        const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="w-100 flex flex-col items-center text-sm text-center px-0 py-4">
        {/* If Author */}
        {isAuthor ? (
          <>
            <span onClick={deletePostHandler} className="w-full cursor-pointer text-[#ED4956] font-bold hover:bg-transparent">
              Delete
            </span>
            <hr className="w-full h-px" />

            <span className="w-full cursor-pointer hover:bg-transparent">
              Edit
            </span>
            <hr className="w-full h-px" />

            <span className="w-full cursor-pointer hover:bg-transparent">
              Hide like count to others
            </span>
            <hr className="w-full h-px" />

            <span className="w-full cursor-pointer hover:bg-transparent">
              Turn off commenting
            </span>
            <hr className="w-full h-px" />
          </>
        ) : (
          <>
            <span className="w-full cursor-pointer text-[#ED4956] font-bold hover:bg-transparent">
              Report
            </span>
            <hr className="w-full h-px" />

            <span className="w-full cursor-pointer text-[#ED4956] font-bold hover:bg-transparent">
              Unfollow
            </span>
            <hr className="w-full h-px" />

            <span className="w-full cursor-pointer hover:bg-transparent">
              Add to favorites
            </span>
            <hr className="w-full h-px" />
          </>
        )}

        {/* Common Options for All Users */}
        <>
          <span className="w-full cursor-pointer hover:bg-transparent">
            Go to post
          </span>
          <hr className="w-full h-px" />

          <span className="w-full cursor-pointer hover:bg-transparent">
            Share to...
          </span>
          <hr className="w-full h-px" />

          <span className="w-full cursor-pointer hover:bg-transparent">
            Copy link
          </span>
          <hr className="w-full h-px" />

          <span className="w-full cursor-pointer hover:bg-transparent">
            Embed
          </span>
          <hr className="w-full h-px" />

          <span className="w-full cursor-pointer hover:bg-transparent">
            About this account
          </span>
          <hr className="w-full h-px" />

          <span className="w-full cursor-pointer hover:bg-transparent">
            Cancel
          </span>
        </>
      </DialogContent>
    </Dialog>
  );
};

export default Moreoption;
