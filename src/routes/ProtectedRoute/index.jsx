import React from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'

function ProtectedRoute({children}) {
  const user = useContext(UserContext)


  if(!user.isLoggedIn){
    return <Navigate to='/sign-up'/>
  }

  return(
    <>
    {children}
    </>
  )
}

export default ProtectedRoute
