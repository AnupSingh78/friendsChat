import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import { AtSign, Heart, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

const Profile = () => {
  const userId = useParams().id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState("posts");

  const { userProfile, user } = useSelector((store) => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = true;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayedPost =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;

  return (
    <div className="flex max-w-5xl justify-center mx-auto pl-10 px-4 pt-10">
      <div className="flex flex-col gap-20 p-8">
        <div className="flex gap-10 items-start">
          <section className="flex items-center justify-center mt-4">
            <Avatar className="h-36 w-36">
              <AvatarImage
                src={userProfile?.profilePicture}
                alt="profilePhoto"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </section>
          <section>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 text-xl font-light">
                <span className="text-2xl">{userProfile?.username}</span>
                {isLoggedInUserProfile ? (
                  <>
                    <Link to="/account/edit">
                      <Button
                        variant="secondary"
                        className="hover:bg-gray-200 h-8 cursor-pointer"
                      >
                        Edit profile
                      </Button>
                    </Link>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      View archieve
                    </Button>
                    <Button
                      variant="secondary"
                      className="hover:bg-gray-200 h-8"
                    >
                      Ad tools
                    </Button>
                  </>
                ) : isFollowing ? (
                  <>
                    <Button variant="secondary" className="h-8">
                      Unfollow
                    </Button>
                    <Button variant="secondary" className="h-8">
                      Message
                    </Button>
                  </>
                ) : (
                  <Button className="bg-[#0095F6] hover:bg-[#3192d2] h-8 px-4">
                    Follow
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-8 mt-2 text-sm">
                <p>
                  <span className="font-semibold">
                    {userProfile?.posts?.length}
                  </span>{" "}
                  posts
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.followers?.length}
                  </span>{" "}
                  followers
                </p>
                <p>
                  <span className="font-semibold">
                    {userProfile?.following?.length}
                  </span>{" "}
                  following
                </p>
              </div>
              <div className="flex flex-col gap-1 mt-2 text-sm">
                <span>{userProfile?.bio || "Bio here..."}</span>
                <Badge className={"w-fit"} variant={"secondary"}>
                  <AtSign className="w-3 h-3" />{" "}
                  <span className="pl-1">{userProfile?.username}</span>
                </Badge>
                <p>learn code with anup</p>
                <p>demon coding hub by anup</p>
                <p>create code make fun</p>
              </div>
            </div>
          </section>
        </div>
        <div className="border-t border-t-gray-200">
          <div className="flex items-center justify-center gap-10 text-sm font-medium tracking-wide">
            <span
              onClick={() => handleTabChange("posts")}
              className={`py-4 cursor-pointer border-t-2 transition-all ${
                activeTab === "posts"
                  ? "font-semibold border-black"
                  : "border-transparent text-gray-500"
              }`}
            >
              POSTS
            </span>
            <span className="py-4 cursor-pointer text-gray-500">REELS</span>
            <span
              onClick={() => handleTabChange("saved")}
              className={`py-4 cursor-pointer border-t-2 transition-all ${
                activeTab === "saved"
                  ? "font-semibold border-black"
                  : "border-transparent text-gray-500"
              }`}
            >
              SAVED
            </span>
            <span className="py-4 cursor-pointer text-gray-500">TAGGED</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-[2px] md:gap-1">
            {displayedPost?.map((post) => {
              return (
                <div className="relative group cursor-pointer" key={post?._id}>
                  <img
                    src={post.image}
                    alt="postImage"
                    className="rounded-sm my-2 w-full aspect-square bg-black object-cover"
                  />
                  <div className="absolute my-2 inset-0 flex items-center justify-center backdrop-brightness-75 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="flex items-center text-white space-x-4">
                      <button
                        className={
                          "flex items-center gap-2 hover:text-gray-300 cursor-pointer"
                        }
                      >
                        <Heart />
                        <span>{post?.likes.length}</span>
                      </button>
                      <button
                        className={
                          "flex items-center gap-2 hover:text-gray-300 cursor-pointer"
                        }
                      >
                        <MessageCircle />
                        <span>{post?.comments.length}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
