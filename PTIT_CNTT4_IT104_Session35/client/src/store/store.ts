import { configureStore } from "@reduxjs/toolkit";
import counter from "./slices/counterSlice";
import student from "./slices/studentSlice";
import randomNumbers from "./slices/randomNumberSlice";
import theme from "./slices/themeSlice";
import viewMode from "./slices/viewModeSlice";
import menu from "./slices/menuSlice";
import language from "./slices/languageSlice";
import favorites from "./slices/favoriteSlice"
import auth from "./slices/authSlice"

export const store = configureStore({
  reducer: {
    counter,
    student,
    randomNumbers,
    theme,
    viewMode,
    menu,
    language,
    favorites,
    auth,
  },
});
