import {configureStore} from "@reduxjs/toolkit"
import { createLogger } from "redux-logger"
import {userReducer} from "../features/userSlice"
const logger=createLogger()

const store=configureStore({
    reducer:{
      user:userReducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
})

export default store