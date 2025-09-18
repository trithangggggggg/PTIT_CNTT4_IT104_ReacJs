import React from "react";
import Counter from "./pages/Counter";
import Student from "./pages/Student";
import Profile from "./Components/Profile";
import "@tailwindcss/vite";
import ListUser from "./Components/ListUser";
import RandomNumber from "./Components/RandomNumber";
import ChangeState from "./Components/ChangeState";
import ThemeSwitcher from "./Components/ThemeSwitcher";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ShowLogin from "./Components/ShowLogin";

export default function App() {
  return (
    <div>
      <h1>redux</h1>
      <Counter />
      <Student />
      <Profile />
      <ListUser />
      <RandomNumber />
      <ChangeState />
      <ThemeSwitcher />

      {/* bai 7,8 */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/show" element={<ShowLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
