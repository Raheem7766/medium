import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { PiNotePencil } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GoArrowUpRight } from "react-icons/go";
import { auth } from '../Header/Login/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Sidebar from './Sidebar';
import { useDialog } from '../context/context';
import { Link } from 'react-router-dom';

export default function MainNav() {
    const [isFocused, setIsFocused] = useState(false);
    const [userData, setuserData] = useState({})
    const [user] = useAuthState(auth);
    const [photoURL, setPhotoURL] = useState(null);

    const { isSidebarOpen, toggleSidebar, searchQuery, setSearchQuery } = useDialog()

    console.log(user);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    useEffect(() => {
        if (user && user.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user]);

    return (
        <>
            <Box className="Mainnav">
                <Box sx={{ height: "40px", width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center', gap: '5px', }}>
                    <Typography variant='h2' sx={{ fontSize: '13px', color: '#191919', fontWeight: '400' }}>Open in app</Typography>
                    <GoArrowUpRight size={15} />
                </Box>
            </Box>
            <Box sx={{ height: '57px', width: '100%', backgroundColor: 'white', border: '1px solid #F2F2F2', display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ height: '100%', width: 'max-content', backgroundColor: "", display: 'flex', alignItems: 'center', paddingLeft: { xl: '2%', lg: '2%', md: '2%', sm: "4%", xs: '2%' }, gap: '20px' }}>
                    <Link to='/medium'>
                        <Typography variant="h2" sx={{ fontSize: '30px', fontWeight: '700', color: '#191919', cursor: 'pointer' }}>Medium</Typography>
                    </Link>

                    <Box className="Pinput" onClick={handleFocus} sx={{ height: '38px', width: 'max-content', backgroundColor: '#F9F9F9', borderRadius: '40px', display: 'flex', alignItems: 'center', paddingLeft: '10px', gap: '5px' }}>
                        <CiSearch size={25} style={{ color: isFocused ? 'black' : '#8E8E8E' }} />
                        <input className={isFocused ? 'focused' : 'black'} onFocus={handleFocus} onBlur={handleBlur} placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ height: '100%', outline: "none", backgroundColor: 'transparent', color: isFocused ? 'black' : '#8E8E8E' }} />
                    </Box>
                </Box>
                <Box className="right" sx={{ height: '100%', width: 'max-content', backgroundColor: '', display: 'flex', alignItems: 'center', justifyContent: "flex-start", gap: '35px', paddingRight: '35px' }}>
                    <Link to="/edit">
                        <Box>
                            {/* <CiSearch className='search' size={25} style={{ color: isFocused ? 'black' : '#8E8E8E' }} /> */}
                            <Box sx={{ display: 'flex', alignItems: 'center', color: "#747474", cursor: 'pointer' }} className=''>
                                <PiNotePencil size={25} style={{ "&:hover": { color: 'black' } }} />
                                Write
                            </Box>
                        </Box>
                    </Link>
                    <IoIosNotificationsOutline size={30} color='#747474' cursor="pointer" />
                    {user && user.photoURL ? (
                        <Box onClick={toggleSidebar} sx={{ height: '33px', width: '33px', cursor: 'pointer', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                            <img
                                src={user.photoURL}
                                alt="User Profile"
                                style={{ height: '100%', width: '100%', borderRadius: '50%' }}
                            />
                        </Box>
                    ) : (
                        <span>No Image</span>
                    )}
                    {isSidebarOpen && (
                        <Box className="Sidebar" sx={{ height: '87vh', width: '265px', backgroundColor: 'white', boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", position: 'absolute', top: '50px', right: "31px" }}>
                            <Sidebar />
                        </Box>
                    )}
                </Box>
            </Box>
        </>
    )
}
