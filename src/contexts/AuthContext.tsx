
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { User, authenticateUser, createUser, getUserByEmail, initializeInventory } from '@/lib/localUserStorage';
import { products } from '@/data/products';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize the system
  useEffect(() => {
    // Initialize inventory from products data
    initializeInventory(products);
    
    // Check if user is already logged in (from a previous session)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Verify user still exists in our "file"
        const existingUser = getUserByEmail(parsedUser.email);
        if (existingUser && existingUser.password === parsedUser.password) {
          setUser(existingUser);
        } else {
          localStorage.removeItem('currentUser');
        }
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const authenticatedUser = authenticateUser(email, password);
      
      if (!authenticatedUser) {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return;
      }
      
      setUser(authenticatedUser);
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      
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
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Check if email has 'admin' to make them an admin for testing
      const isAdmin = email.toLowerCase().includes('admin');
      const newUser = createUser(email, password, isAdmin);
      
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
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
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
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
