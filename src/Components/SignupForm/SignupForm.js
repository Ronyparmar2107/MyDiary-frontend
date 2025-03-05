import React, { useState } from 'react'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';


const SignupForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isNameValid, setIsNameValid] = useState(true)
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true)
    const [userOTP, setUserOTP] = useState('')
    const [serverOTP, setServerOTP] = useState('')
    const [isOtpValid, setIsOtpValid] = useState(true)
    const [open, setOpen] = useState(false)

    const nameValidator = "^[a-zA-Z.,?\\s]*$";
    // eslint-disable-next-line
    const emailvalidator = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$";

    const submitHandler = async () => {
        if (name.length <= 5 || password.length <= 5 || email === '' || isEmailValid === false || isNameValid === false || isPasswordValid === false || isConfirmPasswordValid === false) {

            alert('Please ENter valid details')
        }
        else {
            let user = {
                name: name,
                email: email,
                password: password
            }
            const response = await fetch("http://localhost:3001/api/auth/createuser", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })

            let data = await response.json()
            // console.log(data)
            if (data.success) {
                localStorage.clear()
                localStorage.setItem('authtoken', data.authtoken)
                setEmail('')
                setPassword('')
                props.setLogin()
            }

            // console.log(user)

            setEmail('')
            setName('')
            setPassword('')
            props.setLogin()
        }
    }


    const getOTP = async () => {
        let user = {
            name: name,
            email: email,
            password: password
        }

        const responseOTP = await fetch("http://localhost:3001/api/auth/getotp", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })

        let otp = await responseOTP.json()
        // console.log(otp)
        setServerOTP(otp.data.otp)
        setOpen(true)
    }

    return (
        <div className='form-maincontainer' >
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Enter OTP</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Check Your Email for the OTP.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="otp"
                        name="otp"
                        label="Enter OTP"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={userOTP}
                        onChange={(e) => {
                            setUserOTP(e.target.value)
                        }}
                    />
                    {!isOtpValid && <span>OTP Invalid. Try Again</span>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit"
                        onClick={() => {
                            if (userOTP === serverOTP) {
                                // console.log(userOTP)
                                submitHandler()
                            }
                            else setIsOtpValid(false)
                        }}>submit</Button>
                </DialogActions>
            </Dialog>



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

                <p>Confirm Password</p>
                <input type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value)
                        if (e.target.value.length < 5 || e.target.value !== password) {
                            setIsConfirmPasswordValid(false)
                        }
                        else {
                            setIsConfirmPasswordValid(true)
                        }
                    }} />
                {!isConfirmPasswordValid && <span>Password not matching</span>}

            </div>
            <button onClick={getOTP}> Sign-Up</button>
        </div>
    )
}

export default SignupForm