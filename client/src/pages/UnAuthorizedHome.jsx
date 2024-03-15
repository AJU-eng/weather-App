import React from 'react'
import sun_first from "../assets/sun_first.png";
import { useNavigate } from 'react-router-dom';

function UnAuthorizedHome() {
    const nav=useNavigate()
  return (
    <>
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
        <h1 className="text-white text-2xl lg:text-2xl pt-5 px-4 lg:pt-5 font-serif">
          Weather App{" "}
        </h1>
        <div>
          
        </div>
        <div className="flex justify-center mt-20">
          <img src={sun_first} className="h-60 " alt="" />
        </div>
        <div>
          <div className="space-y-3 mt-4">
            <h2 className="text-3xl text-center font-serif text-white">
              Ready to plan your Days?{" "}
            </h2>
            <h2 className="text-2xl text-center font-serif text-yellow-300">
              Check the weather first!
            </h2>
          </div>
          <div className="flex justify-center mt-10 lg:mt-10">
            <button onClick={()=>nav("/login")} className="text-2xl bg-blue-600 w-36 pb-3 pt-3 rounded-full text-white">
              Login{" "}
            </button>
          </div>
        </div>
      </div>
    </>

  )
}

export default UnAuthorizedHome