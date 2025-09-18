import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChangeState() {
  const company = useSelector((state: any) => state.company);
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch({
      type: "CHANGECOMPANY",
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Company: {company}</h2>
      <button
        onClick={handleChange}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Change state
      </button>
    </div>
  );
}
