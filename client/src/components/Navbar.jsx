import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
function Navbar({onLogout,visible}) {
  return (
    <div className="bg-gradient-to-r from-cyan-500 pb-4 to-blue-500">
      <div className="flex justify-between">
        <div>
          <p className="text-white  lg:text-2xl text-[25px] pt-4 px-6 font-medium ">
            Weather App
          </p>
        </div>
        <div className="hidden sm:flex  mr-64 space-x-7 ">
          <p className="pt-5 text-white text-lg hover:cursor-pointer">Home </p>
          <p className="pt-5  text-white text-lg hover:cursor-pointer">
            Manage Locations
          </p>
          <p className="pt-5  text-white text-lg hover:cursor-pointer">
            climate status
          </p>
          <p onClick={()=>window.localStorage.removeItem("userToken")} className="pt-5  text-white text-lg hover:cursor-pointer">
            Logout
          </p>
        </div>

        <div className="flex lg:hidden">

           <IoLocationSharp color="white" className="mr-4 mt-4" size={38}/>
           <SlOptionsVertical onClick={()=>onLogout(!visible)} color="white" className="mr-6 mt-5" size={33}/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
