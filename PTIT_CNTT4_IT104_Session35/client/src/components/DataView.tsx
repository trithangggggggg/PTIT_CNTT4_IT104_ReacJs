import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleView } from "../store/slices/viewModeSlice";

const dummyData = [
  { id: 1, name: "Bản ghi 1" },
  { id: 2, name: "Bản ghi 2" },
  { id: 3, name: "Bản ghi 3" },
  { id: 4, name: "Bản ghi 4" },
];

export default function DataView() {
  const mode = useSelector((data: any) => data.viewMode.mode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleView());
  };

  return (
    <div>
      <button onClick={handleToggle}>
         {mode === "list" ? "Grid" : "List"} Mode
      </button>

      {mode === "list" ? (
        <ul>
          {dummyData.map((item) => (
            <li key={item.id} style={{backgroundColor:"orangered" , width:"200px", marginBottom:"20px", padding:"5px"}}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {dummyData.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                textAlign: "center",
                backgroundColor:"orangered"
              }}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
