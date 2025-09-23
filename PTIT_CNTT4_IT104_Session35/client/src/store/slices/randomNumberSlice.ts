import { createSlice } from "@reduxjs/toolkit";

const randomNumberSlice = createSlice({
  name: "randomNumbers",
  initialState: {
    numbers: [] as number[],
  },
  reducers: {
    generateNumbers: (state) => {
      const arr: number[] = [];
      for (let i = 0; i < 5; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
      }
      state.numbers = arr;
    },
  },
});

export const { generateNumbers } = randomNumberSlice.actions;
export default randomNumberSlice.reducer;
