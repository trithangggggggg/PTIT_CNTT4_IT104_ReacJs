import { useDispatch, useSelector } from "react-redux";

export default function RandomNumber() {
  const randoms: number[] = useSelector((state: any) => state.random);
  const dispatch = useDispatch();

  const generate = () => {
    dispatch({ type: "RANDOM" });
  };

  return (
    <div>
      <h1>Bài 4</h1>
      <p>[ {randoms.join(", ")} ]</p>
      <button onClick={generate}>Random</button>
    </div>
  );
}
