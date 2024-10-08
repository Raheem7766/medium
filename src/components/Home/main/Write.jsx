import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDialog } from '../context/context';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IoIosNotificationsOutline } from "react-icons/io";
import { auth, storage } from '../Header/Login/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactQuill from "react-quill";
import Preview from './Preview';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Header/Login/Firebase';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function Write({ addPost, fetchPosts }) {
    const { formattedName } = useDialog();
    const [user] = useAuthState(auth);
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [publish, setPublish] = useState(false);
    const [image, setImage] = useState(null);
    // const [imageUrl, setImageUrl] = useState("");
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const isPublishDisabled = !title.trim() || !value.trim();

    const handlePreview = () => {
        if (title.trim() && value.trim()) {
            setPublish(true);
        } else {
            alert("Please fill in both the title and story before publishing.");
        }
    };

    const handlePublish = async () => {
        // let url = "";
        // if (image) {
        //     const imageRef = ref(storage, `images/${image.name}`);
        //     await uploadBytes(imageRef, image);
        //     url = await getDownloadURL(imageRef);
        //     // setImageUrl(url);
        // }
        // const postData = {
        //     title,
        //     description: value,
        //     author: formattedName || "Anonymous",
        //     createdAt: new Date(),
        //     imageUrl: url
        // };

        // try {
        //     const docRef = await addDoc(collection(db, "blogs"), postData);
        //     toast.success("Post published successfully!");
        //     addPost({ id: docRef.id, ...postData });
        //     fetchPosts();
        //     navigate('/');
        // } catch (error) {
        //     console.error("Error adding post:", error);
        //     toast.error("Failed to publish the post.");
        // }    
    };

    return (
        <Box sx={{ height: '100vh', width: '100%' }}>
            <Box sx={{
                width: { xs: '90%', sm: '85%', md: '80%', lg: '70%' },
                height: '65px',
                margin: 'auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: { xs: 'wrap', sm: 'nowrap' }
                }}>
                    <Link to="/medium">
                        <Typography className='med' variant="h2" sx={{
                            fontSize: { xs: '20px', sm: '25px', md: '30px' },
                            fontWeight: '700',
                            color: '#191919',
                            cursor: 'pointer',
                            marginLeft: '7px',
                            flexShrink: 0,
                            marginTop: { xs: '0px', sm: '0px' }
                        }}>Medium</Typography>
                    </Link>

                    <Typography sx={{
                        fontSize: { xs: '10px', sm: '12px', md: '13px' },
                        fontWeight: '400',
                        color: '#000000',
                        marginLeft: { xs: '10px' },
                        marginTop: '7px',
                        flexShrink: 0
                    }}>
                        Draft in {formattedName}
                    </Typography>
                    {/* <Typography sx={{
                        fontSize: { xs: '10px', sm: '12px', md: '13px' },
                        fontWeight: '400',
                        color: '#000000',
                        marginLeft: '16px',
                        marginTop: '7px',
                        flexShrink: 0
                    }}>
                        Saved
                    </Typography> */}
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    paddingRight: '21px',
                    overflow: 'hidden'
                }}>
                    <Button sx={{
                        height: '25px',
                        width: 'max-content',
                        backgroundColor: title.trim() && value.trim() ? "#1A8917" : "#C6E1C5",
                        borderRadius: '40px',
                        color: 'white',
                        fontSize: '13px',
                        textTransform: 'none',
                        cursor: title.trim() && value.trim() ? 'pointer' : 'not-allowed',
                        flexShrink: 0
                    }} disabled={isPublishDisabled} onClick={handlePreview}>
                        Publish
                    </Button>
                    {/* <MoreHorizIcon sx={{
                        cursor: 'pointer',
                        color: '#6B6B6B',
                        ":hover": { color: "black" },
                        flexShrink: 0
                    }} />
                    <IoIosNotificationsOutline size={20} color='#747474' cursor="pointer" style={{}} /> */}

                    {user && user.photoURL ? (
                        <Box sx={{ height: '32px', width: '32px', borderRadius: '50%', backgroundColor: 'pink', flexShrink: 0 }}>
                            <img src={user.photoURL} alt="User Profile" style={{ height: '100%', width: '100%', borderRadius: '50%' }} />
                        </Box>
                    ) : (
                        <span>No Image</span>
                    )}
                </Box>
            </Box>

            <section className="w-[90%] md:w-[80%] lg:w-[50%] mx-auto py-[3rem]">
                {publish ? (
                    <Preview setPublish={setPublish} title={title} description={value} image={image} addPost={handlePublish} />
                ) : (
                    <>
                        <input type="text" placeholder='Title' className='text-4xl md:text-5xl outline-none w-full'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} />
                        <ReactQuill theme="bubble" value={value} onChange={setValue} placeholder="Tell Your Story..." className="write my-5" />
                    </>
                )}
            </section>
        </Box>
    );
}
