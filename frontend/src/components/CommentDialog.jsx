import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "react-router-dom";
import Moreoption from "./Moreoption";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost, posts } = useSelector((store) => store.post);
  const [comment, setComment] = useState([]);

  const { user } = useSelector((store) => store.auth); // you already have this in Post.jsx

  const [liked, setLiked] = useState(false);
  const [postLike, setPostLike] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedPost && user) {
      setLiked(selectedPost.likes.includes(user?._id));
      setPostLike(selectedPost.likes.length);
      setComment(selectedPost.comments || []);
    }
  }, [selectedPost, user]);

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axios.get(
        `https://friendschat-7iht.onrender.com/api/v1/post/${selectedPost._id}/${action}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user._id)
                  : [...p.likes, user._id],
              }
            : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(
        `https://friendschat-7iht.onrender.com/api/v1/post/${selectedPost?._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === selectedPost?._id
            ? { ...p, comments: updatedCommentData }
            : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 h-screen w-screen sm:h-[93vh] sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] sm:rounded-lg flex flex-col sm:flex-row">
        <div className="flex flex-1">
          <div className="w-1/2 bg-black">
            <img
              src={selectedPost?.image}
              alt="post_img"
              className="w-full h-full object-contain rounded-l-lg"
            />
          </div>
          <div className="sm:w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-2">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="font-semibold text-xs">
                    {selectedPost?.author.username}
                  </Link>
                  {/* <span className="text-gray-600 text-sm">Bio here...</span> */}
                </div>
              </div>
              <Moreoption />
            </div>
            <hr />
            <div className="flex-1 overflow-y-auto max-h-full p-2 text-sm">
              {comment.map((comment) => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </div>
            <hr />
            <div className="flex items-center justify-between my-2 p-1">
              <div className="flex items-center gap-3">
                {liked ? (
                  <FaHeart
                    onClick={likeOrDislikeHandler}
                    size={"24px"}
                    className="cursor-pointer text-red-600"
                  />
                ) : (
                  <FaRegHeart
                    onClick={likeOrDislikeHandler}
                    size={"24px"}
                    className="cursor-pointer hover:text-gray-600"
                  />
                )}

                <MessageCircle className="cursor-pointer hover:text-gray-600" />
                <Send className="cursor-pointer hover:text-gray-600" />
              </div>
              <Bookmark className="cursor-pointer hover:text-gray-600" />
            </div>

            <span className="font-medium block mb-2 pl-2">
              {postLike} likes
            </span>

            <hr />

            <div className="flex items-center text-sm justify-center m-2 p-1">
              <input
                type="text"
                placeholder="Add a comment..."
                value={text}
                onChange={changeEventHandler}
                className="outline-none text-sm w-full"
              />
              {(text && (
                <span
                  onClick={sendMessageHandler}
                  className="text-[#38Adf8] cursor-pointer"
                >
                  Post
                </span>
              )) || <span className="text-[#c3e4f8]">Post</span>}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
