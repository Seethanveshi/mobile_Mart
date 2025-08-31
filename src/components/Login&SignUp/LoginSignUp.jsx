import { useState } from 'react'
import '../../App.css'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { useSelector } from 'react-redux'

function LoginSignUp() {
  
  const isActive = useSelector((state) => state.activePage);

  return (
    <div style={{boxSizing:'border-box' , marginTop:'5rem' , height:'89vh', display:'flex' , alignItems:'center' , justifyContent:'center'}}>
      <div className='Login_SignUp_Page' > 
          <div className={`slider ${isActive == 'Login' ? 'Active' : ''}`}></div>
          <Login />
          <SignUp />
      </div>
    </div>
  )
}

export default LoginSignUp
