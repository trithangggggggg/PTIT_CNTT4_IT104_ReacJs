import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../store/slices/counterSlice";

export default function Counter() {
  const result = useSelector((data: any) => {
    return data.counter.value;
  });

  const dispatch = useDispatch();

  const increase = () => {
    dispatch(increment());
  };
  const decrease = () => {
    dispatch(decrement());
  };
  const resetCount = () => {
    dispatch(reset());
  };

  return (
    <div>
      gia tri count: {result}
      <br />
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <button onClick={resetCount}>Reset</button>
    </div>
  );
}
