
const Login = ({handleLogin,username,setUsername,
                password,setPassword}) => {

    return (
        <form onSubmit={handleLogin} className='login-form'>
            <h3>Login</h3>
            <div className='login'>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => setUsername(target.value)}></input>
            </div>
            <div className='login'>
                password
                <input
                type='password'
                value={password}
                name='Password'
                onChange={({ target }) => setPassword(target.value)} />
            </div>
            <button type='submit'>login</button>

        </form>
    )
}

export default Login;