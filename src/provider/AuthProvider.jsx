'use client';
import { createContext, useEffect, useState } from 'react';
import { supabase } from './../lib/supabase/product';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Google Login
  const googleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) throw error;
  };

  // Listen to Auth State Changes
  useEffect(() => {
    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }
      if (data?.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    };

    getUserData(); // Initial fetch

    // Listen for authentication changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // Check if session or user actually changes
        if (session?.user && session.user !== user) {
          setUser(session.user);
          setIsAuthenticated(true);
        } else if (!session?.user && user !== null) {
          setUser(null);
          setIsAuthenticated(false);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Dependency on user state

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        googleLogin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
