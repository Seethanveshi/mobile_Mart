import { useEffect, useState } from 'react'
import '../../CSS/LoginandSignUp.css'
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import { useDispatch , useSelector } from 'react-redux'
import { updateActivePage } from '../../ReduxtoolKit/Slice/Slice';

function LoginSignUp() {

  const [page , setPage] = useState('Login');
  
  const isActive = useSelector((state) => state.activePage);
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(isActive);
  } , [isActive])

  const handlestateButton = () => {
    if(page == 'Login'){
      dispatch(updateActivePage('SignUp'));
      setPage('SignUp')
    }
    else{
      dispatch(updateActivePage('Login'));
      setPage('Login');
    }
  }

  return (
    <div className='loginandSignUppage'>
      <div className='Login_SignUp_Page' > 
          <div className={`slider ${isActive == 'Login' ? 'Active' : ''}`}></div>
          <Login />
          <SignUp />
      </div>

      <div>
        <div className='LoginAndSignUpPage' >
            {
              page == 'Login' ? <Login /> : <SignUp />
            }
            <div className='statement'>
              {page == 'Login' ? 'newUser?' : 'Already Have an account?'}
              <button className='stateButton'
                onClick={() => handlestateButton()}
              >{page == 'Login' ? 'Register' : 'Login'}</button>
            </div>
              
        </div>
      </div>
    </div>

  )
}

export default LoginSignUp
