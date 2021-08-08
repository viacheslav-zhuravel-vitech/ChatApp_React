import React, {useState} from 'react'
import loginPageStyle from './login-page.module.scss'


const Login = () => {

    let [loginData, changeLoginData] = useState({
        email: '',
        password: ''
    })
    let [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()
        const { password, confirmPassword } = signUpData

        if (password !== confirmPassword) {
            alert('password dont match')
            return
        }
       // asyncCeateAndSetCurrentUser(signUpData)
    }

    const handleSubmitLogin = async e => {
        debugger
        e.preventDefault()
        const { email, password } = loginData
      //  asyncLoginAndSetCurrentUser(email, password)
        changeLoginData({ email: '', password: '' })
    }

    const handleChangeLogin = e => {
        const { value, name } = e.target
        changeLoginData({...loginData, [name]: value })
    }

    const handleChange = e => {
        const { name, value } = e.target
        setSignUpData({ ...signUpData, [name]: value })
    }

    return(
        <div>
            <form onSubmit={handleSubmitLogin}>
                <h1>Super Chat App</h1>
                <h2>I already haw an account</h2>
                <span> Log in with your email and password </span>
                <input
                    name ='email'
                    type ='email'
                    value ={loginData.email}
                    onChange= {handleChangeLogin}
                    placeholder ='email'
                    required
                />
                <input
                    name ='password'
                    type ='password'
                    value = {loginData.password}
                    onChange= {handleChangeLogin}
                    placeholder ='password'
                    required
                />
                <button
                    type = 'submit'
                    disabled = {false}
                >
                    Log In
                </button>
            </form>
            <form onSubmit={handleSubmit}>
                <h2>Or</h2>
                <span> Create new account with email and password </span>
                <input
                    type='email'
                    name='email'
                    value={signUpData.email}
                    onChange={handleChange}
                    placeholder='Email'
                    required
                />
                <input
                    type='password'
                    name='password'
                    value={signUpData.password}
                    onChange={handleChange}
                    placeholder='Password'
                    required
                />
                <input
                    type='password'
                    name='confirmPassword'
                    value={signUpData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Confirm Password'
                    required
                />
                <button
                    type = 'submit'
                    disabled = {false}
                >
                    Create
                </button>
            </form>
        </div>
    )
}

export default Login