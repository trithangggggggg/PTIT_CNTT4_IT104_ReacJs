import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Counter() {
    const result:any = useSelector((data:any)=>{
        console.log("data",data);
        return data.counter;
    })

    const dispath = useDispatch();

    const increase = ()=>{
        dispath({
            type:"INCREAMENT"
        })
    }

    const decrease = ()=>{
        dispath({
            type:"DECREAMENT"
        })
    }


  return (
    <div>
        <h1>Ung dung counter</h1>
        <p>gia tri counter: {result.count}</p>
        <button onClick={increase}>Tang </button>
        <button onClick={decrease}>giam </button>
    </div>
  )
}
