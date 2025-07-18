import React, {useEffect, useState} from 'react';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { setAuthUser } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {

  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const {user} = useSelector(store => store.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name] : e.target.value});
  }

  const signupHandler = async (e) => {
    e.preventDefault();
    // console.log(input);
    try {
      setLoading(true);

      const res = await axios.post('http://localhost:8000/api/v1/user/login', input, {
        headers:{
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if(res.data.success){
        dispatch(setAuthUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
        setInput({
          email: "",
          password: ""
        });
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user) navigate('/')
  },[navigate, user])

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form 
      onSubmit={signupHandler}
      className="shadow-lg flex flex-col gap-5 p-8 border rounded-md w-full max-w-md bg-white">
        <div className="my-4 text-center">
          <h1 className="text-2xl font-bold italic font-serif tracking-tight">friendsChat</h1>
          <p className="text-gray-600">Login to see photos & videos from your friends</p>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-medium mb-1">Email</label>
          <input 
            id="email"
            type="email"
            placeholder='Enter your email'
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="font-medium mb-1">Password</label>
          <input 
            id="password"
            type="password"
            placeholder='Enter your password'
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {
          loading ? (
            <Button>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait...
            </Button>
          ) : (
            <Button type='submit'>Login</Button>
          )
        }

        <span className='text-center'>
          Don't have an account?{' '}
          <Link to="/signup" className='text-blue-600 hover:text-blue-300'>Sign up</Link>
        </span>

      </form>
    </div>
  );
};

export default Login;
