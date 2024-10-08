import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { auth, db } from '../Header/Login/Firebase';
import MainNav from './MainNav';
import { Box, Divider, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDialog } from '../context/context';
import LockIcon from '@mui/icons-material/Lock';
import { getFirestore, doc, getDoc, query, collection, where, getDocs, deleteDoc } from "firebase/firestore";
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import { MoreHorizOutlined } from '@mui/icons-material';

const formatDisplayName = (displayName) => {
    if (!displayName) return 'User';
    const formattedName = displayName.replace(/\s+/g, '');
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
};

export default function Profile() {
    const { username } = useParams();
    const [user] = useAuthState(auth);
    const firestore = getFirestore();
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [error, setError] = useState(null);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [activeTab, setActiveTab] = useState('home');
    const [photoURL, setPhotoURL] = useState(null);
    const [pronouns, setPronouns] = useState('');
    const [bio, setBio] = useState('');
    const [formattedName, setFormattedName] = useState('');
    const { handleToggle, isOpen } = useDialog();
    const { userId } = useParams();
    const [userPhotos, setUserPhotos] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                setPhotoURL(user.photoURL);
                setFormattedName(formatDisplayName(user.displayName));

                const docRef = doc(firestore, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setPronouns(userData.pronouns || '');
                    setBio(userData.bio || '');
                    setFollowers(userData.followers?.length || 0);
                    setFollowing(userData.following?.length || 0);
                }

                await fetchUserPosts(user.uid);
            }
            setLoading(false);
        };

        fetchUserData();
    }, [user, firestore]);

    const fetchUserPosts = async (userId) => {
        try {
            const q = query(collection(db, 'blogs'), where('authorId', '==', userId));
            const querySnapshot = await getDocs(q);
            const posts = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log(posts);
            setUserPosts(posts);
        } catch (error) {
            setError('Error fetching user posts');
            console.error('Error fetching user posts:', error);
        }
    };

    const copyLink = () => {
        const profileUrl = window.location.href;
        navigator.clipboard.writeText(profileUrl)
            .then(() => {
                toast.success('Link copied', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(() => {
                toast.error('Failed to copy profile link!', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

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
                                    Followers({followers}) Following({following})
                                </Typography>

                                <Box sx={{ height: '40px', width: '100%', marginTop: '40px', borderBottom: '2px solid #F2F2F2' }}>
                                    <Box sx={{ height: '100%', width: "140px", display: "flex", gap: '27px' }}>
                                        <Box onClick={() => handleTabClick('home')} sx={{ height: '100%', width: '30%', cursor: "pointer", color: activeTab === 'home' ? 'black' : '#6B6B6B', borderBottom: activeTab === "home" ? "1px solid black" : "none", fontWeight: '500' }}>Home</Box>
                                        <Box onClick={() => handleTabClick('about')} sx={{ height: '100%', width: '30%', cursor: "pointer", color: activeTab === 'about' ? 'black' : '#6B6B6B', borderBottom: activeTab === "about" ? "1px solid black" : "none", fontWeight: '500' }}>About</Box>
                                    </Box>
                                </Box>
                            </Box>
                            {/* <Box sx={{ height: "148px", width: { xs: '95%', sm: '400px', md: '100%' }, margin: 'auto', cursor: "pointer", display: 'flex', flexWrap: "wrap", }}>
                                <Box sx={{ height: '100%', width: { xs: '100%', md: '57.3%' }, backgroundColor: "#F9F9F9" }}>
                                    <Box sx={{ height: '30%', width: '100%', display: "flex", alignItems: "flex-end", paddingLeft: { xs: '10px', md: '30px' }, gap: '10px' }}>
                                        {user && user.photoURL ? (
                                            <Box sx={{ height: '20px', width: '20px', cursor: 'pointer', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                                <img
                                                    src={user.photoURL}
                                                    alt="User Profile"
                                                    style={{ height: '100%', width: '100%', borderRadius: '50%' }}
                                                />
                                            </Box>
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                        {formattedName}
                                    </Box>

                                    <Typography variant='h4' sx={{ fontSize: '20px', fontWeight: '700', paddingLeft: { xs: '10px', md: '30px' }, marginTop: "20px" }}>Reading list</Typography>
                                    <Box sx={{ height: 'auto', width: "100%", display: 'flex', justifyContent: 'space-between', marginTop: "15px", paddingRight: '25px' }}>
                                        <Box sx={{ height: '100%', width: "auto", fontSize: '14px', color: '#6B6B6B', paddingLeft: { xs: '10px', md: '30px' } }}>
                                            No stories
                                            <LockIcon sx={{ fontSize: "12px", marginLeft: '10px' }} />
                                        </Box>
                                        <MoreHorizIcon sx={{ cursor: 'pointer', color: '#6B6B6B', ":hover": { color: "black" } }} />
                                    </Box>
                                </Box>
                                <Box sx={{ height: '100%', width: { xs: '100%', md: '42.3%' }, display: 'flex', justifyContent: 'space-between' }}>
                                    <Box sx={{ height: '100%', width: '55%', backgroundColor: '#F2F2F2' }}></Box>
                                    <Box sx={{ height: '100%', width: '30%', backgroundColor: '#F2F2F2' }}></Box>
                                    <Box sx={{ height: '100%', width: '13%', backgroundColor: '#F2F2F2' }}></Box>
                                </Box>
                            </Box> */}

                            {activeTab === 'home' && (
                                <div>
                                    {userPosts.length > 0 ? (
                                        userPosts.map(post => (
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
                                                                {user && user.photoURL ? (
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
                                                                            src={user.photoURL}
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
                                </div>
                            )}

                            {activeTab === 'about' && (
                                <div>
                                    <Typography variant="h6" className="mb-2">About</Typography>
                                    <Typography>This is the about section. Add your bio here.</Typography>
                                </div>
                            )}

                        </Box>
                    </Box>
                    <Box className="ProRight" sx={{ height: '100%', width: "34.4%", borderLeft: '1px solid #F2F2F2' }}>
                        <Box sx={{ height: '30%', width: '100%' }}>
                            {user && user.photoURL ? (
                                <Box sx={{ height: '87px', width: '87px', cursor: 'pointer', marginTop: '40px', marginLeft: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                                    <img
                                        src={user.photoURL}
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
                                    {pronouns ? pronouns : ''}
                                </Typography>
                            </Box>
                            <Typography variant='h2' sx={{ fontSize: '14px', color: '#6B6B6B', marginLeft: '50px', marginTop: '10px' }}>
                                {bio ? bio : ''}
                            </Typography>
                            <Link to="/me/setting">
                                <Typography sx={{ fontSize: '13px', fontWeight: '500', marginLeft: '48px', marginTop: '23px', color: '#279025', cursor: 'pointer', ":hover": { color: 'black' } }}>
                                    Edit profile
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
