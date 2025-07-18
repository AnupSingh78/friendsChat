import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "@/redux/chatSlice";

const useGetAllMessage = () => {
  const { selectedUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllMessage = async () => {
      try {
        const res = await axios.get(
          `https://friendschat-7iht.onrender.com/api/v1/message/all/${selectedUser?._id}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setMessages(res.data.message));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllMessage();
  }, [dispatch, selectedUser]);
};

export default useGetAllMessage;
