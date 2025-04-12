import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, username: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
};

const USER_STORAGE_KEY = "user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
        try {
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
        } catch (clearError) {
          console.error("Failed to clear corrupted user data:", clearError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!email.trim() || !password.trim()) {
          throw new Error("Email and password are required");
        }

        const mockUser = {
          id: "123",
          email,
          username: email.split("@")[0],
        };

        try {
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
        } catch (storageError) {
          console.error("Failed to save user to storage:", storageError);
          throw new Error("Failed to save login information");
        }

        setUser(mockUser);
        return true;
      } catch (error) {
        console.error("Sign in error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signUp = useCallback(
    async (email: string, password: string, username: string): Promise<boolean> => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!email.trim() || !password.trim() || !username.trim()) {
          throw new Error("All fields are required");
        }

        const mockUser = {
          id: "123",
          email,
          username,
        };

        try {
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
        } catch (storageError) {
          console.error("Failed to save user to storage:", storageError);
          throw new Error("Failed to save user information");
        }

        setUser(mockUser);
        return true;
      } catch (error) {
        console.error("Sign up error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      try {
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
      } catch (storageError) {
        console.error("Failed to remove user from storage:", storageError);
        // Continue with sign out even if storage removal fails
      }
      
      setUser(null);
      return true;
    } catch (error) {
      console.error("Sign out error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        if (!email.trim()) {
          throw new Error("Email is required");
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log(`Password reset requested for ${email}`);
        
        return true;
      } catch (error) {
        console.error("Forgot password error:", error);
        throw error;
      }
    },
    []
  );

  const value = useMemo(
    () => ({ user, isLoading, signIn, signUp, signOut, forgotPassword }),
    [user, isLoading, signIn, signUp, signOut, forgotPassword]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};