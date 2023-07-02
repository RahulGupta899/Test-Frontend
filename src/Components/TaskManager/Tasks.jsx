import React,{useEffect,useState} from 'react'
import axios from 'axios';
import moment from 'moment'
import {Link,useNavigate} from 'react-router-dom'
import {Button,TextField,MenuItem,Box, Typography} from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditNoteIcon from '@mui/icons-material/EditNote';
import {Endpoints} from '../../Helper/API_Endpoints'

const Tasks = () => {

    let user = JSON.parse(localStorage.getItem("User"));
    let token;
    if(user) token = user.token

    const navigate = useNavigate();
    
    const [tasksList,setTasksList] = useState(null)
    const [tasksListBackup, setTaskListBackup] = useState([])
    const [controller, setController] = useState(false)
    const [status,setStatus] = useState('all')

    
    // FILTER TASKS BY STATUS
    function handleChange(e){
        const currentStatus = e.target.value
        setStatus(currentStatus)

        if(currentStatus == 'all'){
            setTasksList(tasksListBackup)
        }
        else{
            const filteredTasks = tasksListBackup.filter((task)=>task.status===currentStatus)
            setTasksList(filteredTasks)
        }
    }

    // SORT TASKS BASED ON DATES
    const sortTasksAscending = ()=>{
        const sortedTasks = tasksList.sort((a,b)=>b.date-a.date)
        setTasksList([...sortedTasks])
    }

    const sortTasksDescending = ()=>{
        const sortedTasks = tasksList.sort((a,b)=>a.date-b.date)
        setTasksList([...sortedTasks])
    }


    // FETCH ALL TASKS
    useEffect(()=>{

        // REDIRECT TO LOGIN PAGE (NOT LOGGED IN)
        const user = localStorage.getItem("User")
        if(!user){
            navigate('/login')
            return;
        }

        // FETCH TASKS LIST
        const fetchTasks = async()=>{
            const {API_Get_All_Task} = Endpoints
            const {data} = await axios.get(
                API_Get_All_Task,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setTasksList(data.tasksList)
            setTaskListBackup(data.tasksList)
        }
        fetchTasks();

    },[controller])


    // PERFORM DELETE TASK OPERATION
    const handleDeleteTask = async(_id)=>{
        console.log("Clicked Task: ", _id);
        try{
            const {API_Delete_Task} = Endpoints

            const {data} = await axios.delete(API_Delete_Task,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: {
                    _id: _id
                }
            })

            if(data.success){
                setController((state)=>!state)
                alert(data.message)
            }
        }
        catch(err){
            console.log("ERROR: ",err)
            alert(err.response.data.error)
        }
    }


    return (
        <div>
            {/* MAIN SECTION */}
            <div className="main_section pt-2 ">

                {
                    tasksList
                    ?
                    <div>

                        <div className='flex justify-between content-center items-center '>
                        <div className=' text-2xl p-4 text-bold bold'>My Task List</div>
                        <div className='flex justify-between pr-9' style={{width:'350px'}}>
                            <Link to='new-task' >
                                <Button variant='contained' sx={{height:'55px', width:'80px'}}>Add +</Button>
                            </Link>

                            <Box sx={{ width:'100px'}}>
                                <TextField
                                    select
                                    value={status}
                                    onChange={handleChange}
                                    label='Status'
                                    
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="todo">To Do</MenuItem>
                                    <MenuItem value="progress">Progress</MenuItem>
                                    <MenuItem value="done">Done</MenuItem>
                                </TextField>
                            </Box>

                            <div className='flex border  content-center items-center justify-between w-20 pl-4'>
                                <div>Date</div>
                                <div className='flex flex-col  '>
                                    <ArrowDropUpIcon className='sort_icons cursor-pointer' onClick={sortTasksAscending}/>
                                    <ArrowDropDownIcon className='sort_icons cursor-pointer' onClick={sortTasksDescending}/>
                                </div>
                            </div>

                        </div>
                        </div>

                        {/* TASKS */}
                        <div >
                            {
                            tasksList && tasksList.map((task,idx)=>{
                                    const formattedDate = moment(task.date).format('DD/MM/YYYY')
                                    return(

                                        <div className='task p-3 flex justify-between' key={idx}>

                                            {/* TITLE AND DESCRIPTION */}
                                            <div className='w-48 w-1/4'>
                                                <p className='font-medium'>{task.title}</p>
                                                <p className=' text-xs' >{task.description}</p>
                                            </div>

                                            {/* WRAPPER */}
                                            <div className='flex justify-between content-center items-center  w-3/4 px-7'>
                                                <div>{formattedDate}</div>
                                                <div>{task.status}</div>
                                                <Link to={`/edit-task/${task._id}`}>
                                                    <EditNoteIcon className='edit_button hover:border cursor-pointer'/>
                                                </Link>
                                                <button className='remove_button' onClick={()=>{handleDeleteTask(task._id)}} >X</button>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                            

                            
                        </div>
                    </div>
                    :
                    <Typography variant='h4' sx={{padding:'50px'}}>Loading...</Typography>
                }
            </div>
        </div>

    )
}

export default Tasks