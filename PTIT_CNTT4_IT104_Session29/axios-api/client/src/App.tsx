import React from 'react'
import GetAllStudent from './Components/GetAllStudent'
import GetStudentById from './Components/GetStudentById'
import CreateStudent from './Components/CreateStudent'

export default function App() {
  return (
    <div>
      <GetAllStudent></GetAllStudent>
      <GetStudentById></GetStudentById> 
      <CreateStudent></CreateStudent>
    </div>
  )
}
