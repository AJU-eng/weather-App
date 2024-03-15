import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/features/userSlice";
const Login = () => {
  const Dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const data=useSelector(state=>state.user.userData)
  const token=useSelector((state)=>state.user.token)
  const nav = useNavigate();
  useEffect(()=>{
    console.log(token,'it is in frontend');
    if (data!==null) {
      window.localStorage.setItem("userToken",token)
      nav("/home")
    }
  },[data,token])
  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      email: email,
      password: password,
    };
    Dispatch(userLogin(obj));
  };

  return (
    <div className="min-h-full h-screen flex items-center bg-blue-100 justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-[50rem] space-y-8 rounded-lg pb-5 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div>
          <h1 className="text-3xl font-bold pt-3 text-white text-center">
            Login
          </h1>
          <p className="text-white text-center mt-2">
            Welcome back! Please sign in to continue.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-6">
            <label
              htmlFor="username"
              className="px-7  text-md text-white font-medium block mb-2"
            >
              Email
            </label>
            <div className="lg:flex justify-center">
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-72 mx-5 lg:w-[25rem] lg:mx-1  rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="mb-6 ">
            <label
              htmlFor="password"
              className="text-md px-7 font-medium text-white block mb-2"
            >
              Password
            </label>
            <div className="lg:flex justify-center">
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-72  lg:w-[25rem] mx-5 lg:mx-3 rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className=" w-72 lg:w-80 mx-5 text-md  flex justify-center items-center rounded-md bg-cyan-400 px-4 py-2 text-white font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          <p className="text-center text-lg  text-white">
            Don't have account ?{" "}
            <span
              className="text-blue-900 font-serif cursor-pointer text-lg "
              onClick={() => nav("/register")}
            >
              Create Account
            </span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
