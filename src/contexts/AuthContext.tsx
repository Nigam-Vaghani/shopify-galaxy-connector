
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isAdmin } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Check if we're using placeholder Supabase credentials for dev mode
const isDevelopmentMode = () => {
  return import.meta.env.VITE_SUPABASE_URL === undefined || 
         import.meta.env.VITE_SUPABASE_URL.includes('placeholder');
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const devMode = isDevelopmentMode();
    
    if (devMode) {
      // Set up development mode auth state after a short delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // If not in dev mode, use real Supabase auth
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        isAdmin(session.user.id).then(result => {
          setUserIsAdmin(result);
        });
      }
      
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          isAdmin(session.user.id).then(result => {
            setUserIsAdmin(result);
          });
        } else {
          setUserIsAdmin(false);
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (isDevelopmentMode()) {
        // Simulate successful login in development mode
        setTimeout(() => {
          const mockUser = {
            id: 'dev-user-id',
            email: email,
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString()
          };
          
          setUser(mockUser as User);
          setUserIsAdmin(email.includes('admin')); // Make emails with "admin" in them admins
          setIsLoading(false);
          
          toast({
            title: "Development Mode",
            description: "Signed in successfully (DEVELOPMENT MODE)",
          });
        }, 800);
        return;
      }
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message || "An error occurred during sign in.",
        variant: "destructive",
      });
    } finally {
      if (!isDevelopmentMode()) {
        setIsLoading(false);
      }
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (isDevelopmentMode()) {
        // Simulate successful signup in development mode
        setTimeout(() => {
          const mockUser = {
            id: 'dev-user-id',
            email: email,
            app_metadata: {},
            user_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString()
          };
          
          setUser(mockUser as User);
          setUserIsAdmin(email.includes('admin')); // Make emails with "admin" in them admins
          setIsLoading(false);
          
          toast({
            title: "Development Mode",
            description: "Account created successfully (DEVELOPMENT MODE)",
          });
        }, 800);
        return;
      }
      
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast({
        title: "Account created",
        description: "Your account has been successfully created.",
      });
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "An error occurred during sign up.",
        variant: "destructive",
      });
    } finally {
      if (!isDevelopmentMode()) {
        setIsLoading(false);
      }
    }
  };

  const signOut = async () => {
    try {
      if (isDevelopmentMode()) {
        // Simulate sign out in development mode
        setUser(null);
        setUserIsAdmin(false);
        toast({
          title: "Development Mode",
          description: "Signed out successfully (DEVELOPMENT MODE)",
        });
        return;
      }
      
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An error occurred during sign out.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: userIsAdmin,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
