import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { auth, db } from '../Header/Login/Firebase';
import { Box, Typography } from '@mui/material';
import MainNav from './MainNav';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaHandsClapping } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { CiSaveDown2 } from 'react-icons/ci';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { IosShareOutlined } from '@mui/icons-material';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import CommentDialog from './Comment';
import ShareModal from './ShareModel';

export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user] = useAuthState(auth);
    const [photoURL, setPhotoURL] = useState(null);
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
    const [openShareModal, setOpenShareModal] = useState(false);
    const [recommendedPosts, setRecommendedPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            const postDoc = await getDoc(doc(db, 'blogs', id));
            if (postDoc.exists()) {
                setPost(postDoc.data());
            } else {
                console.log('No such post!');
            }
        };

        fetchPost();
    }, [id]);

    useEffect(() => {
        if (user && user.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user]);

    // useEffect(() => {
    //     const fetchPost = async () => {
    //         const postDoc = await getDoc(doc(db, 'blogs', id));
    //         if (postDoc.exists()) {
    //             const fetchedPost = postDoc.data();
    //             setPost(fetchedPost);

    //             // Handle tags based on its type
    //             const tags = Array.isArray(fetchedPost.tags) ? fetchedPost.tags : (fetchedPost.tags ? fetchedPost.tags.split(',') : []);

    //             if (tags.length > 0) {
    //                 const recommendedQuery = query(
    //                     collection(db, 'blogs'),
    //                     where('tags', 'array-contains-any', tags), // Adjust the condition as needed
    //                     orderBy('createdAt', 'desc') // Order by creation date
    //                 );

    //                 const recommendedSnapshot = await getDocs(recommendedQuery);
    //                 const recommendedData = recommendedSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    //                 setRecommendedPosts(recommendedData);
    //             }
    //         } else {
    //             console.log('No such post!');
    //         }
    //     };

    //     fetchPost();
    // }, [id]);


    if (!post) {
        return <div>Loading post details...</div>;
    }

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleClap = async () => {
        if (!post) return;

        const postRef = doc(db, 'blogs', id);
        const updatedClapCount = (post.clapCount || 0) + 1;

        try {
            await updateDoc(postRef, { clapCount: updatedClapCount });
            setPost((prevPost) => ({ ...prevPost, clapCount: updatedClapCount }));
        } catch (error) {
            console.error('Error updating clap count:', error);
        }
    };




    return (
        <>
            <Box>
                <MainNav />

                <Box
                    sx={{
                        height: 'auto',
                        width: { xs: '90%', sm: '90%', md: '700px', lg: '700px' },
                        margin: 'auto',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: { xs: '25px', sm: '25px', md: '50px', lg: '50px' },
                            fontWeight: '700',
                            marginTop: '20px',
                        }}
                    >
                        {post.title}
                    </Typography>

                    <Box
                        sx={{
                            height: 'auto',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '20px',
                            gap: '10px',
                        }}
                    >
                        <div className='h-[40px] w-[40px] rounded-[50%]'>
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
                                        position: 'relative',
                                    }}
                                >
                                    <img
                                        src={user.photoURL}
                                        alt='User Profile'
                                        style={{ height: '100%', width: '100%', borderRadius: '50%' }}
                                    />
                                </Box>
                            ) : (
                                <span>No Image</span>
                            )}
                        </div>
                        <Box>
                            <p style={{ marginLeft: '10px' }}>{post.author}</p>
                            <p style={{ marginLeft: '10px', color: '#6B6B6B' }}>{formatDate(post.createdAt)}</p>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            width: '100%',
                            height: '50px',
                            marginTop: '20px',
                            borderTop: '1px solid #F2F2F2',
                            borderBottom: '1px solid #F2F2F2',
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: { xs: '10px', sm: '0' },
                            alignItems: 'center',
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <Box
                                onClick={handleClap}
                                sx={{
                                    fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    paddingTop: '10px',
                                    paddingLeft: '10px',
                                }}
                            >
                                <FaHandsClapping color='black' cursor='pointer' />
                                {post.clapCount || 0}
                            </Box>
                            <Box
                                onClick={() => setOpenCommentDialog(true)}
                                sx={{
                                    fontSize: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    paddingTop: '10px',
                                    paddingLeft: '30px',
                                }}
                            >
                                <FaComment color='black' cursor='pointer' />
                                {post.comments ? post.comments.length : 0}
                            </Box>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Box
                                sx={{
                                    fontSize: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    paddingLeft: '10px',
                                }}
                            >
                                <CiSaveDown2 color='#6B6B6B' cursor='pointer' />
                            </Box>
                            <Box
                                sx={{
                                    fontSize: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    paddingLeft: '30px',
                                }}
                            >
                                <MdOutlineSlowMotionVideo color='#6B6B6B' cursor='pointer' />
                            </Box>
                            <Box
                                sx={{
                                    fontSize: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    paddingLeft: '30px',
                                }}
                            >
                                <IosShareOutlined onClick={() => setOpenShareModal(!openShareModal)} sx={{ color: '#6B6B6B', cursor: 'pointer' }} />
                            </Box>
                            <Box
                                sx={{
                                    fontSize: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    paddingLeft: '30px',
                                }}
                            >
                                <HiOutlineDotsHorizontal color='#6B6B6B' cursor='pointer' />
                            </Box>
                        </Box>
                    </Box>

                    <div
                        dangerouslySetInnerHTML={{ __html: post.description }}
                        style={{
                            fontSize: '20px',
                            fontWeight: '500',
                            color: '#242424',
                            marginTop: '30px',
                        }}
                    />

                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt='Post Image'
                            style={{
                                width: '100%',
                                height: { xs: '200px', sm: '300px', md: '350px' },
                                objectFit: 'cover',
                                marginTop: '30px',
                            }}
                        />
                    )}

                    <p
                        style={{
                            fontSize: '20px',
                            fontWeight: '500',
                            color: '#6B6B6B',
                        }}
                    >
                        #{post.tags}
                    </p>
                </Box>

                <Box
                    sx={{
                        width: '100%',
                        height: 'auto',
                        backgroundColor: '#F3F4F6',
                        marginTop: '30px',
                        padding: { xs: '10px', sm: '20px' },
                    }}
                >
                    <Box
                        sx={{
                            height: 'auto',
                            width: { xs: '90%', sm: '80%', md: '700px' },
                            margin: 'auto',
                            padding: '1px',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                                fontWeight: '700',
                                marginTop: '30px',
                            }}
                        >
                            Recommended from Medium
                        </h2>
                        {/* {recommendedPosts.length > 0 ? (
                            <Box>
                                {recommendedPosts.map(recommended => (
                                    <Box key={recommended.id} sx={{ margin: '10px 0' }}>
                                        <Typography variant="h6">{recommended.title}</Typography>
                                        <Typography variant="body2">{recommended.description}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ) : (  */}
                        <p
                            style={{
                                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                fontWeight: '500',
                                marginTop: '50px',
                            }}
                        >
                            No recommended posts found based on your preferences.
                        </p>
                        {/* )} */}
                    </Box>
                </Box>
            </Box>

            <CommentDialog
                open={openCommentDialog}
                onClose={() => setOpenCommentDialog(false)}
                postId={id}
                existingComments={post.comments}
            />
            <ShareModal
                open={openShareModal}
                onClose={() => setOpenShareModal(false)}
                setOpenShareModal={setOpenShareModal}
            />
        </>
    );
}
