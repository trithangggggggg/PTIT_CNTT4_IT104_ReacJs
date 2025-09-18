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

export default function App() {
  return (
    <div>
      <h1>redux</h1>
      <Counter></Counter>
      <Student></Student>
      <Profile></Profile>
      <ListUser></ListUser>
      <RandomNumber></RandomNumber>
      <ChangeState></ChangeState>
      <ThemeSwitcher></ThemeSwitcher>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
