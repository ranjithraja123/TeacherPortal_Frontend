import React, { useState } from 'react'
import { useTheme, Grid, Drawer, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useMediaQuery } from '@mui/material';
import useLogout from '../../hooks/useLogout';
import { Navigate, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));


    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const { loading, logout } = useLogout()
    const navigate = useNavigate();

    const onLogout = () => {
        logout()
        navigate('/')

    }

    return (
        <div className=' relative overflow-hidden bg-black' style={{ backgroundColor: 'black', color: 'white' }} >
            <Grid container justifyContent="space-between" sx={{ padding: '13px' }} className='w-full rounded-lg shadow-lg'>
                <Grid item className='flex text-black items-center font-3xl font-bold'>
                    {/* <img src={brew} width={100} alt="Brew" /> */}
                    <h1 className='text-3xl' style={{ fontStyle: 'italic' }}>
                        Teacher's Portal
                    </h1>
                </Grid>


                {/* Burger Icon for Mobile View */}
                {isMobile && (
                    <Grid item className='md:hidden flex items-center'>
                        <IconButton onClick={toggleMenu} className='text-white'>
                            {isOpen ? <FaTimes size={24} /> : <FaBars color='white' size={24} />}
                        </IconButton>
                    </Grid>
                )}

                {/* Drawer */}
                <Drawer
                    anchor='right'
                    open={isOpen}
                    onClose={toggleMenu}
                >
                    <div className='flex flex-col h-full p-4' >
                        <IconButton onClick={toggleMenu} className='self-end text-white'>
                            <FaTimes size={24} />
                        </IconButton>
                        <List>
                            <ListItem button onClick={toggleMenu}>
                                <a href="/dataTable" style={{ textDecoration: 'none', color: 'black' }}>
                                    <ListItemText primary="Home" style={{ fontWeight: 'bold' }} />
                                </a>
                            </ListItem>

                            <ListItem button onClick={onLogout}>
                                <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
                                    <ListItemText primary="Logout" style={{ fontWeight: 'bold' }} />
                                </a>
                            </ListItem>
                        </List>

                    </div>
                </Drawer>

                {/* Navbar Links for Desktop View */}
                <Grid
                    item
                    sx={{
                        display: { xs: 'none', md: 'flex' },
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 4,
                        fontWeight: 'bold',
                        fontSize: '20px',
                        color: 'black',
                        padding: '10px'
                    }}
                >
                    <ul style={{ display: 'flex', gap: '16px', listStyle: 'none', margin: 0 }}>
                        <li>
                            <a href="/dataTable" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '20px', color: 'white' }}>
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '20px', color: 'white' }} onClick={onLogout}>
                                Logout
                            </a>
                        </li>
                    </ul>
                </Grid>


            </Grid>
        </div>
    )
}

export default NavBar
