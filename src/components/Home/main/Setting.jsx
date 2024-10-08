import React, { useEffect, useState } from 'react';
import { Box, Typography, Link, Divider, Dialog } from '@mui/material';
import MainNav from './MainNav';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Header/Login/Firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import ProfileInformation from './ProfileInfo';
import { useDialog } from '../context/context';

const SettingsPage = () => {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState('');
    const [subdomain, setSubdomain] = useState('');
    const [openProfileInfo, setOpenProfileInfo] = useState(false);

    const handleOpenProfileInfo = () => setOpenProfileInfo(true);
    const handleCloseProfileInfo = () => setOpenProfileInfo(false);

    const { formattedName } = useDialog()

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         if (user) {
    //             const db = getFirestore();
    //             const userDocRef = doc(db, 'users', user.uid);
    //             const userDoc = await getDoc(userDocRef);

    //             if (userDoc.exists()) {
    //                 const userData = userDoc.data();
    //                 setUsername(userData.username || '');
    //                 setSubdomain(userData.subdomain || '');
    //             }
    //         }
    //     };

    //     fetchUserData();
    // }, [user]);

    return (
        <>
            <Box sx={{ height: 'auto', width: '100%', position: 'relative' }}>
                <MainNav />
                <Box className="cont" sx={{ width: '88%', margin: 'auto', display: 'flex', paddingLeft: '80px' }}>
                    {/* Left Column */}
                    <Box className="rightcon" sx={{ width: { xl: '64.5%', lg: '64.5%', md: '64.5%', sm: '675px', xs: '100%' }, margin: { xl: '0', lg: "0", md: '0', sm: 'auto', xs: 'auto' }, paddingRight: '100px', backgroundColor: 'white', paddingBottom: '65px', borderRight: '2px solid #F2F2F2', }}>
                        <Typography variant="h3" sx={{ fontSize: { md: '42px', sm: '25px', xs: '25px' }, fontWeight: 'bold', marginTop: { md: '55px', sm: "20px", xs: '20px' }, marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                            Settings
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: { md: '30px', sm: "10px", xs: "10px" }, marginTop: { md: '60px', sm: "30px", xs: '30px' }, marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                            <Typography variant="body1" sx={{ fontSize: '15px', color: '#191919' }}>
                                Account
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '15px', color: '#6B6B6B' }}>
                                Publishing
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '15px', color: '#6B6B6B' }}>
                                Notifications
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '15px', color: '#6B6B6B' }}>
                                Membership and payment
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '15px', color: '#6B6B6B' }}>
                                Security and apps
                            </Typography>
                        </Box>

                        <Divider sx={{ borderColor: '#EFEFEF', marginBottom: '30px', marginLeft: { md: '20px', sm: '5px', xs: '5px' }, marginTop: '10px' }} />

                        <Box sx={{ marginTop: '50px', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                Email address
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '14px', color: '#6B6B6B' }}>
                                {user && user.email}
                            </Typography>
                        </Box>

                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                Username and subdomain
                            </Typography>
                            <Typography variant="body1" sx={{ fontSize: '14px', color: '#6B6B6B' }}>
                                {/* @{username || 'Loading...'} / {subdomain || 'Loading...'} */}
                                @{formattedName}
                            </Typography>
                        </Box>

                        <Box onClick={handleOpenProfileInfo} sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
                            <Box>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                    Profile information
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '12px', color: '#6B6B6B', marginLeft: { md: '20px', sm: '5px', xs: '5px' }, paddingTop: '5px' }}>
                                    Edit your photo, name, pronouns, short bio, etc.
                                </Typography>
                            </Box>
                            <Typography variant="body1" sx={{ fontSize: '14px', color: '#6B6B6B' }}>
                                {formattedName}
                            </Typography>
                        </Box>

                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                    Profile design
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '12px', color: '#6B6B6B', marginLeft: { md: '20px', sm: '5px', xs: '5px' }, paddingTop: '5px' }}>
                                    Customize the appearance of your profile.
                                </Typography>
                            </Box>
                            <ArrowOutwardIcon sx={{ color: '#6B6B6B', fontSize: '20px' }} />
                        </Box>

                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                    Custom domain
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '12px', color: '#6B6B6B', marginLeft: { md: '20px', sm: '5px', xs: '5px' }, paddingTop: '5px' }}>
                                    Upgrade to a Medium Membership to redirect your profile URL to a domain like yourdomain.com.
                                </Typography>
                            </Box>
                            <ArrowOutwardIcon sx={{ color: '#6B6B6B', fontSize: '20px' }} />
                        </Box>

                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                    Partner Program
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '12px', color: '#6B6B6B', marginLeft: { md: '20px', sm: '5px', xs: '5px' }, paddingTop: '5px' }}>
                                    You are not enrolled in the Partner Program
                                </Typography>
                            </Box>
                            <ArrowOutwardIcon sx={{ color: '#6B6B6B', fontSize: '20px' }} />
                        </Box>

                        <Divider sx={{ borderColor: '#EFEFEF', marginBottom: '30px', marginLeft: '20px', marginTop: '40px' }} />

                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                Muted writers and publications
                            </Typography>
                            <ArrowOutwardIcon sx={{ color: '#6B6B6B', fontSize: '20px' }} />
                        </Box>

                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                Blocked users
                            </Typography>
                        </Box>

                        <Divider sx={{ borderColor: '#EFEFEF', marginBottom: '30px', marginLeft: '20px', marginTop: '30px' }} />
                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#C94A4A', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                    Deactivate account
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '12px', color: '#6B6B6B', marginLeft: { md: '20px', sm: '5px', xs: '5px' }, paddingTop: '5px' }}>
                                    Deactivating will suspend your account until you sign back in.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#C94A4A', marginBottom: '0px', marginLeft: { md: '20px', sm: '5px', xs: '5px' } }}>
                                    Delete account
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '12px', color: '#6B6B6B', marginLeft: { md: '20px', sm: '5px', xs: '5px' }, paddingTop: '5px' }}>
                                    Permanently delete your account and all of your content.
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Right Column */}
                    <Box sx={{ width: '35.5%', height: 'calc(100vh - 57px)', paddingLeft: '35px', position: 'fixed', top: '57px', right: '0', overflowY: 'auto', display: { xl: 'block', lg: "block", md: 'block', sm: 'none', xs: 'none' } }}>
                        <Typography variant="body1" sx={{ fontSize: '16px', color: '#191919', fontWeight: 'bold', marginTop: '63px' }}>
                            Suggested help articles
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '14px', color: 'black', marginTop: '30px' }}>
                            <Link href="#" sx={{ textDecoration: 'none', color: 'black', ":hover": { color: '#191919' } }}>
                                Sign in or sign up to Medium
                            </Link>
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '14px', color: '#6B6B6B', marginTop: '12px' }}>
                            <Link href="#" sx={{ textDecoration: 'none', color: 'black', ":hover": { color: '#191919' } }}>
                                Your profile page
                            </Link>
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '14px', color: '#6B6B6B', marginTop: '12px' }}>
                            <Link href="#" sx={{ textDecoration: 'none', color: 'black', ":hover": { color: '#191919' } }}>
                                Writing and publishing your first story
                            </Link>
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '14px', color: '#6B6B6B', marginTop: '12px' }}>
                            <Link href="#" sx={{ textDecoration: 'none', color: 'black', ":hover": { color: '#191919' } }}>
                                About Medium's distribution system
                            </Link>
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '14px', color: '#6B6B6B', marginTop: '12px' }}>
                            <Link href="#" sx={{ textDecoration: 'none', color: 'black', ":hover": { color: '#191919' } }}>
                                Get started with the Partner Program
                            </Link>
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ height: 'max-content' }}>
                    <Dialog
                        open={openProfileInfo}
                        onClose={handleCloseProfileInfo}
                        fullWidth
                        maxWidth="xs"
                        sx={{
                            '& .MuiDialog-paper': {
                                position: 'relative',
                                margin: '0',
                                top: 'auto',
                                left: 'auto',
                                transform: 'none',
                                zIndex: 1300,
                                maxHeight: '90vh',
                                overflowY: 'auto',
                            },
                        }}
                    >
                        <ProfileInformation open={openProfileInfo} onClose={handleCloseProfileInfo} />
                    </Dialog>
                </Box>

            </Box>

        </>

    );
};

export default SettingsPage;
