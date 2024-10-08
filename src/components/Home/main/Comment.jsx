import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { arrayUnion, doc, updateDoc, getDoc } from 'firebase/firestore'; 
import { auth, db } from '../Header/Login/Firebase'; 
import { RxCross2 } from 'react-icons/rx';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDialog } from '../context/context';
import { MoreHorizOutlined } from '@mui/icons-material';

const CommentDialog = ({ open, onClose, postId, existingComments }) => {
    const [newComment, setNewComment] = useState('');
    const [photoURL, setPhotoURL] = useState(null);
    const [commentOptionsIndex, setCommentOptionsIndex] = useState(null);
    const [comments, setComments] = useState(existingComments || []);
    const [user] = useAuthState(auth);
    const { formattedName } = useDialog();
    const [editingCommentIndex, setEditingCommentIndex] = useState(null);

    useEffect(() => {
        if (user && user.photoURL) {
            setPhotoURL(user.photoURL);
        }
    }, [user]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const postRef = doc(db, 'blogs', postId);
                const postSnap = await getDoc(postRef);
                if (postSnap.exists()) {
                    setComments(postSnap.data().comments || []);
                }
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        if (editingCommentIndex !== null) {
            const updatedComments = comments.map((comment, index) =>
                index === editingCommentIndex ? { ...comment, comment: newComment } : comment
            );

            const postRef = doc(db, 'blogs', postId);
            try {
                await updateDoc(postRef, {
                    comments: updatedComments,
                });
                setComments(updatedComments);
                setEditingCommentIndex(null); 
            } catch (error) {
                console.error('Error updating comment:', error);
            }
        } else {
            const newCommentData = {
                username: formattedName || 'Anonymous',
                comment: newComment,
                createdAt: new Date(),
            };

            const postRef = doc(db, 'blogs', postId);
            try {
                await updateDoc(postRef, {
                    comments: arrayUnion(newCommentData),
                });

                setComments(prevComments => [...prevComments, newCommentData]);
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }

        setNewComment('');
    };

    const handleDeleteComment = async (comment) => {
        const postRef = doc(db, 'blogs', postId);
        try {
            const updatedComments = comments.filter(c => c.comment !== comment.comment);
            await updateDoc(postRef, {
                comments: updatedComments
            });
            setComments(updatedComments);
            setCommentOptionsIndex(null)
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const toggleCommentOptions = (index) => {
        setCommentOptionsIndex(prevIndex => prevIndex === index ? null : index);
    };

    const handleEditComment = (index) => {
        setNewComment(comments[index].comment); 
        setEditingCommentIndex(index); 
        setCommentOptionsIndex(null); 
    };

    return (
        <Box>
            <Dialog open={open} onClose={onClose} PaperProps={{
                style: {
                    height: '100vh', width: '350px', position: 'absolute',
                    top: 0, right: 0, margin: 0,
                }
            }}>
                <RxCross2 style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '26px', cursor: 'pointer' }} onClick={onClose} />
                <DialogTitle fontWeight={700} marginTop={0}>Response ({comments.length})</DialogTitle>
                <DialogContent>
                    <Box sx={{ height: '180px', width: '100%', margin: 'auto', boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: '1px' }}>
                        <Box sx={{ display: 'flex', }}>
                            <div className='h-[30px] w-[30px] rounded-[50%] bg-black ml-[10px] mt-[10px]'>
                                {user && user.photoURL ? (
                                    <Box sx={{ height: '100%', width: '100%', cursor: 'pointer', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
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
                            <p style={{ marginLeft: '10px', marginTop: '10px' }}>{formattedName}</p>
                        </Box>
                        <TextField
                            margin="dense"
                            type="text"
                            value={newComment}
                            placeholder='What are your thoughts?'
                            onChange={(e) => setNewComment(e.target.value)}
                            sx={{
                                width: '90%',
                                marginLeft: '5%',
                                border: '1px solid #E5E7EB',
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#E5E7EB',
                                        boxShadow: 'none', 
                                    },
                                },
                            }}
                        />
                        <DialogActions>
                            <Button sx={{ color: 'black', marginTop: '10px' }} onClick={onClose}>Cancel</Button>
                            <Button sx={{ borderRadius: '40px', backgroundColor: '#15803D', color: 'white', marginTop: '10px' }} onClick={handleCommentSubmit} disabled={!newComment}>
                                {editingCommentIndex !== null ? 'Update' : 'Submit'}
                            </Button>
                        </DialogActions>
                    </Box>
                    <Box sx={{ marginTop: '10px', position: 'relative' }}>
                        {comments.length > 0 ? (
                            comments.map((comment, index) => (
                                <Box key={index} sx={{ borderTop: '1px solid #E5E7EB', marginBottom: '10px' }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <div className='h-[30px] w-[30px] rounded-[50%] bg-black ml-[10px] mt-[10px]'>
                                            {user && user.photoURL ? (
                                                <Box sx={{ height: '100%', width: '100%', cursor: 'pointer', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
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
                                        <p style={{ marginLeft: '10px', marginTop: '10px' }}>{formattedName}</p>
                                        <MoreHorizOutlined
                                            onClick={() => toggleCommentOptions(index)}
                                            sx={{ fontSize: '20px', color: '#6B6B6B', cursor: 'pointer', marginTop: '10px', marginLeft: 'auto' }}
                                        />
                                    </Box>
                                    <Box sx={{ marginTop: '10px', marginLeft: '20px' }}>
                                        {comment.comment}
                                    </Box>

                                    {commentOptionsIndex === index && (
                                        <Box sx={{ position: 'relative', marginTop: '-35px', width: '50%', marginLeft: '50%', height: '80px' }}>
                                            <Box sx={{ backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', }}>
                                                <Button onClick={() => handleEditComment(index)} sx={{ color: 'black', fontSize: '12px', fontWeight: '400' }}>Edit this response</Button>
                                            </Box>
                                            <Box sx={{ backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                <Button sx={{ color: 'black', fontSize: '12px', fontWeight: '400', paddingLeft: '0', textAlign: 'left' }} onClick={() => handleDeleteComment(comment)}>
                                                    Delete
                                                </Button>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            ))
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CommentDialog;
