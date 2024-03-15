const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const locationModel=require("../models/locationModel")
const jwt = require("jsonwebtoken");

require("dotenv").config();
module.exports = {
  //  create user

  createUser: async (args) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(args.input.password, salt);
      const data = await userModel.create({
        name: args.input.name,
        email: args.input.email,
        password: hash,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  // login user

  login: async ({ email, password }) => {
    try {
      const user = await userModel.findOne({ email: email });
      if (!user) {
        console.log("user is not found");
        throw new Error("User is not found");
      } else {
        let pass = bcrypt.compareSync(password, user.password);
        if (!pass) {
          throw new Error("Incorrect Password");
        } else {
          const token = jwt.sign(
            { user_id: user._id },
            process.env.SECRET_KEY,
            { expiresIn: "1hr" }
          );

          return { userId: user._id, token: token, tokenExpiration: 1 };
        }
      }
    } catch (error) {
      return error;
    }
  },

  isAuth: async ({ token }) => {
    const data = jwt.verify(token, process.env.SECRET_KEY);
    if (data) {
      return { Auth: true };
    } else {
      return { Auth: false };
    }
  },


  getLocations:async({token})=>{
    console.log("hello word");
    const user_data=jwt.decode(token,process.env.SECRET_KEY)

    const data=await locationModel.find({userId:user_data.user_id})
    console.log(data);
    return {location:data}
    // return {location:data.map((dat)=>dat.location),temp:data.map((dat)=>dat.temp)}
  },
  
  location:async(args)=>{
   console.log("location api called");
    const user_data=jwt.decode(args.input.token,process.env.SECRET_KEY)
    
    const data=await locationModel.create({location:args.input.city,temp:args.input.temp,userId:user_data.user_id})
    console.log(data);
    return {location:data.location,temp:data.temp}
    
  },

  Logout:async()=>{
    console.log("logout api called");
    return {done:true};
  }
};
