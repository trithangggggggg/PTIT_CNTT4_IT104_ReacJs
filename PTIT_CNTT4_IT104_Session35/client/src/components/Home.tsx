// src/components/Home.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  if (!currentUser) {
    return <h3>Bạn chưa đăng nhập</h3>;
  }

  return (
    <div>
      <h2>User: {currentUser.userName}</h2>
      <p>Email: {currentUser.email}</p>
      <button onClick={() => dispatch(logout())}>Đăng xuất</button>
    </div>
  );
}
