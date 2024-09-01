import { createContext, useState, useContext, useEffect } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// create context
const AuthContext = createContext();

// Provider Context
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Sign in with Google
  const signinWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  // Sign up with Email and Password
  const signupWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Email and Password
  const signinWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign out
  const logout = () => signOut(auth);

  const value = {
    currentUser,
    setCurrentUser,
    signinWithGoogle,
    signupWithEmail,      // Added this
    signinWithEmail,      // Added this
    logout,
  };

  // Set currentUser
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
