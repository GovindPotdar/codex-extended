import React from 'react'
import { Routes, Route} from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import AuthenticationComponent from '../AuthenticationComponent'
import Home from '../../pages/Home'
import SignIn from '../../pages/SignIn'
import SignUp from '../../pages/SignUp'
import NewProblem from '../../pages/Problem/New'
import NavBar from '../../components/NavBar'
import Solve from '../../pages/Solve'

function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<NavBar/>}>
        <Route
          index
          element={<ProtectedRoute><Home/></ProtectedRoute>}
          />
        <Route path='/problems'>
          <Route 
            path='new'
            exact
            element={<ProtectedRoute><NewProblem/></ProtectedRoute>}
          />
          <Route 
            path=':problemId/solve'
            exact
            element={<ProtectedRoute><Solve/></ProtectedRoute>}
          />
        </Route>
      </Route>
      <Route
      path='/sign-up'
      element={<AuthenticationComponent><SignUp/></AuthenticationComponent>}
      exact
      />
      <Route
      path='/sign-in'
      element={<AuthenticationComponent><SignIn/></AuthenticationComponent>}
      exact
      />
    </Routes>
  )
}

export default AppRoute
