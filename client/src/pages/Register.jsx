import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [mail,setMail]=useState("")
    const nav=useNavigate()
    const dispatch=useDispatch()
    const data=useSelector(state=>state.user.userData)

    useEffect(()=>{
       if (data!==null) {
          nav("/home")
       }
    },[data])
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let obj={
        name:username,
        email:mail,
        password:password
      }
      console.log(obj);
      dispatch(userRegister(obj))
      // dispatch(Register(obj))
    };
  return (
    <div className="min-h-full h-screen flex items-center bg-blue-100 justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-[50rem] lg:space-y-8 space-y-3 rounded-lg pb-5 bg-gradient-to-r from-cyan-500 to-blue-500">
      <div>
        <h1 className="text-3xl font-bold pt-3 text-white text-center">
          Register
        </h1>
        <p className="text-white text-center mt-2">
         Please Register to Continue...
        </p>
      </div>
      <form onSubmit={handleSubmit} className="lg:space-y-6">
        <div className="mb-6">
          <label
            htmlFor="username"
            className="px-7  text-md text-white font-medium block mb-2"
          >
            Username
          </label>
          <div className="lg:flex justify-center">
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-72 mx-5 lg:w-[25rem] lg:mx-1  rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="px-7  text-md text-white font-medium block mb-2"
          >
            Email
          </label>
          <div className="lg:flex justify-center">
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setMail(e.target.value)}
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
        <div className="mb-6 ">
          <label
            htmlFor="password"
            className="text-md px-7 font-medium text-white block mb-2"
          >
            Confirm password
          </label>
          <div className="lg:flex justify-center">
            <input
              type="password"
              name="password"
              id="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="w-72  lg:w-[25rem] mx-5 lg:mx-3 rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" w-72 lg:w-80 mx-5 text-md  flex justify-center items-center rounded-md bg-cyan-400 px-4 py-2 text-white font-bold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Register