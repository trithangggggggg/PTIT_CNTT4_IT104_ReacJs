import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    { id: 1, name: "Nguyễn Trí Thắng", favorite: false },
    { id: 2, name: "Nguyễn Trí  thang", favorite: false },
    { id: 3, name: "Nguyễn Trí thaans", favorite: false },
    { id: 4, name: "Nguyễn Trí ấdas ", favorite: false },
  ],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const user = state.users.find((u) => u.id === action.payload);
      if (user) {
        user.favorite = !user.favorite;
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
