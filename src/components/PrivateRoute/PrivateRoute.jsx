import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const status = useSelector(state => state.authService.status);
  return status ? children : <Navigate to='/LoginSignUp' />
};

export default PrivateRoute;