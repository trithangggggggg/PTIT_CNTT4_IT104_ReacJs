import React from 'react'
import { useSelector } from 'react-redux'

export default function Student() {
    const result = useSelector((data:any)=>{
        console.log("data", data);
        return data.students.users;
    })
  return (
    <div>
       <h1>trang student</h1>
       <ul>
            {result.map((item:any, index:any)=>{
                return <li key={item.id}>{item.name}</li>
            })}
       </ul>
    </div>
  )
}
