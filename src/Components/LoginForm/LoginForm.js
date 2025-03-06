import React, { useState } from 'react'
import '../Form.css'
import backend_url from '../../env_variables'
import { CircularProgress } from '@mui/material'

const LoginForm = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [loading, setLoading] = useState(false)

    // eslint-disable-next-line
    const emailvalidator = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

    const submitHandler = async () => {
        if (password.length <= 5 || email === '' || isEmailValid === false || isPasswordValid === false) {

            alert('Please ENter valid details')
        }
        else {
            setLoading(true)
            let userCreds = {
                email: email,
                password: password
            }

            // const response = await fetch('http://localhost:3001/api/auth/login', {
            const response = await fetch(`${backend_url}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userCreds)
            })

            const data = await response.json()
            // console.log(data)
            if (data.success) {
                localStorage.clear()
                localStorage.setItem('authtoken', data.authtoken)
                setEmail('')
                setPassword('')
                props.setLogin()
            }
            setLoading(false)
        }
    }
    return (
        <div className='form-maincontainer'>
            <div className='input-elements-maincontainer'>
                <p>Email</p>
                <input type='email'
                    placeholder='Your Registered Email'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (!email.match(emailvalidator)) {
                            setIsEmailValid(false)
                        }
                        else {
                            setIsEmailValid(true)
                        }
                    }} />
                {!isEmailValid && <span>Please Enter a Valid Email</span>}

                <p>Password</p>
                <input type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        if (password.length < 5) {
                            setIsPasswordValid(false)
                        }
                        else {
                            setIsPasswordValid(true)
                        }
                    }} />
                {!isPasswordValid && <span>Please Enter a Valid Password</span>}
            </div>

            {loading ? <div style={{ height: '35px;', margin: '20px 0' }}><CircularProgress size={'2rem'} /></div> : <button disabled={loading} onClick={() => {
                submitHandler()
            }}> Log-In</button>}
        </div>
    )
}

export default LoginForm