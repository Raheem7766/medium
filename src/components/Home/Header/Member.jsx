import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDialog } from '../context/context';
import { GiStarShuriken } from "react-icons/gi";
import img from '../../../images/1_YhmNsow7HNTf0Wu5raYD8A.png'
import img1 from '../../../images/1_jkCceO96NVJ53K-37LTuyw.png'

export default function Member() {
    const { handleClickOpen } = useDialog();

    return (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <Box sx={{ height: '88px', width: '100%', borderBottom: '1px solid black', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '25px' }}>
                <Typography variant='h2' sx={{ color: 'black', fontSize: '30px', fontWeight: '700', letterSpacing: '0px', cursor: 'pointer' }}>Medium</Typography>
                <Box sx={{ height: '100%', width: 'max-content', display: 'flex', alignItems: "center", justifyContent: 'flex-start', gap: "20px", paddingRight: { xl: '25px', lg: '25px', md: '25px', sm: '10%', xs: '02%' } }}>
                    <Button sx={{ height: '40px', width: "70px", border: "1px solid black", borderRadius: "40px", color: "black", fontSize: '11px' }}>Sign in</Button>
                    <Button onClick={handleClickOpen} sx={{ height: '40px', width: "80px", borderRadius: "40px", color: "white", fontSize: '12px', backgroundColor: 'black' }}>Sign Up</Button>
                </Box>
            </Box>
            <Box sx={{ height: '85.5vh', width: "100%", backgroundColor: 'red', display: 'flex' }}>
                <Box
                    sx={{
                        height: '100%',
                        width: '65.1%',
                        backgroundColor: '#E0EFD1',
                        animation: 'colorChange 60s infinite',
                        '@keyframes colorChange': {
                            '0%': { backgroundColor: '#E0EFD1' },
                            '16.66%': { backgroundColor: '#FFFBF9' },
                            '33.33%': { backgroundColor: '#F8D4F5' },
                            '50%': { backgroundColor: '#FDFDFB' },
                            '66.66%': { backgroundColor: '#FEEDC9' },
                            '83.33%': { backgroundColor: '#E2E9F0' },
                            '100%': { backgroundColor: '#E0EFD1' },
                        },
                    }}
                >
                    <Typography variant='h2' sx={{ fontSize: '85px', fontWeight: '400', color: 'black', paddingLeft: '30px', paddingTop: '55px', letterSpacing: '-3.5px' }}>Support human stories</Typography>
                    <Typography variant='body1' sx={{ fontSize: '22px', fontWeight: '400', color: '#6B6B6B', width: '58%', paddingLeft: '30px', paddingTop: '260px' }}>Become a member to read without limits or ads, fund great writers, and join a global community of people who care about high-quality storytelling.</Typography>
                    <Box>
                        <Button sx={{ height: '43px', width: '120px', backgroundColor: 'black', color: 'white', borderRadius: '40px', marginLeft: '30px', fontSize: '12px', marginTop: '33px' }}>Get Started</Button>
                        <Button sx={{ height: '43px', width: '120px', border: '1px solid black', color: 'black', borderRadius: '40px', marginLeft: '15px', fontSize: '12px', marginTop: '33px' }}>View plans</Button>
                    </Box>
                </Box>

                <Box
                    sx={{
                        height: '100%',
                        width: '533px',
                        backgroundColor: 'blue',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%', 
                            position: 'absolute',
                            animation: 'contentChange 60s infinite',
                            '@keyframes contentChange': {
                                '0%, 16.66%': { opacity: 1, visibility: 'visible' },
                                '16.67%, 33.33%': { opacity: 0, visibility: 'hidden' },
                                '33.34%, 50%': { opacity: 1, visibility: 'visible' },
                                '50.01%, 66.66%': { opacity: 0, visibility: 'hidden' },
                                '66.67%, 83.33%': { opacity: 1, visibility: 'visible' },
                                '83.34%, 100%': { opacity: 0, visibility: 'hidden' },
                            },
                        }}
                    >
                        {/* First content */}
                        <Box sx={{ transition: 'opacity 0.5s ease-in-out' }}>
                            <Box sx={{ height: '61.5%', width: '100%', border: '2px solid black', position: 'relative' }}>
                                <img style={{ height: '100%', width: '100%' }} src={img} alt="" />
                                <Button 
                                    sx={{
                                        height: '35px',
                                        width: '175px',
                                        backgroundColor: '#FFC017',
                                        color: 'black',
                                        borderRadius: '40px',
                                        position: 'absolute',
                                        bottom: '0',
                                        left: '30px',
                                    }}
                                >
                                    <GiStarShuriken style={{ fontSize: '20px' }} />
                                    <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600', marginLeft: '5px' }}>
                                        Member-only story
                                    </Typography>
                                </Button>
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ fontSize: '32px', fontWeight: '400', width: '90%', paddingLeft: '30px', paddingTop: '20px' }}>
                                    The Case For Reforesting Our Cities
                                </Typography>
                                <Box sx={{ marginTop: '55px', display: 'flex' }}>
                                    <Box sx={{ height: '45px', width: '45px', backgroundColor: 'red', borderRadius: '50%', marginLeft: '30px' }}>
                                        <img style={{ height: '100%', width: '100%' }} src={img1} alt="" />
                                    </Box>
                                    <Box sx={{ marginLeft: '20px' }}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Clive Thompson</Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                            Writer and Wired magazine and author for coders
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>

                        {/* Second content */}
                        <Box sx={{ transition: 'opacity 0.5s ease-in-out',position:'absolute', top:'0', left:'0' }}>
                            <Box sx={{ height: '61.5%', width: '100%', border: '2px solid black', position: 'relative' }}>
                                <img style={{ height: '100%', width: '100%' }} src={img} alt="" />
                                <Button
                                    sx={{
                                        height: '35px',
                                        width: '175px',
                                        backgroundColor: '#FFC017',
                                        color: 'black',
                                        borderRadius: '40px',
                                        position: 'absolute',
                                        bottom: '0',
                                        left: '30px',
                                    }}
                                >
                                    <GiStarShuriken style={{ fontSize: '20px' }} />
                                    <Typography variant="body1" sx={{ fontSize: '12px', fontWeight: '600', marginLeft: '5px' }}>
                                        Member-only story
                                    </Typography>
                                </Button>
                            </Box>
                            <Box>
                                <Typography variant="h2" sx={{ fontSize: '32px', fontWeight: '400', width: '90%', paddingLeft: '30px', paddingTop: '20px' }}>
                                    The Case For Our Cities
                                </Typography>
                                <Box sx={{ marginTop: '55px', display: 'flex' }}>
                                    <Box sx={{ height: '45px', width: '45px', backgroundColor: 'red', borderRadius: '50%', marginLeft: '30px' }}>
                                        <img style={{ height: '100%', width: '100%' }} src={img1} alt="" />
                                    </Box>
                                    <Box sx={{ marginLeft: '20px' }}>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>Clive Thompson</Typography>
                                        <Typography sx={{ fontSize: '16px', fontWeight: '400' }}>
                                            Writer and Wired magazine and author for coders
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>

            </Box>
        </Box>

    )
}
