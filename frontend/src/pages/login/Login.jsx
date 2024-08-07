import React, { useState } from 'react'
import { Typography, Box, TextField, Button, Link, FormControl, FormGroup, FormLabel, FormHelperText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import useLogin from '../../hooks/useLogin.js';
import toast from 'react-hot-toast';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext()


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, login } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        // localStorage.setItem("org1-app", JSON.stringify(data))

        // setAuthUser()
        console.log('here')

        // const user = localStorage.getItem("org-app-login")
        // console.log(user.,'hereim')
        console.log(authUser.message, 'hereim1')

        // if(authUser.message === "Teacher logged in"){
        //     navigate('/dataTable')
        // }




    }

    return (
        <>
            <Typography
                variant="h4"
                sx={{
                    mx: 'auto', display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                      marginTop:'100px',
                    marginBottom:'50px',
                    fontWeight:'bold'
                }}
            >
                TailWebs
            </Typography>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // height: '100vh',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}        >
                <Typography
                    variant="h4"
                    sx={{ mx: 'auto', fontWeight:'bold' }}
                >
                    Teacher Login
                </Typography>


                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        id="email"
                        placeholder="Enter Email"
                        type="email"
                        variant="outlined"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <TextField
                        id="password"
                        placeholder="Enter Password"
                        type="password"
                        variant="outlined"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>

                <Box mt={2}>
                    <Link
                        to="/signup"
                        variant="body2"
                        component={RouterLink}
                        sx={{ display: 'inline-block', mt: 2, ':hover': { textDecoration: 'underline', color: 'blue', cursor: 'pointer' } }}
                    >
                        Create an account?
                    </Link>
                </Box>

                <Box mt={2}>
                    <Button fullWidth variant="contained" color="primary" size="large" type="submit">
                        Login
                    </Button>
                </Box>
            </Box></>

    )
}

export default Login
