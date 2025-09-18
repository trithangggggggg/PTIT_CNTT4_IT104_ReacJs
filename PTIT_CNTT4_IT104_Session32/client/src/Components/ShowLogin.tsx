import React from "react";
import { useSelector } from "react-redux";

export default function ShowLogin() {
  const loginInfo = useSelector((state: any) => state.login);

  console.log("Thông tin đăng nhập:", loginInfo);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Thông tin đăng nhập</h2>
      {loginInfo.isLoggedIn ? (
        <p>Email: {loginInfo.email}</p>
      ) : (
        <p>Chưa đăng nhập</p>
      )}
    </div>
  );
}
