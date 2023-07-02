import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom'
import {Typography,TextField, Button, MenuItem} from '@mui/material'
import BasicDatePicker from './BasicDatePicker'
import {Endpoints} from '../../Helper/API_Endpoints'
import CustomizedSnackbar from '../Authentication/CustomizedSnackbar.jsx'


const EditTask = () => {

    const token = JSON.parse(localStorage.getItem("User")).token;
    const navigate = useNavigate();
    const params = useParams();
    const {id} = params

    
    const {
        API_Get_Single_Task,
        API_Update_Task
    } = Endpoints;


    const [title,setTitle] = useState('')
    const [description,setDescription] = useState('')
    const [selectedDate,setSelectedDate] = useState('')
    const [status,setStatus] = useState('')
    const [error,setError] = useState(null)

    useEffect(()=>{
        setError(null)
    },[title,description,selectedDate,status])

    let date = selectedDate
    if(typeof(date) !== 'number'){
        date = new Date(selectedDate).getTime();
    }

    function handleChange(e){
        setStatus(e.target.value)
    }

    // FILL THE FILEDS
    useEffect(()=>{
        const fetchSingleTask = async()=>{
            try{
                const {data} = await axios.post(API_Get_Single_Task,{id},{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                if(data.success){
                    const {title,description,date,status} = data.task
                    setTitle(title)
                    setDescription(description)
                    setSelectedDate(date)
                    setStatus(status)
                }
            }
            catch(err){
                alert(err.response.data.message)
            }
        }
        fetchSingleTask();
    },[])

    // UPDATE TASK TO DB
    const handleUpdateTask = async()=>{
        setError(null)
        try{
            const {data} = await axios.patch(API_Update_Task,{
                                id,title,description,status,date
                            },{
                                headers:{
                                    Authorization: `Bearer ${token}`
                                }
                            })

            if(data.success){
                navigate('/')
            }
        }
        catch(err){
            setError(err.response.data.message)
        }
        
    }


  return (
    <div className='m-24 p-8 form '>
        <div className='m-2'>
            <Typography variant='h6'>Task</Typography>
            <TextField placeholder='task' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        <div className='m-2'>
            <Typography variant='h6'>Description</Typography>
            <TextField  placeholder='description' sx={{width:'300px', height:'50px'}} value={description} onChange={(e)=>setDescription(e.target.value)}/>
        </div>
        <div className='m-2'>
            <Typography variant='h6'>Status</Typography>
            <TextField
                select
                value={status}
                onChange={handleChange}
            >
                <MenuItem value="todo">To Do</MenuItem>
                <MenuItem value="progress">Progress</MenuItem>
                <MenuItem value="done">Done</MenuItem>
            </TextField>
        </div>
        <div className='m-2'>
            <Typography variant='h6'>Deadline</Typography>
            <BasicDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </div>

        <div className='m-2'>
            <Button variant='contained' onClick={handleUpdateTask}>Update</Button>
        </div>

        <CustomizedSnackbar error={error}/>
    </div>
  )
}

export default EditTask