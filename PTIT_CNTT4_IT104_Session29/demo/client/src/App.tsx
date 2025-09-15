import axios from "axios";
import React, { useEffect, useState } from "react";
type User = {
  id: number;
  name: string;
};
export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  // function lấy data
  async function getData() {
    let res = await axios.get("http://localhost:8080/users");
    setUsers([...res.data]);
  }
  // function thêm user vào database (json-server);
  async function addNewUser(user: User|object) {
    let res = await axios.post("http://localhost:8080/users", user);
    return res.data;
  }
  useEffect(() => {
    getData();
  }, []);

  // tạo hàm thêm mới user
  const addUser = async () => {
    const newUser = await addNewUser({ name: name });
    setUsers([...users, newUser]);
    setName("");
  };
  const handleChange = (e: any) => {
    setName(e.target.value);
  };
  const deleteUser = async (id: number) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    setUsers(users.filter((user: User) => user.id !== id));
  };
  const updateUser = async (item: User) => {
    let userName = prompt("nhập tên user mới");
    let res = await axios.patch(`http://localhost:8080/users/${item.id}`, {
      name: userName,
    });
    let findIndex = users.findIndex((item: User) => item.id == res.data.id);
    users[findIndex] = res.data;
    setUsers([...users]);
  };
  return (
    <div>
      học API
      <h1> danh sách user</h1>
      <input value={name} onChange={handleChange} type="text" />
      <button onClick={addUser}>thêm user</button>
      <ul>
        {users.map((item: any, index: number) => {
          return (
            <li key={index}>
              {" "}
              {item.name}
              <button onClick={() => deleteUser(item.id)}>xóa</button>
              <button onClick={() => updateUser(item)}>sửa</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}