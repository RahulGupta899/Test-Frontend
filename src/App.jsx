import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'


////////////////////
// COMPONENTS
///////////////////
import Layout from './Components/TaskManager/Layout'
import Tasks  from './Components/TaskManager/Tasks'
import AddNewTask from './Components/TaskManager/AddNewTask'
import EditTask from './Components/TaskManager/EditTask'
import Login from './Components/Authentication/Login'
import Signup from './Components/Authentication/Signup'

function App() {

  return (
    <Routes>
      <Route index element={<Layout Children={<Tasks/>}/>}/>
      <Route path='/new-task' element={<Layout Children={<AddNewTask/>}/>}/>
      <Route path='/edit-task/:id' element={<Layout Children={<EditTask/>}/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path="*" element={<h2>{`Page Not Found :)`}</h2>}/>
    </Routes>
  )
}

export default App
