import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import useAuthentication from '../../hooks/useAuthentication'

function NavBar() {
  const user = useContext(UserContext)

  const { handleSignOut } = useAuthentication()

  return (
    <>
      <ul className="nav bg-primary justify-content-center sticky-top">
        <li className="nav-item">
          <Link to='/' className="nav-link active text-light">Hello, {user.email} !</Link>
        </li>
        
        <li className="nav-item">
          <span className="nav-link active text-light" type='button' onClick={handleSignOut}>SignOut</span>
        </li>
      </ul>
      <Outlet/>
    </>
  )
}

export default NavBar
