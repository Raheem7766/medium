import { Box, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import { MoreHorizOutlined } from '@mui/icons-material';
import { auth, db } from '../Header/Login/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { collection, deleteDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useDialog } from '../context/context';

export default function Posts({ posts: initialPosts }) {
    const [photoURL, setPhotoURL] = useState(null);
    const [userPhotos, setUserPhotos] = useState({});
    const [posts, setPosts] = useState(initialPosts);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { searchQuery } = useDialog();

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'blogs'), (snapshot) => {
            const updatedPosts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            // const sortedPosts = updatedPosts.sort((a, b) => {
            //     const aTimestamp = a.createdAt?.toMillis() || 0;
            //     const bTimestamp = b.createdAt?.toMillis() || 0;
            //     return aTimestamp - bTimestamp;
            // });

            setPosts(updatedPosts);
        });

        return () => unsubscribe();
    }, []);


    useEffect(() => {
        const fetchUserPhotos = async () => {
            const photos = {};
            for (const post of initialPosts) {
                if (post.authorId && !photos[post.authorId]) {
                    const userDoc = await getDoc(doc(db, 'users', post.authorId));
                    if (userDoc.exists()) {
                        photos[post.authorId] = userDoc.data().photoURL;
                    }
                }
            }
            setUserPhotos(photos);
        };

        fetchUserPhotos();
    }, [initialPosts]);

    // useEffect(() => {
    //     console.log(initialPosts); 
    //     const sortedPosts = [...initialPosts].sort((a, b) => {
    //         const createdAtA = a.createdAt?.seconds || 0; 
    //         const createdAtB = b.createdAt?.seconds || 0; 
    //         return createdAtB - createdAtA; 
    //     });
    //     setPosts(sortedPosts);
    // }, [initialPosts]);


    if (!posts) {
        return <div>Loading posts...</div>;
    }

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
            setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
            // alert("Document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };
    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };  

    const filteredPosts = posts.filter((post) => {
        return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <Box>
            {filteredPosts.map((post) => (
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
                                    {userPhotos[post.authorId] ? (
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
                                                src={userPhotos[post.authorId]}
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
            ))}
        </Box>
    );
}
