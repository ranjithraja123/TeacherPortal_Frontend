import React, { useState } from 'react'
import { Typography, Box, TextField, Button, Link, FormControl, FormGroup, FormLabel, FormHelperText } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useSignup from '../../hooks/useSignup.js';
// import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {

    const { loading, signup } = useSignup()

    const [inputs, setInputs] = useState({
        name:'',
        email:'',
        password:'',
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs, 'qazwsx');
        await signup(inputs)
        localStorage.setItem("teacher", JSON.stringify(inputs))

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
                borderRadius: '8px',
              
            }}>
            <Typography
                variant="h4"
                sx={{ mx: 'auto',   fontWeight:'bold' }}
            >
                Teacher Signup
            </Typography>        
            <FormControl fullWidth margin="normal">
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <TextField
                    id="fullName"
                    placeholder="Enter Full Name"
                    variant="outlined"
                    required
                    value={inputs.name}
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}                />
            </FormControl>

            <FormControl fullWidth margin="normal">
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                    id="email"
                    placeholder="Enter Email"
                    type="email"
                    variant="outlined"
                    required
                    value={inputs.email}
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
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
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
            </FormControl>

            <Box mt={2}>
                <Link
                    to="/"
                    variant="body2"
                    component={RouterLink}
                    sx={{ display: 'inline-block', mt: 2, ':hover': { textDecoration: 'underline', color: 'blue' } }}
                >
                    Already have an account?
                </Link>
            </Box>

            <Box mt={2}>
                <Button fullWidth variant="contained" color="primary" size="large" type="submit">
                    Sign Up
                </Button>
            </Box>
        </Box>
        </>
       
    )
}

export default Signup
