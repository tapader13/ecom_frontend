'use client';
import { createContext, useEffect, useState, useMemo } from 'react';
import { supabase } from './../lib/supabase/product';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Fetch user session on mount
  useEffect(() => {
    let isMounted = true;

    const getUserSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      if (isMounted) {
        setUser(data.session?.user || null);
        setIsAuthenticated(!!data.session?.user);
        setLoading(false);
      }
    };

    getUserSession();

    // const { data: authListener } = supabase.auth.onAuthStateChange(
    //   (event, session) => {
    //     if (!isMounted) return;
    //     if (session?.user) {
    //       setUser(session.user);
    //       setIsAuthenticated(true);
    //     } else {
    //       setUser(null);
    //       setIsAuthenticated(false);
    //     }
    //     setLoading(false);
    //   }
    // );

    return () => {
      isMounted = false;
      // authListener.subscription.unsubscribe();
    };
  }, []); // ✅ Empty dependency array

  // ✅ Memoize context value to prevent re-renders
  const authContextValue = useMemo(
    () => ({ user, loading, isAuthenticated }),
    [user, loading, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
