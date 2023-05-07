import React from 'react'
import style from '../../assets/styleSheets/authenticationForm.module.css'
import { Link } from 'react-router-dom'
import useAuthentication from '../../hooks/useAuthentication'
import { useForm } from 'react-hook-form'

function SignIn() {

  const { register , handleSubmit, formState: { errors }} = useForm();
  const { handleSignIn } = useAuthentication()

  const error = (fieldName)=>{
    const errorType = errors[fieldName]
    if(errorType){
      switch (errorType.type) {
        case 'required':
          return `${fieldName} is required.`;
        case 'minLength':
          return `${fieldName} length must be grater then equal to 6.`
        default:
          return 'unkown error.';
      }
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className={`card ${style['authentication-card']}`}>
            <h2 className="card-title text-center">Sign In</h2>
            <div className="card-body py-md-4">
              <form onSubmit={handleSubmit(handleSignIn)}>
                <div className={`form-group ${style['authentication-form-group']}`}>
                  <input type="email" {...register('email',{required: true})} className={`form-control ${style['authentication-form-control']}`} placeholder="Email"/>
                  <span className={`${style['authentication-error']}`}>{error('email')}</span>
                </div>
                <div className={`form-group ${style['authentication-form-group']}`}>
                  <input type="password" autoComplete="true" {...register('password', {required: true, minLength: 6})} className={`form-control ${style['authentication-form-control']}`} placeholder="Password"/>
                  <span className={`${style['authentication-error']}`}>{error('password')}</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Link to="/sign-up">Don't have account ?, Sign Up</Link>
                  <button className="btn btn-primary">Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
