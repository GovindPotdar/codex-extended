import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'

function AuthenticationComponent({children}) {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(user.isLoggedIn){
      navigate(-1)
    }
  })

  return(
    <>
    {children}
    </>
  )
}

export default AuthenticationComponent
