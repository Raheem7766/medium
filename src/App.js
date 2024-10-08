import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './components/Home/Header/Login/Firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

import Home from './components/Home/Home';
import Main from './components/Home/main/Main';
import NavPage from './components/Home/Header/About';
import Member from './components/Home/Header/Member';
import Profile from './components/Home/main/Profile';
import Setting from './components/Home/main/Setting';
import Write from './components/Home/main/Write';
import Preview from './components/Home/main/Preview';
import SinglePost from './components/Home/main/SinglePost';
import UserProfile from './components/Home/main/UserProfile';

export default function App() {
    const [user] = useAuthState(auth);
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const postsCollection = collection(db, "blogs");
            const q = query(postsCollection, orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const fetchedPosts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log('Fetched posts:', fetchedPosts);
            setPosts(fetchedPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const addPost = (newPost) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <Navigate to="/medium" /> : <Home />} />
                <Route path="/medium" element={user ? <Main posts={posts} /> : <Navigate to="/" />} />
                <Route path="/about" element={<NavPage />} />
                <Route path="/membership" element={<Member />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/me/setting" element={<Setting />} />
                <Route path="/edit" element={<Write addPost={addPost} fetchPosts={fetchPosts} />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/user/:userId" element={<UserProfile />} />
            </Routes>
        </Router>
    );
}