import React, { useEffect, useState } from 'react'
import Loading from './Components/Loading'
import axios from 'axios';

interface User{
  id:number,
  name:string,
  email:string,
  age:number,
}

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User[]>([])

  async function getAllUser() {
    let result:User[];
      try {
        const response = await axios.get("http://localhost:8080/user");
        result=response.data;
      } catch (error) {

      }finally{
        //hoan thanh qua trinh
        setTimeout(()=>{
          setLoading(false);
          setUser([...result]);
        },1500);
      }
  }
  useEffect(()=>{
    getAllUser();
  },[])

  return (
    <div>
        <h1>hoc api</h1>
        {loading? <Loading></Loading> : ""}
        <ul>
          {user.map(u => (
            <li key={u.id}>
              <strong>{u.name}</strong> ({u.age} tuổi) - {u.email}
            </li>
          ))}
        </ul>
    </div>
  )
}
