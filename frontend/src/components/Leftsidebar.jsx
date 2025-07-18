import {
  Camera,
  Clapperboard,
  Compass,
  Heart,
  Home,
  LogOut,
  MessageCircleMore,
  PlusSquare,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const Leftsidebar = () => {
  const navigate = useNavigate();

  const { likeNotification } = useSelector(
    (store) => store.realTimeNotification
  );

  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === "Logout") logoutHandler();
    else if (textType === "Create") setOpen(true);
    else if (textType === "Profile") navigate(`/profile/${user?._id}`);
    else if (textType === "Home") navigate("/");
    else if (textType === "Messages") navigate("/chat");
  };

  const sidebarItems = [
    { icon: <Home className="w-6 h-6" />, text: "Home" },
    { icon: <Search className="w-6 h-6" />, text: "Search" },
    { icon: <Compass className="w-6 h-6" />, text: "Explore" },
    { icon: <Clapperboard className="w-6 h-6" />, text: "Reels" },
    { icon: <MessageCircleMore className="w-6 h-6" />, text: "Messages" },
    {
      icon: (
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Heart className="w-6 h-6" />
          {likeNotification.length > 0 && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size="icon"
                  className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full text-xs px-0 py-0 bg-red-500 text-white hover:bg-red-400 hover:text-white cursor-pointer"
                >
                  {likeNotification.length}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 ml-11">
                <div className="flex flex-col gap-2">
                  {likeNotification.map((notification, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={notification.userDetails?.profilePicture}
                          alt={notification.userDetails?.username}
                        />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <p className="text-sm">
                        <span className="font-semibold">
                          {notification.userDetails?.username}
                        </span>{" "}
                        liked your post
                      </p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      ),
      text: "Notifications",
    },

    { icon: <PlusSquare className="w-6 h-6" />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut className="w-6 h-6" />, text: "Logout" },
  ];

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-18 lg:w-62 transition-all h-screen bg-white">
      <div className="flex flex-col gap-6 py-8">
        {/* Logo */}
        <div className="flex items-center lg:justify-start justify-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300">
          {/* Camera Icon - only show on small screens */}
          <div className="w-6 h-6 flex justify-center items-center lg:hidden">
            <Camera
              className="w-6 h-6"
              onClick={() => sidebarHandler("Home")}
            />
          </div>

          {/* Cursive Logo Text - only show on large screens */}
          <span className="hidden ml-2 lg:inline text-3xl font-semibold italic font-serif tracking-tight">
            friendsChat
          </span>
        </div>

        {/* Sidebar Items */}
        <div className="flex flex-col gap-4">
          {sidebarItems.map((item, index) => (
            <div
              onClick={() => sidebarHandler(item.text)}
              key={index}
              className="flex items-center lg:justify-start justify-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-300 transition-all"
            >
              <div className="w-6 h-6 flex justify-center items-center">
                {item.icon}
              </div>
              <span className="hidden lg:inline text-sm font-medium">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default Leftsidebar;
