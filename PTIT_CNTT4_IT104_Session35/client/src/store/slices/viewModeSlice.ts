import { createSlice } from "@reduxjs/toolkit";

const viewModeSlice = createSlice({
  name: "viewMode",
  initialState: {
    mode: "list",
  },
  reducers: {
    toggleView: (state) => {
      state.mode = state.mode === "list" ? "grid" : "list";
    },
  },
});

export const { toggleView } = viewModeSlice.actions;
export default viewModeSlice.reducer;
