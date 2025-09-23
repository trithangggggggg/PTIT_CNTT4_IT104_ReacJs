import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateNumbers } from "../store/slices/randomNumberSlice";

export default function RandomNumberList() {
  const numbers = useSelector((data: any) => data.randomNumbers.numbers);
  const dispatch = useDispatch();

  const handleGenerate = () => {
    dispatch(generateNumbers());
  };

  return (
    <div>
      <button onClick={handleGenerate}>Ramdom Number</button>
      <div><span>ListNumber: </span>[{numbers.join(", ")}]</div>
    </div>
  );
}
