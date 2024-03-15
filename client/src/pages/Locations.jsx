import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getLocation, saveLocation } from "../redux/features/userSlice";
function Locations() {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.user.locations);

  const [located, setLocation] = useState([]);

  useEffect(() => {
    dispatch(getLocation(window.localStorage.getItem("userToken")));
  }, []);

  useEffect(() => {
    if (locations) {
      console.log(locations);
      setLocation(locations.data.getLocations.location);
    }
  }, [locations]);

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 min-h-screen">
        <div className="flex justify-center pt-7 space-x-3 ">
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            className="w-48"
            placeholder="Enter location here"
          />
          <IoMdAddCircle
            onClick={async () => {
              const data = await axios
                .post(
                  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
                    import.meta.env.VITE_REACT_APP_API_KEY
                  }`
                )
                .then((data) => {
                  console.log(city, data.data.main.temp, "hurey");
                  dispatch(
                    saveLocation({
                      city: city,
                      temp: data.data.main.temp,
                      token: window.localStorage.getItem("userToken"),
                    })
                  );
                });
            }}
            color="white"
            size={35}
          />
        </div>
        <div className="flex justify-center mt-4 mr-12">
          {located &&
            located.map((data) => {
              return (
                <div className="bg-white w-48 flex justify-between pb-3 pt-3 pr-4 px-3 text-lg font-medium">
                  <p>Kozhikode</p>
                  <p>26</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Locations;
