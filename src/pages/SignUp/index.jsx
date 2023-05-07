import React from 'react'
import style from '../../assets/styleSheets/authenticationForm.module.css'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import useAuthentication from '../../hooks/useAuthentication';

function SignUp() {
  const { register , handleSubmit, watch, formState: { errors }} = useForm();
  
  const {handleSignUp} = useAuthentication()

  const error = (fieldName)=>{
    const errorType = errors[fieldName]
    if(errorType){
      switch (errorType.type) {
        case 'required':
          return `${fieldName} is required.`;
        case 'minLength':
          return `${fieldName} length must be grater then equal to 6.`
        case 'pattern':
          return `${fieldName} should be valid.`
        case 'validate':
          return `password must be same.`
        default:
          return 'unkown error.';
      }
    }
  }

  const passwordMatch = (data)=>{
    const password = watch('password')
    return data === password
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className={`card ${style['authentication-card']}`}>
            <h2 className="card-title text-center">Sign Up</h2>
            <div className="card-body py-md-4">
              <form onSubmit={handleSubmit(handleSignUp)}>
                <div className={`form-group ${style['authentication-form-group']}`}>
                  <input type="email" {...register('email', {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})} className={`form-control ${style['authentication-form-control']}`} placeholder="Email"/>
                  <span className={`${style['authentication-error']}`}>{error('email')}</span>
                </div>
                <div className={`form-group ${style['authentication-form-group']}`}>
                  <input type="password" {...register('password', {required: true, minLength: 6})} autoComplete="true" className={`form-control ${style['authentication-form-control']}`} placeholder="Password"/>
                  <span className={`${style['authentication-error']}`}>{error('password')}</span>
                </div>
                <div className={`form-group ${style['authentication-form-group']}`}>
                  <input type="password" {...register('passwordConfirmation', {required: true, validate: passwordMatch})} autoComplete="true" className={`form-control ${style['authentication-form-control']}`} placeholder="confirm-password"/>
                  <span className={`${style['authentication-error']}`}>{error('passwordConfirmation')}</span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <Link to="/sign-in">Have account ?, Sign In</Link>
                  <button className="btn btn-primary">Sign Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
