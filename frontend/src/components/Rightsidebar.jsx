import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestedUsers from "./SuggestedUsers";

const Rightsidebar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <div className="w-[320px] px-4 py-6 text-sm text-gray-700 mr-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${user?._id}`}>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="user" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <h1 className="font-semibold">
              <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
            </h1>
            <p className="text-gray-400 text-xs">
              {user?.bio || "Your bio..."}
            </p>
          </div>
        </div>
        <button className="text-blue-500 font-semibold text-xs hover:text-blue-700">
          Switch
        </button>
      </div>

      <SuggestedUsers />
    </div>
  );
};

export default Rightsidebar;
