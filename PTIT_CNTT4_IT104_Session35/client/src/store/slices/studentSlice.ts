import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: [
      { id: 1, name: "tri thang yeu thanh ha" },
      { id: 2, name: "thanh ha yeu tri thang" }
    ]
  },
  reducers: {
    addStudent: (state, action) => {
      state.student.push(action.payload);
    }
  }
});
export const { addStudent } = studentSlice.actions;
export default studentSlice.reducer;
