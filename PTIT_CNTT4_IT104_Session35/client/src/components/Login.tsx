// src/components/Login.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";

const USERS = [
  { id: 1, userName: "Nguyen Van A", email: "nguyenvana@gmail.com", password: "123123123" },
  { id: 2, userName: "Nguyen Van B", email: "b@gmail.com", password: "456" },
];

export default function Login() {   
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      dispatch(login(user));
    } else {
      alert("Sai email hoặc mật khẩu");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Đăng nhập</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}
