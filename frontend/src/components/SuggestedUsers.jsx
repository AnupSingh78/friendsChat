import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const SuggestedUsers = () => {
  const { suggestedUsers } = useSelector((store) => store.auth);
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-gray-400 font-semibold text-sm">
          Suggested for you
        </h1>
        <span className="text-xs font-semibold cursor-pointer hover:text-gray-600">
          See All
        </span>
      </div>

      {suggestedUsers.slice(0, 5).map((user) => (
        <div key={user?._id} className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Link to={`/profile/${user?._id}`}>
              <Avatar className="w-9 h-9">
                <AvatarImage src={user?.profilePicture} alt="user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link
                to={`/profile/${user?._id}`}
                className="font-semibold text-sm"
              >
                {user?.username}
              </Link>
              <p className="text-xs text-gray-400">
                {user?.bio || "Bio here..."}
              </p>
            </div>
          </div>
          <button className="text-blue-500 font-semibold text-xs hover:text-blue-700">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default SuggestedUsers;
