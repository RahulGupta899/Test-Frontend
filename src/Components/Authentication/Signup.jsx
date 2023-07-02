import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Typography, TextField, Button } from '@mui/material'
import {Link,useNavigate} from 'react-router-dom'
import {Endpoints} from '../../Helper/API_Endpoints'
import CustomizedSnackbar from './CustomizedSnackbar.jsx'

const Signup = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [error,setError] = useState(null)


    // USER ALREADY LOGGED IN THEN REDIRECT TO HOME
    useEffect(()=>{
        const user = localStorage.getItem("User")
        if(user){
            navigate('/')
        }
    },[])


    // USED FOR BUG FIXING
    useEffect(()=>{
        setError(null)
    },[email,password,confirmPassword])


    // USER SIGNUP
    const handleSignUp = async()=>{
        setError(null)
        try{
            if(password !== confirmPassword){
                setError('Password and confirm password mismatch')
                return;
            }

            const {API_Register_User} = Endpoints
            const {data} = await axios.post(API_Register_User,{email,password})
            console.log("Response: ",data)
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
    <div className='m-32 ml-64 mt-28 w-1/2  form p-4'>
        <Typography variant='h4' sx={{marginBottom:'10px'}}> Planner</Typography>
        <div>
            <Typography variant='h5'>Signup page</Typography>
            <div className='m-2'>
                <Typography variant='h6'>Email</Typography>
                <TextField  placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className='m-2'>
                <Typography variant='h6'>Password</Typography>
                <TextField placeholder='password' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className='m-2'>
                <Typography variant='h6'>Confirm Password</Typography>
                <TextField placeholder='confirm password' type='password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            </div>
            <Button variant='contained' sx={{marginLeft:'10px'}} onClick={handleSignUp}>Sign up</Button>
            <Typography>Already have an account, please {` `}
                <span><Link to='/login' style={{color:'blue'}}>Login</Link></span>   
            </Typography>
        </div>
        <CustomizedSnackbar error={error} setError={setError}/>
    </div>
  )
}

export default Signup



