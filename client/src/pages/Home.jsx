import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import home_variety from "../assets/home_variety2.png";
import { useGeolocated } from "react-geolocated";
import { CiTempHigh } from "react-icons/ci";
import { MdWaterDrop } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
function Home() {
  const [climate, setClimate] = useState([]);
  const [subData, setSubData] = useState([]);
  const [visible, setVisible] = useState(false);
  const nav=useNavigate()
  const dispatch=useDispatch()
  const [city, setCity] = useState("");
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const AccessWeather = async () => {
    try {
      console.log(import.meta.env.VITE_REACT_APP_API_KEY);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${
          coords.latitude
        }&lon=${coords.longitude}&appid=${
          import.meta.env.VITE_REACT_APP_API_KEY
        }`
      );
      console.log(res.data);
      setCity(res.data.name);
      setSubData(res.data.main);
      setClimate(res.data.main.temp - 273.15);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isGeolocationEnabled) {
      alert("Enable to Access location");
    }
  }, [isGeolocationEnabled]);
  useEffect(() => {
    if (coords) {
      let weather = AccessWeather();
    }
  }, [coords]);
   
  const handleLocationClick=(location)=>{
    setVisible(location)
  }

  return (
    <>
      <Navbar  onLogout={handleLocationClick} visible={visible}/>
      <div className=" lg:flex justify-between bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen  ">
        {visible && (
          <div className="flex justify-end pt-2">
            <div className="w-28 font-serif font-medium mx-10 bg-white opacity-4 text-center pb-2 px-4 pt-2 text-lg">
              {/* <p>Locations</p> */}
              <p className="" onClick={()=>{
                window.localStorage.removeItem("userToken")
                dispatch(logout())
              }}>Logout</p>
              <p onClick={()=>nav('/location')}> Locations</p>
            </div>
          </div>
        )}

        <div className="lg:w-1/2">
          <div className="lg:flex justify-center">
            <img src={home_variety} className="pt-20" alt="Home Variety" />
          </div>

          {city && (
            <p className="text-4xl text-center pt-2 text-white font-medium mt-4">
              {city}
            </p>
          )}
          {climate && (
            <p className="text-white text-center text-5xl pt-5">
              {Math.trunc(climate)}°c
            </p>
          )}
        </div>

        <div
          className="flex justify-around lg:w-1/2 lg:pt-20 lg:pr-40
        "
        >
          <div>
            <CiTempHigh size={50} color="white" className=" mt-28 lg:mt-8" />
            <p className="pt-2 px-2 text-lg text-white">
              {Math.trunc(subData.feels_like - 273.15)}°C
            </p>
          </div>
          <div>
            <IoMdSpeedometer
              size={50}
              color="white"
              className=" mt-28 lg:mt-8"
            />
            <p className="pt-2 text-lg px-2 text-white">{subData.pressure}</p>
          </div>
          <div>
            <MdWaterDrop size={50} color="white" className=" mt-28 lg:mt-8" />
            <p className="pt-2 text-lg px-3 text-white">{subData.humidity}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
