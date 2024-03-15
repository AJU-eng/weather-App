
import { BrowserRouter,Routes,Route } from "react-router-dom";
import UnAuthorizedHome from "./pages/UnAuthorizedHome";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Locations from "./pages/Locations";
import Register from "./pages/Register";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logged } from "./redux/features/userSlice";

function App() {
  const dispatch=useDispatch()
  const user=useSelector((state)=>state.user.isLogged)
  useEffect(()=>{
    let token=window.localStorage.getItem("userToken")
    dispatch(logged(token))
  },[user])
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={user?<Home/>:<UnAuthorizedHome/>}/>
      <Route path="/login" element={user?<Home/>:<Login/>}/>
      <Route path="/register" element={user?<Home/>:<Register/>}/>
      <Route path="/home" element={user?<Home/>:<Login/>}/>
      <Route path="/location" element={user?<Locations/>:<Login/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
