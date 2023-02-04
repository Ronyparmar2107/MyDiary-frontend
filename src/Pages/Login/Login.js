import React, { useState } from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'
import SignupForm from '../../Components/SignupForm/SignupForm'
import './Login.css'


const Login = (props) => {
    const [NavigationState, setNavigationState] = useState('login')
    const logInHandlerfunction = () => {

        props.login()
    }
    return (
        <div className='login-maincontainer'>
            <div className='login-signup-option-container'>
                <button className={NavigationState === 'login' ? 'active' : ''} onClick={() => { setNavigationState('login') }}>Login</button>
                <button className={NavigationState === 'signup' ? 'active' : ''} onClick={() => { setNavigationState('signup') }}>Signup</button>
            </div>
            <div className='connecting-line'></div>
            {NavigationState === 'login' ? <LoginForm setLogin={logInHandlerfunction} /> : <SignupForm setLogin={logInHandlerfunction} />}
        </div>
    )
}

export default Login