import { useEffect } from "react";
import axios from "axios";
import { setPosts } from "@/redux/postSlice";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/post/all", {
          withCredentials: true,
        });
        // console.log(res);
        if (res.data.success) {
            // console.log(res.data.post);
          dispatch(setPosts(res.data.post));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
  }, [dispatch]);
};

export default useGetAllPost;
