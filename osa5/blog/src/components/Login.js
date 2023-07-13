import PropTypes from 'prop-types'
import React from 'react'

const Login = ({ handleLogin,username,setUsername,
  password,setPassword }) => {

  return (
    <form onSubmit={handleLogin} className='login-form'>
      <h3>Login</h3>
      <div className='login'>
        <label htmlFor="username">username</label>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder='Username'
          onChange={({ target }) => setUsername(target.value)}
          id="username"></input>
      </div>
      <div className='login'>
        <label htmlFor="password">password</label>
        <input
          type='password'
          value={password}
          placeholder='Password'
          name='Password'
          id="password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id="loginBtn" type='submit'>login</button>

    </form>
  )
}

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default Login