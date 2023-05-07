import { createContext, useEffect, useState } from "react";
import { auth } from '../../config/firebase'
import { onAuthStateChanged } from "firebase/auth";
const UserContext = createContext()

const Provider = UserContext.Provider

export const UserProvider = ({children})=>{
  const intialState = {
    isLoggedIn: false,
    email: null,
    isAdmin: false
  }

  const [user, setUser] = useState(intialState)

  useEffect(()=>{
    onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser({
          ...user,
          isLoggedIn: true,
          email: userData.email,
          isAdmin: true
        })
      } else {
        setUser(intialState)
      }
    });
  },[])
  
  return(
    <>
      <Provider value={user}>
        {children}
      </Provider>
    </>
  )
}


export default UserContext