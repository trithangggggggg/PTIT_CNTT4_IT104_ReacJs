import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, editUser, getAllUser } from "../store/slices/userSlice";
import type { User } from "../utils/type";
// import type { User } from "../utils/types";

export default function StudentManager() {
  const result = useSelector((data:any) => {
    
    return data.users.users
  });
  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(getAllUser());
  }, []);
  const handleDelete=(id:number)=>{
    dispatch(deleteUser(id))
  }
  const handleEdit=(item:any)=>{
    let newName = prompt("Nhập tên mới: ");
    const newUser={...item,name:newName};
    dispatch(editUser(newUser))
  }
  return (
    <div>
      <h1> Quản lý user</h1>
      <ul>
        {result.map((item:User)=><li key={item.id}>
          {item.name}
          <button onClick={()=>handleDelete(item.id)} >xóa</button>
          <button onClick={()=>handleEdit(item)} >Sửa</button>
          </li>)}
      </ul>
    </div>
  );
}