import React, { useEffect, useState } from 'react'
import InputBox from '../InputBox/InputBox'
import { useDispatch , useSelector } from 'react-redux';
import { updateActivePage } from '../../ReduxtoolKit/Slice/Slice';
import authService from '../../Auth/Auth';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../../ReduxtoolKit/Slice/authThunk';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

function Login() {

    const navigate = useNavigate();

    const [Email , setEmail] = useState('');
    const [Password , setPassword] = useState('');

    const isActive = useSelector((state) => state.activePage);
    const dispatch = useDispatch();

    const authData = useSelector((state) => state.authService);


    const LoginHandler = async (e) =>{
        e.preventDefault();

        try {
            await authService.loginUser({Email , Password});
            const data = await authService.getCurrentUser();
            dispatch(LoginUser(data));
            
            console.log(data);
            
            setEmail('');
            setPassword('');
            
            navigate('/Home');
            
            
        } catch (error) {
            if(error.code === 401){
                document.querySelector('.Error').innerHTML = 'Invalid Credentials. Check Email and Password';
            }

            console.log(error.code);
        }

    }


  return (
    <>
        <div>
            {
                isActive == 'Login' ? <div className={`Login_Form ${isActive=='Login' ? 'Active' : ''}`}>
                <form onSubmit={LoginHandler}>
                    {/* <div style={{color:'black' , fontSize:20 , fontWeight:'bold'}}>Welcome Back!</div> */}
                    <h3 style={{color:'black' , fontWeight:'bold' , fontSize:'20px'}}>Login</h3>
                    <div className='Error' style={{color:'red'}}></div>
                    <div className='Login_Fields'>
                        <div>
                            <InputBox value = {Email} onValueChange={setEmail} type='email' placeHolder='Email' />
                        </div>
                        <div>
                            <InputBox value = {Password} onValueChange={setPassword} type='password' placeHolder='Password' />
                        </div>
                        <div style={{textAlign:'right'}}>
                            <button style={{fontSize:14 , color:'black' , background:'none' , border:'none'}}>
                                Forget Password
                            </button>
                        </div>
                        <div>
                            <button className='Login_Button' type='submit'>
                                Login
                            </button>
                        </div>
                    </div>
                    <div style={{padding:20}}>
                        <button onClick={() => navigate('/Home')} style={{background:'none' , border:'none' , color:'darkblue' , fontWeight:'bold'}}>
                            Continue Without Login
                        </button>
                    </div>
                </form>
            </div>
            
            :

            <div className="Login_Form_notActive">
                <div style={{fontSize:'20px'}}>Welcome Back!</div>
                <div style={{textAlign:'center' , padding:'18px 40px'}}>Keep connect with us please login with your personal info</div>
                <button onClick={() => {dispatch(updateActivePage('Login'))}} className='Login_Button_notActive' type="button">Login</button>
            </div> 
            }  
        </div>
    </>
  )
}

export default Login