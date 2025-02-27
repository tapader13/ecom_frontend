'use client';
import { createContext, useEffect, useState, useMemo } from 'react';
import { supabase } from './../lib/supabase/product';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { getUser, setUserInfo } from '@/lib/redux/user/userSlice';
import { selectUser } from '@/lib/redux/user/userSlice'; // Assuming you have a selector to get the user from Redux

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialFetchDone, setInitialFetchDone] = useState(false); // To track if the first fetch is done
  const dispatch = useAppDispatch();

  // Get the user from Redux store
  const user = useAppSelector(getUser);

  // Only fetch the session on initial load and store it in Redux once
  useEffect(() => {
    // If the user is already in Redux, skip fetching the session
    if (user?.user) {
      setIsAuthenticated(true);
      setLoading(false);
      setInitialFetchDone(true);
      return;
    }

    // Otherwise, fetch the session
    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
        return;
      }

      if (data.session?.user) {
        // Store user in Redux once on the first load
        dispatch(setUserInfo(data.session?.user));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Done loading
      setInitialFetchDone(true); // Mark first fetch as done
    };

    // Only perform session fetch once on the first render
    if (!initialFetchDone) {
      getUserSession();
    }

    // Listen for authentication changes after the first fetch is done
    if (initialFetchDone) {
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session?.user) {
            dispatch(setUserInfo(session.user)); // Store user in Redux
            setIsAuthenticated(true);
          } else {
            dispatch(setUserInfo(null)); // Clear user from Redux
            setIsAuthenticated(false);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe(); // Cleanup listener on unmount
      };
    }
  }, [dispatch, initialFetchDone, user]); // Only re-run when the session is not fetched initially or user changes

  // Memoize the context value to avoid unnecessary re-renders
  const authContextValue = useMemo(
    () => ({ isAuthenticated, loading }),
    [isAuthenticated, loading]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
