import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ThemeSwitcher() {
  const theme = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch({ type: "CHANGETHEME" });
  };

  return (
    <div className="p-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={handleToggle}
        />
        <span>{theme === "light" ? "Chế độ sáng" : "Chế độ tối"}</span>
      </label>
    </div>
  );
}
