import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { setAuthUser } from "@/redux/authSlice";
import axios from "axios";

const EditProfile = () => {
  const imageRef = useRef();
  const { user } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    profilePhoto: null,
    bio: user?.bio || "",
    gender: user?.gender || "none",
  });
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const isChanged =
    input.bio !== (user?.bio || "") ||
    input.gender !== (user?.gender || "none") ||
    input.profilePhoto !== null;
  

  const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePhoto: file });
    }

  const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    }

  const editProfileHandler = async () => {
        console.log(input);
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if(input.profilePhoto){
            formData.append("profilePhoto", input.profilePhoto);
        }
        try {
            setLoading(true);
            const res = await axios.post('https://friendschat-7iht.onrender.com/api/v1/user/profile/edit', formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            if(res.data.success){
                const updatedUserData = {
                    ...user,
                    bio:res.data.user?.bio,
                    profilePicture:res.data.user?.profilePicture,
                    gender:res.data.user.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
    }

  return (
    <div className="flex max-w-2xl mx-auto pl-10 mt-12">
      <section className="flex flex-col gap-6 w-full">
        <h1 className="font-bold text-xl">Edit Profile</h1>

        {/* Avatar & Upload */}
        <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="post_image" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <p className="text-gray-400 text-xs">
                {user?.bio || "Your bio..."}
              </p>
            </div>
          </div>

          <input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
          />
          <Button
            onClick={() => imageRef?.current?.click()}
            className="bg-[#0095F6] h-8 hover:bg-[#1877f2] cursor-pointer"
          >
            Change photo
          </Button>
        </div>

        {/* Bio Input */}
        <div>
          <label className="font-bold text-xl block mb-2" htmlFor="bio">
            Bio
          </label>
          <div className="relative w-full">
            <textarea
              id="bio"
              name="bio"
              rows="2"
              maxLength={150}
              value={input.bio}
              onChange={(e) => setInput({ ...input, bio: e.target.value })}
              placeholder="Write your bio..."
              className="w-full p-2 pr-10 rounded-2xl border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black pl-4 resize-none"
            />
            <span className="absolute bottom-1 right-2 text-sm text-gray-600 pb-2 pr-3">
              {input.bio.length} / 150
            </span>
          </div>
        </div>

        {/* Gender Select */}
        <div>
          <label className="font-bold text-xl block mb-2" htmlFor="gender">
            Gender
          </label>
          <Select value={input.gender} onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-full min-h-[55px] px-4 py-3 rounded-2xl border border-gray-300 focus:ring-1 focus-visible:ring-1 text-1xl bg-white cursor-pointer">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border border-gray-200 bg-white shadow-md">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="none">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={editProfileHandler}
            disabled={!isChanged || loading}
            className={`w-1/2 h-12 rounded-xl font-bold text-white ${
              !isChanged || loading
                ? "bg-[#b2dffc] cursor-not-allowed"
                : "bg-[#0095F6] hover:bg-[#1877f2] cursor-pointer"
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
