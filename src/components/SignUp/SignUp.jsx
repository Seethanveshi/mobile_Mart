import React, { useActionState, useEffect, useState } from 'react'
import InputBox from '../InputBox/InputBox'
import { useDispatch , useSelector } from 'react-redux';
import { updateActivePage } from '../../ReduxtoolKit/Slice/Slice';
import authService from '../../Auth/Auth';
import { LoginRedux , PasswordValid , LogOutRedux } from '../../ReduxtoolKit/Slice/authSlice';
import '../../CSS/LoginandSignUp.css';


function SignUp() {

    const [Name , setName] = useState('');
    const [Email , setEmail] = useState('');
    const [Password , setPassword] = useState('');
    const [ConfirmPassword , setConfirmPassword] = useState('');
    const [Loading , setLoading] = useState(false);
    

   const isActive = useSelector((state) => state.activePage);
   const Dispatch = useDispatch();

   const authData = useSelector((state) => state.authService);

    const SignUpHandler = async (e) =>{
        e.preventDefault();

        Dispatch(PasswordValid(Password));

        if(authData.passwordValid == false) {
            document.querySelector('.Error').innerHTML = "Password must be at least 8 Characters";
            setPassword('');
            setConfirmPassword('');
            return ;
        }


        else if(Password !== ConfirmPassword){
            alert("password and ConfirmPassword not same");
            setPassword('');
            setConfirmPassword('');
            return ;
        }

        try{
            setLoading(true);
            const session = await authService.createAccount({Email , Password , Name});
            const data = await authService.getCurrentUser();
            Dispatch(LoginRedux(data));
            setLoading(false);
            alert("SignUp Sucessful");
            

            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');

        }
        catch(error){
            setLoading(false);
            if(error.code === 409){
                document.querySelector('.Error').innerHTML = "User already exists. Try logging in instead.";
            }
        }
    }

  return (
    <>
        <div>

            {isActive == 'SignUp' ? 
            
            <div className='SignUp_Form'>
                <form onSubmit={SignUpHandler}>
                    {/* <div style={{color:'black' , fontSize:20 , fontWeight:'bold'}}>Welcome</div> */}
                    <h3 style={{color:'black' , fontSize:'20px'}}>SignUp</h3>
                    <div className='Error' style={{color:'red'}}></div>
                    <div className='SignUp_Fields'>
                        <div>
                            <InputBox value={Name} onValueChange={setName} type='text' placeHolder='Full Name'/>
                        </div>
                        <div>
                            <InputBox value = {Email} onValueChange={setEmail} type='email' placeHolder='Email' />
                        </div>
                        <div>
                            <InputBox value = {Password} onValueChange={setPassword} type='password' placeHolder='Password' />
                        </div>
                        <div>
                            <InputBox value={ConfirmPassword} onValueChange={setConfirmPassword} type='password' placeHolder='Confirm Password' />
                        </div>
                        <div>
                            <button className='SignUp_Button' type='submit'>
                                {
                                    Loading ? <div style={{display:'flex' , justifyContent:'center' , alignItems:'center'}}>
                                                    <div className='Spinner_LoginSignUp'></div>
                                                </div>
                                                : 'SignUp'
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            :

            <div className={'SignUp_Form_notActive'}>
                <div style={{fontSize:'20px'}}>Hello, User</div>
                <div style={{textAlign:'center' , padding:'18px 40px'}}>Enter your details and start journey with us</div>
                <button onClick={() => {Dispatch(updateActivePage('SignUp'))}} className='SignUp_Button_notActive' type="button">Register</button>
            </div>

        }

        </div>
    </>
  )
}

export default SignUp;