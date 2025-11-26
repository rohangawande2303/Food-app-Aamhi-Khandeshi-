"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user profile from Firestore
    const fetchUserProfile = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                return userDoc.data();
            }
            return null;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            return null;
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Fetch additional profile data from Firestore
                const profile = await fetchUserProfile(firebaseUser.uid);
                setUser(firebaseUser);
                setUserProfile(profile);
            } else {
                setUser(null);
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Create user profile in Firestore
    const createUserProfile = async (uid, data) => {
        try {
            await setDoc(doc(db, "users", uid), {
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
        } catch (error) {
            console.error("Error creating user profile:", error);
            throw error;
        }
    };

    // Signup with email and password
    const signup = async (email, password, displayName) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update Firebase Auth profile
        await updateProfile(userCredential.user, {
            displayName: displayName
        });

        // Create Firestore profile
        await createUserProfile(userCredential.user.uid, {
            email: email,
            displayName: displayName,
            photoURL: userCredential.user.photoURL || null,
            provider: "email"
        });

        return userCredential;
    };

    // Login with email and password
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign-In
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const userCredential = await signInWithPopup(auth, provider);

        // Check if user profile exists, if not create one
        const existingProfile = await fetchUserProfile(userCredential.user.uid);
        if (!existingProfile) {
            await createUserProfile(userCredential.user.uid, {
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL,
                provider: "google"
            });
        }

        return userCredential;
    };

    // Logout
    const logout = () => {
        return signOut(auth);
    };

    const value = {
        user,
        userProfile,
        signup,
        login,
        signInWithGoogle,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {loading ? (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7f0dd] via-[#faf5eb] to-[#f7f0dd]">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#7a5c43]/30 border-t-[#7a5c43] rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[#7a5c43] font-medium">Loading...</p>
                    </div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};
