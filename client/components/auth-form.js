import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Navbar from './navbar'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <Navbar />
      {name === 'signup' ? (
        <div className="signuplogin">
          <img className="logo" />
          <h3>Create Account</h3>
          <form className="signup" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="firstName">
                <small>First Name:</small>
              </label>
              <input name="firstName" type="text" />
            </div>
            <div>
              <label htmlFor="lastName">
                <small>Last Name:</small>
              </label>
              <input name="lastName" type="text" />
            </div>
            {/* EMAIL */}
            <div>
              <label htmlFor="email">
                <small>Email:</small>
              </label>
              <input name="email" type="text" />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password">
                <small>Password:</small>
              </label>
              <input name="password" type="text" />
            </div>
            <div>
              <Link className="google" to="/auth/google">
                {displayName} with Google
              </Link>
            </div>
            <div>
              <button type="submit">Create your SLOFlix account</button>
            </div>
          </form>
          <Link to="/login">Already have an account with SLOFlix?</Link>
        </div>
      ) : (
        <div className="signuplogin">
          <img className="logo" />
          <h3>Sign in to SLOFlix</h3>
          <form className="login" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input name="email" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <div>
              <Link className="google" to="/auth/google">
                {displayName} with Google
              </Link>
            </div>
            <div>
              <button type="submit">Sign In</button>
            </div>
          </form>

          <h3>---New to SLOFlix?---</h3>
          <Link to="/signup">Create Account with SLOFlix</Link>
        </div>
      )}
      {error && error.response && <div> {error.response.data} </div>}
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      console.log(formName)
      const email = evt.target.email.value
      const password = evt.target.password.value
      evt.target.firstName
        ? dispatch(
            auth(
              email,
              password,
              formName,
              evt.target.firstName.value,
              evt.target.lastName.value
            )
          )
        : dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
