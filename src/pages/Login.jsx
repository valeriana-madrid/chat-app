import { Box, Typography, Button, TextField } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { passwordValidation, usernameValidation } from '../utility/inputValidations'
import api from '../configs/api'
import { useUser } from '../contexts/UserContext'

const Login = () => {
    const nav = useNavigate()
    const { setToken } = useUser()

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, },
    } = useForm()

    const onSubmit = (data) => {
        api.post('/login', data)
            .then(res => {
                const data = res.data
                localStorage.setItem('token', data.token)
                setToken(data.token)
                nav('/chats')
            }).catch(err => {
                const res = err.response
                setError(res.data.field, { type: 'validate', message: res.data.message })
            })
    }

    return (
        <Box sx={{ width: 300, m: 'auto', mt: 10 }}>
            <Typography variant='h4' mb={2}>
                Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={errors?.username?.message ? true : false}
                    id="outlined-text"
                    label="Username"
                    placeholder='Enter Username'
                    fullWidth
                    {...register('username', usernameValidation)}
                />
                <Typography color='error'>{errors?.username?.message}</Typography>
                <TextField
                    error={errors?.password?.message ? true : false}
                    id="outlined-text"
                    label="Password"
                    placeholder='**********'
                    fullWidth
                    {...register('password', passwordValidation)}
                />
                <Typography color='error'>{errors?.password?.message}</Typography>
                <Button type="submit" sx={{ mt: 5 }} variant='contained' fullWidth>Submit</Button>
            </form>
            <Link to='/register'>Don't have an account?</Link>
        </Box>
    )
}

export default Login