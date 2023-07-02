import React from 'react'
import {Link,useNavigate} from 'react-router-dom'


const Layout = ({Children}) => {

    let user = JSON.parse(localStorage.getItem("User"));
    let email = '';
    if(user) email = user.email
    const navigate = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem("User");
        navigate('/login')
    }



  return (
    <div>
        {/* NAVBAR */}
        <div className='h-16 border bg-slate-200  flex justify-between content-center items-center'>
            <Link to='/'>
                <p className="app_name">Life Planner</p>
            </Link>
            <div className='flex justify-between w-64 '>
                <h6>{email}</h6>
                <div className='cursor-pointer hover:font-bold' onClick={handleLogout}>Logout</div>
            </div>
        </div>
        <div>
            {Children}
        </div>
    </div>
  )
}

export default Layout