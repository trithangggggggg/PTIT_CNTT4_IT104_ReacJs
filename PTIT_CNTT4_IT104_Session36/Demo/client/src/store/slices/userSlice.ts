import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// hàm lấy dữ liệu trên server (json-server);
export const getAllUser = createAsyncThunk("getAllUser", async () => {
  try {
    const response = await axios.get("http://localhost:8080/user");
    // console.log("res",response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
// hàm xóa
export const deleteUser= createAsyncThunk ("get/deleteUser",
    async (id:number)=>{
        try {
           await axios.delete(`http://localhost:8080/user/${id}`)
            return id
        } catch (error) {
            console.log(error)
        }
    }
)
export const editUser = createAsyncThunk("get/editUser",async (newUser:any)=>{
    console.log("New",newUser);
    
    try {
        const res =await axios.put(`http://localhost:8080/user/${newUser.id}`,newUser)
        // console.log("111",res);
        return res.data;
        
    } catch (error) {
        console.log(error)
    }
})
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(getAllUser.pending,()=>{
        console.log("đang xử lý quá trình!");
    })
    .addCase(getAllUser.fulfilled,(state,action)=>{
        state.users=action.payload;
    })
    .addCase(getAllUser.rejected,()=>{
        console.log("quá trình lấy dữ liệu thất bại!");

    })
    .addCase(deleteUser.fulfilled,(state,action)=>{
        state.users=state.users.filter((user:any)=>user.id !== action.payload);
    })
    .addCase(editUser.fulfilled,(state:any,action)=>{
        const index= state.users.findIndex((item:any)=>item.id==action.payload.id);
        state.users[index]= action.payload;
    } )
  }

});
export default userSlice.reducer;