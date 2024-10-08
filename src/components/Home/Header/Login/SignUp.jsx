import React, { useState } from 'react';
import { Button, Typography, Box, Link } from '@mui/material';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoLogoApple } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from 'react-router';
import { useDialog } from '../../context/context';
import { auth, provider, db } from './Firebase';
import { signInWithPopup } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { doc, getDoc, setDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';

export default function SimpleDialog() {
    const { open, handleClose, setOpen, logout, user } = useDialog();
    const [isSignUp, setIsSignUp] = useState(true);
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loginwithgoogle = async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            console.log("Google User: ", user);

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    firstName: user.displayName.split(" ")[0],
                    lastName: user.displayName.split(" ").slice(1).join(" "),
                    photoURL: user.photoURL,
                });

                console.log("User data successfully stored in Firestore");

                toast.success("User logged in successfully!", { autoClose: 3000 });
            } else {
                console.log("User already exists in Firestore");
                toast.success("Welcome back!", { autoClose: 3000 });
            }

            setTimeout(() => {
                navigate("/medium");
            }, 2000);
        } catch (error) {
            console.error("Error signing in or storing user data: ", error);
            toast.error("Authentication failed.");
        }
    };
    // useEffect(() => {
    //     const checkAuth = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/login/success', {
    //                 credentials: 'include',
    //             });
    //             const data = await response.json();
    //             if (data.isAuthenticated) {
    //                 setIsAuthenticated(true);
    //             }
    //         } catch (error) {
    //             console.error('Error checking authentication:', error);
    //         }
    //     };

    //     checkAuth();
    // }, []);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         window.location.href = '/medium';
    //     }
    // }, [isAuthenticated]);

    const handleToggle = () => {
        setIsSignUp(!isSignUp);
        setOpen(true);
    };

    const handleDialogContentClick = (event) => {
        event.stopPropagation();
    };

    return open ? (
        <Box onClick={handleClose} sx={{
            height: '100vh',
            width: '100vw',
            backgroundColor: '#fffefed7',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ToastContainer position="top-right" autoClose={5000} />

            <Box
                onClick={handleDialogContentClick}
                sx={{ height: { xl: '94%', lg: '94%', md: '94%', sm: '100%', xs: '100%' }, width: { xl: '675px', lg: '675px', md: '675px', sm: '100%', xs: '100%' }, backgroundColor: 'white', boxShadow: 3, position: "relative" }}
            >
                <RxCross2
                    onClick={handleClose}
                    style={{ position: "absolute", cursor: 'pointer', top: '20px', right: '20px' }}
                    size={20}
                    color='#6B6B6B'
                />
                <Typography variant="h5" sx={{ textAlign: 'center', mt: isSignUp ? { xl: '17%', lg: '17%', md: '17%', sm: '17%', xs: '30%' } : { xl: '10%', lg: '10%', md: '10%', sm: '10%', xs: '15%' }, fontSize: '28px', fontWeight: '500' }} >
                    {isSignUp ? "Join Medium." : "Welcome Back."}
                </Typography>       
                {isSignUp ? (<>         
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '77px' }}>
                        <Button onClick={loginwithgoogle} sx={{ width: { xl: '300px', md: '300px', sm: '300px', xs: '75%' }, height: '45px', color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '10%', fontSize: '14px', borderRadius: '40px', border: '1px solid black', "&:hover": { backgroundColor: "transparent" }, }}>
                            <FcGoogle size={20} />
                            {isSignUp ? "Sign Up with Google" : "Sign in with Google"}
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button sx={{ width: { xl: '300px', md: '300px', sm: '300px', xs: '75%' }, height: '45px', color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '10%', fontSize: '14px', borderRadius: '40px', border: '1px solid black', "&:hover": { backgroundColor: "transparent" }, }}>
                            <FaFacebook size={20} style={{ color: '#1877F2' }} />
                            {isSignUp ? "Sign Up with Facebook" : "Sign in with Facebook"}
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button sx={{ width: { xl: '300px', md: '300px', sm: '300px', xs: '75%' }, height: '45px', color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '10%', fontSize: '14px', borderRadius: '40px', border: '1px solid black', "&:hover": { backgroundColor: "transparent" }, }}>
                            <MdOutlineEmail size={20} style={{ color: '#909090' }} />
                            {isSignUp ? "Sign Up with Email" : "Sign in with Email"}
                        </Button>
                    </Box>
                </>) : (<>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '77px' }}>
                        <Button onClick={loginwithgoogle} sx={{ width: { xl: '300px', md: '300px', sm: '300px', xs: '75%' }, height: '45px', color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '10%', fontSize: '14px', borderRadius: '40px', border: '1px solid black', "&:hover": { backgroundColor: "transparent" }, }}>
                            <FcGoogle size={20} />
                            {isSignUp ? "Sign Up with Google" : "Sign in with Google"}
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button sx={{ width: { xl: '300px', md: '300px', sm: '300px', xs: '75%' }, height: '45px', color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '10%', fontSize: '14px', borderRadius: '40px', border: '1px solid black', "&:hover": { backgroundColor: "transparent" }, }}>
                            <FaFacebook size={20} style={{ color: '#1877F2' }} />
                            {isSignUp ? "Sign Up with Facebook" : "Sign in with Facebook"}
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button sx={{ width: { xl: '300px', md: '300px', sm: '300px', xs: '75%' }, height: '45px', color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '10%', fontSize: '14px', borderRadius: '40px', border: '1px solid black', "&:hover": { backgroundColor: "transparent" }, }}>
                            <IoLogoApple size={20} />
                            {isSignUp ? "Sign Up with Apple" : "Sign in with Apple"}
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button sx={{ width: { xl: '300px', md: '300px', sm: '300px', xs: '75%' }, height: '45px', color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '10%', fontSize: '14px', borderRadius: '40px', border: '1px solid black', "&:hover": { backgroundColor: "transparent" }, }}>
                            <FaXTwitter size={20} />
                            {isSignUp ? "Sign Up with X" : "Sign in with X"}
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <Button sx={{ width: { xl: '300px', md: '300px', sm: '300px', xs: '75%' }, height: '45px', color: 'black', display: 'flex', justifyContent: 'space-between', paddingRight: '10%', fontSize: '14px', borderRadius: '40px', border: '1px solid black', "&:hover": { backgroundColor: "transparent" }, }}>
                            <MdOutlineEmail size={20} style={{ color: '#909090' }} />
                            {isSignUp ? "Sign Up with Email" : "Sign in with Email"}
                        </Button>
                    </Box>

                </>)}

                <Typography mt={5} sx={{ textAlign: 'center' }}>
                    {isSignUp ? (
                        <>
                            Already have an account?{" "}
                            <Link
                                underline="hover"
                                color='#1A8917'
                                fontWeight={700}
                                sx={{
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'inline',
                                    },
                                    cursor: "pointer"
                                }}
                                onClick={handleToggle}
                            >
                                Sign in
                            </Link>
                        </>
                    ) : (
                        <>
                            No account?{" "}
                            <Link
                                underline="hover"
                                color='#1A8917'
                                fontWeight={700}
                                sx={{
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'inline',
                                    },
                                    cursor: "pointer"
                                }}
                                onClick={handleToggle}
                            >
                                Create One
                            </Link>
                        </>
                    )}
                </Typography>
                <Typography sx={{ fontSize: "13px", color: "gray", width: '65%', textAlign: 'center', margin: 'auto', mt: isSignUp ? "12%" : "7%" }}>
                    Click {isSignUp ? "“Sign up”" : "“Sign in”"} to agree to Medium's{" "}
                    <Link href="#" underline="hover" color='#1A8917'>
                        Terms of Service
                    </Link>{" "}
                    and acknowledge that Medium's{" "}
                    <Link href="#" underline="hover" color='#1A8917'>
                        Privacy Policy
                    </Link>{" "}
                    applies to you.
                </Typography>
            </Box>
        </Box>
    ) : null;
}