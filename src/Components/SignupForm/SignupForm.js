import React, { useState } from 'react'

const SignupForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isNameValid, setIsNameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const nameValidator = "^[a-zA-Z.,?\\s]*$";
    // eslint-disable-next-line
    const emailvalidator = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

    const submitHandler = () => {
        if (name.length <= 5 || password.length <= 5 || email === '' || isEmailValid === false || isNameValid === false || isPasswordValid === false) {

            alert('Please ENter valid details')
        }
        else {
            let user = {
                name: name,
                email: email,
                password: password
            }
            console.log(user)

            setEmail('')
            setName('')
            setPassword('')
            props.setLogin()
        }
    }

    return (
        <div className='form-maincontainer' >
            <div className='input-elements-maincontainer'>

                <p>Name</p>
                <input type='email'
                    placeholder='Your Name'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        if (!name.match(nameValidator)) {
                            setIsNameValid(false)
                        }
                        else {
                            setIsNameValid(true)
                        }
                    }}
                    onBlur={() => { if (name.length < 5) { setIsNameValid(false) } }} />
                {!isNameValid && <span>Please Enter a Valid Name</span>}

                <p>Email</p>
                <input type='email'
                    placeholder='Your Email'
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
            <button onClick={submitHandler}> Sign-Up</button>
        </div>
    )
}

export default SignupForm