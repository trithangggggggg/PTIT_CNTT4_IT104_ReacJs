import { configureStore } from "@reduxjs/toolkit";  
import user_slice from "./slices/userSlice"

export const store = configureStore({
  reducer:{
    users: user_slice
  }
})