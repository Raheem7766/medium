import { Button, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useDialog } from '../context/context';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";

export default function NavPage() {
    const { handleClickOpen } = useDialog();

    return (
        <Box sx={{ height: 'auto', width: '100%', backgroundColor: "#242424" }}>
            <Box sx={{ height: '88px', width: '100%', borderBottom: '1px solid white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '25px' }}>
                <Link to="/">
                    <Typography variant='h2' sx={{ color: 'white', fontSize: '30px', fontWeight: '700', letterSpacing: '0px', cursor: 'pointer' }}>Medium</Typography>
                </Link>
                <Box sx={{ height: '100%', width: 'max-content', display: 'flex', alignItems: "center", justifyContent: 'flex-start', gap: "20px", paddingRight: { xl: '25px', lg: '25px', md: '25px', sm: '10%', xs: '02%' } }}>
                    <Button sx={{ height: '40px', width: "70px", border: "1px solid white", borderRadius: "40px", color: "white", fontSize: '11px' }}>Sign in</Button>
                    <Button onClick={handleClickOpen} sx={{ height: '40px', width: "80px", border: "1px solid white", borderRadius: "40px", color: "black", fontSize: '12px', backgroundColor: '#EAEAEA', ":hover": { backgroundColor: 'white' } }}>Sign Up</Button>
                </Box>
            </Box>
            <Box sx={{ width: '100%', paddingBottom: "150px", marginTop: { xl: '8%', lg: '8%', md: '8%', sm: '23%', xs: '23%' } }}>
                <Box sx={{ width: { xl: '677px', lg: '677px', md: "677px", sm: "95%", xs: "95%" }, margin: 'auto', marginLeft: { xl: '2.3%', lg: '2.3%', md: '2.3%' } }}>
                    <Typography variant='h2' sx={{ fontSize: { xl: '80px', lg: '80px', md: '80px', sm: '50px', xs: '50px' }, fontWeight: '400', color: 'white', cursor: "default", marginTop: "-4px" }}>Everyone has a story to tell</Typography>
                    <Typography variant='body1' sx={{ fontSize: '21px', fontWeight: '400', color: 'white', marginTop: { xl: '60px', lg: '60px', md: '60px', sm: '30px', xs: '30px' } }}>Medium is a home for human stories and ideas. Here, anyone can share knowledge and wisdom with the world—without having to build a mailing list or a following first. The internet is noisy and chaotic; Medium is quiet yet full of insight. It’s simple, beautiful, collaborative, and helps you find the right readers for whatever you have to say.</Typography>
                    <Typography variant='body1' sx={{ fontSize: '29px', fontWeight: '400', color: "white", marginTop: '50px' }}><span style={{ backgroundColor: '#505050' }}>Ultimately, our goal is to deepen our collective</span> <span style={{ backgroundColor: '#505050' }}>understanding of the world through the power of</span> <span style={{ backgroundColor: "#505050" }}>writing.</span></Typography>
                    <Typography variant='body1' sx={{ fontSize: '21px', fontWeight: '400', color: 'white', marginTop: '40px' }}>We believe that what you read and write matters. Words can divide or empower us, inspire or discourage us. In a world where the most sensational and surface-level stories often win, we’re building a system that rewards depth, nuance, and time well spent. A space for thoughtful conversation more than drive-by takes, and substance over packaging.</Typography>
                    <Typography variant='body1' sx={{ fontSize: '21px', fontWeight: '400', color: 'white', marginTop: '20px' }}>Over 100 million people connect and share their wisdom on Medium every month. They’re software developers, amateur novelists, product designers, CEOs, and anyone burning with a story they need to get out into the world. They write about what they’re working on, what’s keeping them up at night, what they’ve lived through, and what they’ve learned that the rest of us might want to know too.</Typography>
                    <Typography variant='body1' sx={{ fontSize: '21px', fontWeight: '400', color: 'white', marginTop: '20px' }}>Instead of selling ads or selling your data, we’re supported by a growing community of over a million <Link style={{ textDecoration: 'underline' }}>Medium members</Link> who believe in our mission. If you’re new here, <Link style={{ textDecoration: 'underline' }}>start reading.</Link> Dive deeper into whatever matters to you. Find a post that helps you learn something new, or reconsider something familiar—and then <Link style={{ textDecoration: 'underline' }}>write your story.</Link></Typography>
                </Box>
            </Box>
            <Box sx={{ height: 'auto', width: '100%' }}>
                <Box sx={{ height: '197px', width: '100%', borderTop: '1px solid white', fontSize: { xl: '70px', lg: '70px', md: '70px', sm: '50px', xs: '35px' }, color: "white", cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: '20px', ":hover": { backgroundColor: 'white', color: 'black' } }}>
                    <Typography variant='body1' sx={{ fontSize: { xl: '70px', lg: '70px', md: '70px', sm: '50px', xs: '35px' }, fontWeight: '400', }}>Start reading</Typography>
                    <FaArrowRight />
                </Box>
                <Box sx={{ height: '197px', width: '100%', borderTop: '1px solid white', fontSize: { xl: '70px', lg: '70px', md: '70px', sm: '50px', xs: '35px' }, color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: '20px', ":hover": { backgroundColor: 'white', color: 'black' } }}>
                    <Typography variant='body1' sx={{ fontSize: { xl: '70px', lg: '70px', md: '70px', sm: '50px', xs: '35px' }, fontWeight: '400' }}>Start writing</Typography>
                    <FaArrowRight />
                </Box>
                <Box sx={{ height: '197px', width: '100%', borderTop: '1px solid white', fontSize: { xl: '70px', lg: '70px', md: '70px', sm: '50px', xs: '35px' }, color: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: '20px', ":hover": { backgroundColor: 'white', color: 'black' } }}>
                    <Typography variant='body1' sx={{ fontSize: { xl: '70px', lg: '70px', md: '70px', sm: '50px', xs: '35px' }, fontWeight: '400' }}>Become a member</Typography>
                    <FaArrowRight />
                </Box>
                <Box sx={{ height: '70px', width: '100%', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: { xl: 'space-between', lg: 'space-between', md: 'center', sm: 'center', xs: 'center' }, px: { xl: '2%', lg: '2%', md: '0', sm: '0', xs: '0' }, flexWrap: { xl: 'nowrap', lg: 'nowrap', md: 'wrap', sm: 'wrap', xs: 'wrap' } }}>
                    <Typography variant='h2' sx={{ color: 'black', fontSize: '30px', fontWeight: '700', letterSpacing: '0px', cursor: 'pointer', paddingTop: { xl: '0', lg: '0', md: '10px', sm: '10px', xs: '10px' } }}>Medium</Typography>
                    <Box >
                        <List sx={{ display: 'flex' }}>
                            <ListItem sx={{ padding: '5px', cursor: 'pointer', textDecoration: 'underline' }}>
                                <ListItemText primary="About" primaryTypographyProps={{ fontSize: '10px', color: 'black' }} />
                            </ListItem>
                            <ListItem sx={{ padding: '5px', cursor: 'pointer', textDecoration: 'underline' }}>
                                <ListItemText primary="Term" primaryTypographyProps={{ fontSize: '10px', color: 'black' }} />
                            </ListItem>
                            <ListItem sx={{ padding: '5px', cursor: 'pointer', textDecoration: 'underline' }}>
                                <ListItemText primary="Privacy" primaryTypographyProps={{ fontSize: '10px', color: 'black' }} />
                            </ListItem>
                            <ListItem sx={{ padding: '5px', cursor: 'pointer', textDecoration: 'underline' }}>
                                <ListItemText primary="Help" primaryTypographyProps={{ fontSize: '10px', color: 'black' }} />
                            </ListItem>
                            <ListItem sx={{ padding: '5px', cursor: 'pointer', textDecoration: 'underline' }}>
                                <ListItemText primary="Teams" primaryTypographyProps={{ fontSize: '10px', color: 'black' }} />
                            </ListItem>
                            <ListItem sx={{ padding: '5px', cursor: 'pointer', textDecoration: 'underline' }}>
                                <ListItemText primary="Press" primaryTypographyProps={{ fontSize: '10px', color: 'black' }} />
                            </ListItem>
                        </List>
                    </Box>

                </Box>
            </Box>

        </Box>
    )
}
