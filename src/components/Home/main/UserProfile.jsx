import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, query, where, deleteDoc } from "firebase/firestore";
import { auth, db } from '../Header/Login/Firebase';
import { Box, Divider, Typography } from '@mui/material';
import MainNav from './MainNav';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import { MoreHorizOutlined } from '@mui/icons-material';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserProfile = () => {
    const { userId } = useParams();
    const [userDetails, setUserDetails] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                console.log("Fetching user profile for userId:", userId);
                const userRef = doc(db, "users", userId);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const userData = userSnap.data();
                    console.log("User data fetched:", userData);
                    setUserDetails(userData);

                    const q = query(collection(db, 'blogs'), where('authorId', '==', userId));
                    const querySnapshot = await getDocs(q);
                    const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    console.log("Fetched posts:", posts);
                    setUserPosts(posts);
                } else {
                    console.log("No user found with ID:", userId);
                    setError("No such user found!");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user profile or posts:", error);
                setError("Error fetching user profile: " + error.message);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);


    const handleToggle = () => setIsOpen(!isOpen);

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Profile link copied to clipboard!');
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const followersCount = Array.isArray(userDetails?.followers) ? userDetails.followers.length : 0;
    const followingCount = Array.isArray(userDetails?.following) ? userDetails.following.length : 0;

    const formattedName = userDetails?.firstName || "User";
    const bio = userDetails?.bio || "No bio available";
    const pronouns = userDetails?.pronouns || "";


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const formatDate = (post) => {
        return new Date(post.createdAt?.seconds * 1000).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, 'blogs', id));
            setUserPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
            // alert("Document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    return (
        <div>
            {userDetails ? (
                <Box style={{ height: '101vh' }}>
                    <MainNav />
                    <Box sx={{ height: '90%' }}>
                        <Box sx={{ height: "100%", width: { xs: '100%', sm: '88%', md: "88%" }, margin: 'auto', display: 'flex' }}>
                            <Box className="ProPare" sx={{ height: '100%', width: '66.6%' }}>
                                <Box className="ProLeft" sx={{ height: '100%', width: '77.3%', margin: 'auto' }}>
                                    <Box sx={{ width: '100%', height: '33.7%', padding: '1px' }}>
                                        <Box sx={{
                                            width: '100%',
                                            height: '53px',
                                            marginTop: '50px',
                                            fontSize: '42px',
                                            fontWeight: '500',
                                            color: '#191919',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            position: 'relative',
                                        }}>
                                            <Box sx={{
                                                flexGrow: 1,
                                                wordBreak: 'break-word',
                                                minWidth: 0,
                                                overflowWrap: 'anywhere',
                                                fontSize: { xs: '28px', md: '40px', sm: '40px' }
                                            }}>
                                                {formattedName}
                                            </Box>

                                            <MoreHorizIcon
                                                onClick={handleToggle}
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: '#6B6B6B',
                                                    ":hover": { color: "black" }
                                                }}
                                            />

                                            {isOpen && (
                                                <Box sx={{
                                                    height: '83px',
                                                    width: '160px',
                                                    backgroundColor: 'white',
                                                    position: 'absolute',
                                                    top: '60px',
                                                    right: '-70px',
                                                    padding: '10px',
                                                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                                }}>
                                                    <Box sx={{
                                                        height: "10px",
                                                        width: '15px',
                                                        position: 'absolute',
                                                        top: '-10px',
                                                        left: '45%',
                                                        backgroundColor: 'white',
                                                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                                                    }}></Box>
                                                    <Typography
                                                        onClick={copyLink}
                                                        variant='h3'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                            textAlign: 'center',
                                                            cursor: 'pointer',
                                                            color: '#6B6B6B',
                                                            ":hover": { color: "black" },
                                                            marginTop: '5px'
                                                        }}>
                                                        Copy link to profile
                                                    </Typography>
                                                    <ToastContainer />
                                                    <Typography
                                                        variant='h3'
                                                        sx={{
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                            textAlign: 'center',
                                                            cursor: 'pointer',
                                                            color: '#6B6B6B',
                                                            ":hover": { color: "black" },
                                                            marginTop: '15px'
                                                        }}>
                                                        Design your profile
                                                    </Typography>
                                                </Box>
                                            )}
                                        </Box>
                                        <Typography sx={{ fontSize: '14px', color: '#6B6B6B', marginTop: '10px' }}>
                                            Followers({followersCount}) Following({followingCount})
                                        </Typography>

                                        <Box sx={{ height: '40px', width: '100%', marginTop: '40px', borderBottom: '2px solid #F2F2F2' }}>
                                            <Box sx={{ height: '100%', width: "140px", display: "flex", gap: '27px' }}>
                                                <Box onClick={() => handleTabClick('home')} sx={{ height: '100%', width: '30%', cursor: "pointer", color: activeTab === 'home' ? 'black' : '#6B6B6B', borderBottom: activeTab === "home" ? "1px solid black" : "none", fontWeight: '500' }}>Home</Box>
                                                <Box onClick={() => handleTabClick('about')} sx={{ height: '100%', width: '30%', cursor: "pointer", color: activeTab === 'about' ? 'black' : '#6B6B6B', borderBottom: activeTab === "about" ? "1px solid black" : "none", fontWeight: '500' }}>About</Box>
                                            </Box>
                                        </Box>
                                    </Box>

                                    {activeTab === 'home' && (
                                        <Box sx={{ marginTop: '20px' }}>
                                            {userPosts.length > 0 ? (
                                                userPosts.map((post) => (
                                                    <Box
                                                        sx={{ height: 'max-content', width: '100%', marginTop: '17px' }}
                                                        key={post.id}
                                                        className="post"
                                                    >
                                                        <div
                                                            onClick={() => handlePostClick(post.id)}
                                                            className="w-[100%] h-[100%] flex flex-row sm:flex-row gap-4 cursor-pointer"
                                                        >
                                                            <div className="w-[68%]">
                                                                <div className='flex gap-[5px]' style={{ alignItems: 'center' }}>
                                                                    <div className='h-[20px] w-[20px] rounded-[50%]'>
                                                                        {userDetails.photoURL ? (
                                                                            <Box
                                                                                sx={{
                                                                                    height: '100%',
                                                                                    width: '100%',
                                                                                    cursor: 'pointer',
                                                                                    borderRadius: '50%',
                                                                                    display: 'flex',
                                                                                    justifyContent: 'center',
                                                                                    alignItems: 'center',
                                                                                    position: 'relative'
                                                                                }}
                                                                            >
                                                                                <img
                                                                                    src={userDetails.photoURL}
                                                                                    alt="User Profile"
                                                                                    style={{ height: '100%', width: '100%', borderRadius: '50%' }}
                                                                                />
                                                                            </Box>
                                                                        ) : (
                                                                            <span>No Image</span>
                                                                        )}
                                                                    </div>
                                                                    <Typography
                                                                        className="font-semibold"
                                                                        sx={{
                                                                            fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' },
                                                                            whiteSpace: 'nowrap',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis'
                                                                        }}
                                                                    >
                                                                        {post.author}
                                                                    </Typography>
                                                                </div>
                                                                <Typography
                                                                    sx={{
                                                                        fontSize: { xs: '20px', sm: '24px', md: '28px', lg: '33px' },
                                                                        fontWeight: 'bold',
                                                                        marginTop: '20px',
                                                                        lineClamp: 2,
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis'
                                                                    }}
                                                                    noWrap
                                                                >
                                                                    {post.title}
                                                                </Typography>
                                                                <Typography
                                                                    sx={{
                                                                        marginTop: '20px',
                                                                        fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' },
                                                                        color: 'gray',
                                                                        lineClamp: 2,
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis'
                                                                    }}
                                                                    dangerouslySetInnerHTML={{ __html: post.description }}
                                                                />

                                                            </div>
                                                            <div className='h-[100%] w-[20%]' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                {post.imageUrl && (
                                                                    <div>
                                                                        <img
                                                                            src={post.imageUrl}
                                                                            alt="postImg"
                                                                            className="w-full h-auto object-cover"
                                                                            style={{ maxWidth: '300px', maxHeight: '150px' }}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-between mt-[20px] w-full sm:w-[70%] '>
                                                            <p>{formatDate(post)}</p>
                                                            <div className='flex gap-[20px]'>
                                                                {console.log('User UID:', user?.uid)}
                                                                {console.log('Post Author ID:', post.authorId)}

                                                                {user && String(post.authorId) === String(user.uid) ? (
                                                                    <RemoveCircleOutlineRoundedIcon
                                                                        onClick={() => handleDelete(post.id)}
                                                                        sx={{ fontSize: '20px', color: '#6B6B6B', cursor: 'pointer' }}
                                                                    />
                                                                ) : null}

                                                                <BookmarkAddRoundedIcon
                                                                    sx={{ fontSize: '20px', color: '#6B6B6B', cursor: 'pointer' }}
                                                                />
                                                                <MoreHorizOutlined
                                                                    sx={{ fontSize: '20px', color: '#6B6B6B', cursor: 'pointer' }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <Divider sx={{ border: '1px solid #F2F2F2', width: '100%', marginTop: '20px' }} />
                                                    </Box>
                                                ))
                                            ) : (
                                                <Typography>No posts yet.</Typography>
                                            )}
                                        </Box>
                                    )}
                                    {activeTab === 'about' && (
                                        <Box sx={{ marginTop: '20px' }}>
                                            <Typography>{bio}</Typography>
                                        </Box>
                                    )}

                                </Box>
                            </Box>
                            <Box className="ProRight" sx={{ height: '100%', width: "34.4%", borderLeft: '1px solid #F2F2F2' }}>
                                <Box sx={{ height: '30%', width: '100%' }}>
                                    {userDetails.photoURL ? (
                                        <Box sx={{ height: '87px', width: '87px', cursor: 'pointer', marginTop: '40px', marginLeft: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                            <img
                                                src={userDetails.photoURL}
                                                alt="User Profile"
                                                style={{ height: '100%', width: '100%', borderRadius: '50%' }}
                                            />
                                        </Box>
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                    <Box sx={{ width: '100%', marginTop: '17px', display: 'flex' }}>
                                        <Typography sx={{ fontWeight: '700', marginLeft: '48px' }}>
                                            {formattedName}
                                        </Typography>
                                        <Typography sx={{ fontSize: '14px', color: '#6B6B6B', marginLeft: '10px' }}>
                                            {pronouns}
                                        </Typography>
                                    </Box>
                                    <Typography variant='h2' sx={{ fontSize: '14px', color: '#6B6B6B', marginLeft: '50px', marginTop: '10px' }}>
                                        {bio}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Typography>User profile not found</Typography>
            )}
        </div>
    );
};

export default UserProfile;
