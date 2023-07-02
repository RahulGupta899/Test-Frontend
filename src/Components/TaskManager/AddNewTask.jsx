import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Typography,TextField,Button } from '@mui/material'
import BasicDatePicker from './BasicDatePicker'
import {Endpoints} from '../../Helper/API_Endpoints'
import CustomizedSnackbar from '../Authentication/CustomizedSnackbar.jsx'


const AddNewTask = () => {
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("User")).token;

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [selectedDate,setSelectedDate] = useState(null);
    const [error,setError] = useState(null)

    useEffect(()=>{
        setError(null)
    },[title,description,selectedDate])

    const date = new Date(selectedDate).getTime();

    
    // ADD TASK TO DATABASE
    const handleAddTask = async()=>{
        setError(null)
        try{
            const {API_Create_Task} = Endpoints

            const {data} = await axios.post(API_Create_Task,{
                    title,
                    description,
                    date
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if(data.success){
                navigate('/')
            }

            console.log(data)
        }
        catch(err){
            setError(err.response.data.error || err.response.data.message)
        }
    }
    

  return (
    <div className='m-24 p-8 form '>
        <div className='m-2'>
            <Typography variant='h6'>Task</Typography>
            <TextField placeholder='task' vlaue={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div className='m-2 ' >
            <Typography variant='h6'>Description</Typography>
            <TextField  placeholder='description' sx={{width:'300px', height:'50px'}} vlaue={description} onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <div className='m-2'>
            <Typography variant='h6'>Deadline</Typography>
            <BasicDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
        </div>
        <div className='m-2'>
            <Button variant='contained' onClick={handleAddTask} >Add</Button>
        </div>

        <CustomizedSnackbar error={error}/>
    </div>
  )
}

export default AddNewTask