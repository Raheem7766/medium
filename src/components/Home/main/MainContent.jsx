import { Avatar, Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Posts from './Posts';
import { db } from '../Header/Login/Firebase';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function MainContent({ posts }) {
    const [activeTab, setActiveTab] = useState('For you');
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    // const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const loggedInUser = auth.currentUser;
        if (loggedInUser) {
            setCurrentUser(loggedInUser);
        }
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => doc.data());
            setUsers(usersList);
        };

        fetchUsers();
    }, []);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleUserClick = (user) => {
        navigate(`/user/${user.uid}`);
        console.log(user.uid);
    };

    const handleFollowToggle = async (user) => {
        const isFollowing = currentUser?.following?.includes(user.uid) || false;
        const userDocRef = doc(db, 'users', user.uid);
        const currentUserDocRef = doc(db, 'users', currentUser.uid);

        if (isFollowing) {
            const newFollowing = currentUser.following.filter(uid => uid !== user.uid);
            const newFollowers = user.followers.filter(uid => uid !== currentUser.uid);

            await updateDoc(currentUserDocRef, {
                following: newFollowing
            });

            await updateDoc(userDocRef, {
                followers: newFollowers
            });

            setCurrentUser(prev => ({ ...prev, following: newFollowing }));

            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.uid === user.uid ? { ...u, followers: newFollowers } : u
                )
            );
        } else {
            const updatedFollowing = currentUser.following ? [...currentUser.following, user.uid] : [user.uid];
            const updatedFollowers = user.followers ? [...user.followers, currentUser.uid] : [currentUser.uid];

            await updateDoc(currentUserDocRef, {
                following: updatedFollowing
            });

            await updateDoc(userDocRef, {
                followers: updatedFollowers
            });
            setCurrentUser(prev => ({ ...prev, following: updatedFollowing }));

            setUsers(prevUsers =>
                prevUsers.map(u =>
                    u.uid === user.uid ? { ...u, followers: updatedFollowers } : u
                )
            );
        }
    };

    const filteredUsers = users.filter(user => user.uid !== currentUser?.uid);

    return (
        <Box sx={{ height: 'auto', width: '100%' }}>
            <Box
                sx={{
                    minHeight: '100vh',
                    width: { xs: '90%', lg: '86.5%' },
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }
                }}
            >
                {/* Left section */}
                <Box
                    sx={{
                        height: '100%',
                        width: { xs: '100%', md: '66%' },
                        backgroundColor: 'white',
                        margin: { xs: 'auto', md: '0' }
                    }}
                >
                    <Box sx={{ height: '100%', width: '80%', margin: 'auto', padding: '1px' }}>
                        <Box sx={{ height: '40px', width: '100%', marginTop: '40px', display: 'flex', gap: '20px', borderBottom: '2px solid #F2F2F2' }}>
                            <AddIcon sx={{ color: '#BABABA' }} />
                            <Box
                                onClick={() => handleTabClick('For you')}
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    color: activeTab === 'For you' ? 'black' : '#6B6B6B',
                                    borderBottom: activeTab === 'For you' ? '1px solid black' : 'none',
                                    fontWeight: '500'
                                }}
                            >
                                For you
                            </Box>
                            <Box
                                // onClick={() => handleTabClick('Following')}
                                sx={{
                                    height: '100%',
                                    cursor: 'pointer',
                                    color: activeTab === 'Following' ? 'black' : '#6B6B6B',
                                    borderBottom: activeTab === 'Following' ? '1px solid black' : 'none',
                                    fontWeight: '500',
                                    marginLeft: '10px'
                                }}
                            >
                                Following
                            </Box>
                        </Box>
                        {activeTab === 'For you' && (
                            <Box sx={{ height: 'auto', width: '100%', borderBottom: '2px solid #F2F2F2', marginTop: '47px' }}>
                                <Posts posts={posts} />
                            </Box>
                        )}
                        {/* {activeTab === 'Following' && (
                            <Box sx={{ height: 'auto', width: '100%' }}>
                               No Following
                            </Box>
                        )} */}
                    </Box>
                </Box>
                {/* Right section */}
                <div className='leftnone'
                    style={{
                        minHeight: '100vh',
                        height: 'calc(100vh - 57px)',
                        position: 'fixed', top: '57px',
                        overflowY: 'auto',
                        width: "max-content",
                        display: { xs: 'none', md: 'none', lg: 'block' },
                    }}
                >
                    <Typography sx={{ fontSize: '20px', fontWeight: '500', marginLeft: '20px', marginTop: '40px' }}>
                        Who to follow?
                    </Typography>
                    {
                        filteredUsers.length > 0 ? (
                            <Box sx={{ marginTop: '20px', padding: 'px', paddingRight: '75px' }}>

                                {filteredUsers.map((user) => (
                                    <Box
                                        key={user.uid}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '20px',
                                            width: 'max-content',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <Avatar
                                            alt={user.firstName}
                                            src={user.photoURL}
                                            sx={{ width: 40, height: 40, marginBottom: '10px', marginLeft: '10px' }}
                                            onClick={() => handleUserClick(user)}
                                        />
                                        <Box sx={{ marginLeft: '10px' }}>
                                            <Typography sx={{ fontSize: '16px', fontWeight: '700', textAlign: 'center' }}>
                                                {user.firstName}
                                            </Typography>
                                            <Typography sx={{ fontSize: '14px', fontWeight: '400', textAlign: 'center', color: '#6B7280' }}>
                                                {user.bio || "No Bio"}
                                            </Typography>
                                        </Box>
                                        <Button onClick={() => handleFollowToggle(user)} sx={{ height: '30px', width: 'max-content', borderRadius: '40px', border: '1px solid black', color: 'black', textTransform: 'inherit', marginLeft: '20px', marginTop: '-10px' }}>
                                            {currentUser?.following?.includes(user.uid) ? "Following" : "Follow"}
                                        </Button>
                                        {/* <Typography>
                                            Followers({user.followers?.length || 0}) Following({user.following?.length || 0})
                                        </Typography> */}
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Typography sx={{ fontSize: '16px', textAlign: 'center', marginTop: '20px' }}>
                                No users found.
                            </Typography>
                        )
                    }

                    {/* {selectedUser && (
                        <UserProfile />
                        // <Box sx={{ marginTop: '30px', padding: '20px', backgroundColor: 'lightgray' }}>
                        //     <Typography sx={{ fontSize: '20px', fontWeight: '600', textAlign: 'center' }}>
                        //         {selectedUser.firstName}'s Profile
                        //     </Typography>
                        //     <Avatar
                        //         alt={selectedUser.firstName}
                        //         src={selectedUser.photoURL}
                        //         sx={{ width: 80, height: 80, margin: '20px auto' }}
                        //     />
                        //     <Typography sx={{ fontSize: '16px', textAlign: 'center' }}>
                        //         {selectedUser.bio || "No Bio"}
                        //     </Typography>
                        //     <Typography sx={{ fontSize: '16px', textAlign: 'center', marginTop: '10px' }}>
                        //         Followers: {selectedUser.followers?.length || 0}
                        //     </Typography>
                        //     <Typography sx={{ fontSize: '16px', textAlign: 'center' }}>
                        //         Following: {selectedUser.following?.length || 0}
                        //     </Typography>
                        // </Box>
                    )} */}
                </div>
            </Box>
        </Box>
    );
}



