import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/slices/favoriteSlice";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

export default function FavoriteList() {
  const users = useSelector((state: any) => state.favorites.users);
  const dispatch = useDispatch();

  return (
    <div style={{ border: "1px solid #ddd", padding: "16px", width: "300px" }}>
      <h3>List Favorites User</h3>
      {users.map((user: any) => (
        <div key={user.id} style={{ marginBottom: "12px" }}>
          <div>UserName: {user.name}</div>
          <div>
            Favorites:{" "}
            {user.favorite ? (
              <HeartFilled
                style={{ color: "red", cursor: "pointer" }}
                onClick={() => dispatch(toggleFavorite(user.id))}
              />
            ) : (
              <HeartOutlined
                style={{ cursor: "pointer" }}
                onClick={() => dispatch(toggleFavorite(user.id))}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
