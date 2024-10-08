import React, { useState, useEffect } from 'react';
import { Button, Box, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Divider } from '@mui/material';
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import CloseIcon from '@mui/icons-material/Close';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useDialog } from '../context/context';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const ProfileInformation = ({ open, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [pronouns, setPronouns] = useState('');
    const [bio, setBio] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [file, setFile] = useState(null);
    const [isChanged, setIsChanged] = useState(false);
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
    const { setUser } = useDialog();
    const firestore = getFirestore();

    const user = auth.currentUser;

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                setName(user.displayName || '');
                setPhotoURL(user.photoURL || '');
                setUser({ name: user.displayName || '', photoURL: user.photoURL || '' });
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setPronouns(data.pronouns || '');
                    setBio(data.bio || '');
                    setPhotoURL(data.photoURL || user.photoURL || '');
                }
            }
        });
    }, [auth, setUser, firestore]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const previewUrl = URL.createObjectURL(selectedFile);
            setPhotoURL(previewUrl);
            setIsChanged(true);
        }
    };

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setIsChanged(true);
    };

    const handleSave = async () => {
        if (auth.currentUser) {
            try {
                let uploadedPhotoURL = photoURL;

                if (file) {
                    const storage = getStorage();
                    const storageRef = ref(storage, `profilePhotos/${user.uid}`);

                    const snapshot = await uploadBytes(storageRef, file);

                    uploadedPhotoURL = await getDownloadURL(snapshot.ref);
                }

                await updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: uploadedPhotoURL,
                });

                await setDoc(doc(firestore, "users", user.uid), {
                    pronouns: pronouns,
                    bio: bio,
                    photoURL: uploadedPhotoURL,
                }, { merge: true });

                setUser((prev) => ({ ...prev, name, photoURL: uploadedPhotoURL, pronouns, bio }));
                onClose();
            } catch (error) {
                console.error('Error updating profile:', error);
            }
        }
    };


    const handleAvatarClick = () => {
        document.getElementById('upload-photo').click();
    };

    return (
        <Box sx={{ padding: 2 }}>
            <CloseIcon onClick={onClose} sx={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer' }} />
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                Profile Information
            </DialogTitle>
            <DialogContent sx={{ padding: 0 }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '16px', fontWeight: '700', color: '#6B6B6B' }}>Photo</div>
                            <Avatar onClick={handleAvatarClick} src={photoURL} alt={name} sx={{ width: 80, height: 80, cursor: 'pointer' }} />
                        </Box>
                        <Box sx={{ flex: 1, marginLeft: 2 }}>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="upload-photo"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <label htmlFor="upload-photo">
                                <Typography color="#1A8917" fontWeight={500} sx={{ marginTop: '25px', fontSize: '14px', cursor: 'pointer' }}>
                                    Update
                                </Typography>
                            </label>
                            <label htmlFor="upload-photo">
                                <Typography color="#C94A4A" fontWeight={500} sx={{ marginTop: '25px', fontSize: '14px', cursor: 'pointer' }}>
                                    Remove
                                </Typography>
                            </label>
                            <Typography sx={{ fontSize: '13px', fontWeight: '500', marginTop: '10px', color: '#6B6B6B' }}>
                                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ width: '100%', marginTop: 2 }}>
                        <label htmlFor="Name">Name*</label>
                        <input
                            value={name}
                            onChange={handleInputChange(setName)}
                            fullWidth
                            maxLength={50}
                            style={{ height: '30px', width: '100%', outline: 'none', backgroundColor: '#F2F2F2', paddingLeft: '10px' }}
                        />
                        <Typography sx={{ textAlign: 'end', fontSize: '13px', marginTop: '5px', color: '#6B6B6B' }}>{name.length}/50</Typography>

                        <label htmlFor="Name">Pronouns</label>
                        <input
                            value={pronouns}
                            onChange={handleInputChange(setPronouns)}
                            placeholder='Add..'
                            fullWidth
                            maxLength={4}
                            style={{ height: '30px', width: '100%', outline: 'none', backgroundColor: '#F2F2F2', paddingLeft: '10px' }}
                        />
                        <Typography sx={{ textAlign: 'end', fontSize: '13px', marginTop: '5px', color: '#6B6B6B' }}>{pronouns.length}/4</Typography>

                        <label htmlFor="Name">Short Bio</label>
                        <textarea
                            value={bio}
                            onChange={handleInputChange(setBio)}
                            fullWidth
                            maxLength={160}
                            style={{ height: '70px', minHeight: '70px', width: '100%', outline: 'none', backgroundColor: '#F2F2F2', paddingLeft: '10px' }}
                        />
                        <Typography sx={{ textAlign: 'end', fontSize: '13px', marginTop: '5px', color: '#6B6B6B' }}>{bio.length}/160</Typography>
                        <Divider sx={{ borderBottom: '2px solid black', marginBottom: '20px', marginTop: '20px' }} />

                        <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: '700', color: '#191919' }}>
                                    About Page
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: '12px', color: '#6B6B6B', paddingTop: '5px' }}>
                                    Personalize with images and more to paint a vivid portrait of yourself.
                                </Typography>
                            </Box>
                            <ArrowOutwardIcon sx={{ color: '#6B6B6B', fontSize: '20px' }} />
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    sx={{ height: '35px', width: '70px', border: '1px solid #1A8917', borderRadius: '40px', fontSize: '12px', color: '#1A8917' }}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    sx={{ height: '35px', width: '70px', border: '1px solid #1A8917', borderRadius: '40px', fontSize: '12px', backgroundColor: '#1A8917', color: 'white' }}
                    onClick={handleSave}
                    color="primary"
                    disabled={!isChanged}
                >
                    {loading ? "Saving..." : "Saved"}
                </Button>
            </DialogActions>
        </Box>
    );
};

export default ProfileInformation;
