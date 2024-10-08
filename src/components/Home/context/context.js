import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../Header/Login/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query } from 'firebase/firestore';

const DialogContext = createContext();
export const useDialog = () => useContext(DialogContext);

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const DialogProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [Publish, setPublish] = useState(false)
    const [searchQuery, setSearchQuery] = useState("");
    const [currentUser, setCurrentUser] = useState(false);
    const [userLoading, setUserLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);


    const handleClickOpen = () => setOpen(true);
    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(prevState => toggle(prevState));
    };

    const [user] = useAuthState(auth);

    const formatDisplayName = (displayName) => {
        if (!displayName) return 'User';
        const formattedName = displayName.replace(/\s+/g, '');
        return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
    };

    const formattedName = user && user.displayName ? formatDisplayName(user.displayName) : 'User';

    const [users, setUser] = useState({
        name: '',
        photoURL: '',
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUser]);

    // get users
    useEffect(() => { 
        const getUsers = () => {
            const postRef = query(collection(db, "users"));
            onSnapshot(postRef, (snapshot) => {
                setAllUsers(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
                setUserLoading(false);
            });
        };
        getUsers();
    }, []);


    return (
        <DialogContext.Provider value={{ open, selectedValue, handleClickOpen, handleClose, setOpen, toggleSidebar, isSidebarOpen, handleToggle, isOpen, formattedName, users, setUser, Publish, setPublish, searchQuery, setSearchQuery }}>
            {children}
        </DialogContext.Provider>
    );
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self");
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const AppProvider = ({ children }) => {
    return (
        <AuthProvider>
            <DialogProvider>
                {children}
            </DialogProvider>
        </AuthProvider>
    );
};

export const toggle = (prevState) => !prevState;

