import React, { useEffect } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { AccountCircle, Bookmarks, Article, BarChart } from '@mui/icons-material';
import { auth } from '../Header/Login/Firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDialog } from '../context/context';
import { PiNotePencil } from 'react-icons/pi';

const Sidebar = () => {
    const logout = () => {
        auth.signOut()
        window.location.href = ('/')
    }
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const { toggleSidebar, isSidebarOpen } = useDialog();

    const goToProfile = () => {
        // if (user) {
        //     const username = user.email.split('@')[0]; 
        //     navigate(`/@${username}`); 
        // }
        toggleSidebar()
        navigate('/profile')
    };

    useEffect(() => {
        const handleScroll = () => {
            if (isSidebarOpen) {
                toggleSidebar();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isSidebarOpen, toggleSidebar]);

    const maskEmail = (email) => {
        const [localPart, domain] = email.split('@');
        const firstTwoLetters = localPart.slice(0, 2);
        const maskedPart = '●'.repeat(localPart.length - 2);
        return `${firstTwoLetters}${maskedPart}@${domain}`;
    };

    return (
        <Box className="sidebar-container"
            sx={{
                height: '100%',
                width: '100%',
                backgroundColor: 'white',
                padding: '0px',
                boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                position: 'absolute',
                zIndex: '1000'
            }}
        >
            {/* Top section */}
            <List sx={{ height: '29%', width: '100%', backgroundColor: '', padding: '10px' }}>
                {/* <Box sx={{ display: 'flex', alignItems: 'center', color: "#747474", cursor: 'pointer' }} className='pencil1'>
                    <PiNotePencil size={25} style={{ "&:hover": { color: 'black' } }} />
                    Write
                </Box> */}
                <ListItem onClick={goToProfile} button sx={{ height: '25%', cursor: 'pointer' }} >
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button sx={{ height: '25%', cursor: 'pointer' }}>
                    <ListItemIcon>
                        <Bookmarks />
                    </ListItemIcon>
                    <ListItemText primary="Library" />
                </ListItem>
                <ListItem button sx={{ height: '25%', cursor: 'pointer' }}>
                    <ListItemIcon>
                        <Article />
                    </ListItemIcon>
                    <ListItemText primary="Stories" />
                </ListItem>
                <ListItem button sx={{ height: '25%', cursor: 'pointer' }}>
                    <ListItemIcon>
                        <BarChart />
                    </ListItemIcon>
                    <ListItemText primary="Stats" />
                </ListItem>
            </List>

            <Divider />

            {/* Middle section */}
            <List sx={{ height: '26%', width: '100%', backgroundColor: '', padding: '10px' }}>
                <ListItem button sx={{ height: '25%', cursor: 'pointer' }}>
                    <ListItemText primary="Settings" />
                </ListItem>
                <ListItem button sx={{ height: '25%', cursor: 'pointer' }}>
                    <ListItemText primary="Refine recommendations" />
                </ListItem>
                <ListItem button sx={{ height: '25%', cursor: 'pointer' }}>
                    <ListItemText primary="Manage publications" />
                </ListItem>
                <ListItem button sx={{ height: '25%', cursor: 'pointer' }}>
                    <ListItemText primary="Help" />
                </ListItem>
            </List>
            <Divider />

            <List sx={{ height: '30.5%', width: '100%', backgroundColor: '', padding: '10px' }}>
                <ListItem button sx={{ height: '20%', cursor: 'pointer' }}>
                    <ListItemText primary="Become a Medium member" />
                </ListItem>
                <ListItem button sx={{ height: '20%', cursor: 'pointer' }}>
                    <ListItemText primary="Create a Mastodon account" />
                </ListItem>
                <ListItem button sx={{ height: '20%', cursor: 'pointer' }}>
                    <ListItemText primary="Apply for author verification" />
                </ListItem>
                <ListItem button sx={{ height: '20%', cursor: 'pointer' }}>
                    <ListItemText primary="Apply to the Partner Program" />
                </ListItem>
                <ListItem button sx={{ height: '20%', cursor: 'pointer' }}>
                    <ListItemText primary="Gift a membership" />
                </ListItem>
            </List>

            <Divider />

            {/* Sign out section */}
            <Box sx={{ height: '14.5%', width: '100%', backgroundColor: '', padding: '10px' }}>
                <ListItem button sx={{ height: '50%', cursor: 'pointer' }}>
                    <ListItemText primary="Sign out" onClick={logout} />
                </ListItem>
                <Typography variant="body2" color="textSecondary" sx={{ height: '50%', cursor: 'pointer',marginLeft:'15px' }}>
                    {user ? maskEmail(user.email) : 'Loading...'}
                </Typography>
            </Box>
        </Box>
    );
};

export default Sidebar;
