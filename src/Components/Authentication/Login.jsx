import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, TextField, Button, Snackbar } from '@mui/material'
import {Link,useNavigate} from 'react-router-dom'
import {Endpoints} from '../../Helper/API_Endpoints'
import CustomizedSnackbar from './CustomizedSnackbar.jsx'

const Login = () => {
  
  const navigate = useNavigate();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)


  // REDIRECT TO HOME (ALREADY LOGGED IN)
  useEffect(()=>{
    const user = localStorage.getItem("User")
    if(user){
      navigate('/')
    }
  },[])


  // BUG FIX
  useEffect(()=>{
    setError(null)
  },[email,password])


  // USER LOGIN 
  const handleSubmit = async()=>{
    setError(null)
    try{
      const {API_Login_User} = Endpoints
    
      const {data} = await axios.post(API_Login_User,{
        email,
        password
      })

      if(data.success){
        let info = {
          email: data.user.email,
          id: data.user._id,
          token: data.token
        }
        info = JSON.stringify(info)
        localStorage.setItem("User", info)
        navigate('/')
      }


    }
    catch(err){
      setError(err.response.data.message)
    }
  }

  return (
    <div className='m-32 ml-64 w-1/2 form p-4'>
        <Typography variant='h4' sx={{marginBottom:'10px'}}> Planner</Typography>
        <div>
            <Typography variant='h5'>Login page</Typography>
            <div className='m-2'>
                <Typography variant='h6'>Email</Typography>
                <TextField placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='m-2'>
                <Typography variant='h6' >Password</Typography>
                <TextField placeholder='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <Button variant='contained' sx={{marginLeft:'10px'}} onClick={handleSubmit}>Login</Button>
            <Typography>Don't have an account, 
                <span><Link to='/signup' style={{color:'blue'}}>Signup</Link></span>    
             {` First`}</Typography>
        </div>
        <CustomizedSnackbar error={error}/>
    </div>
  )
}

export default Login