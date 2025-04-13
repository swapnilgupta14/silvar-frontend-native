import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

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
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadUserWithRetry = async (retryCount = 0): Promise<void> => {
    try {
      const userData = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (userData) {
        try {
          const parsed = JSON.parse(userData);
          setUser(parsed);
        } catch (parseError) {
          console.error("Failed to parse user data:", parseError);
          await AsyncStorage.removeItem(USER_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error(`Failed to load user data (attempt ${retryCount + 1}):`, error);
      if (retryCount < MAX_RETRIES - 1) {
        await delay(RETRY_DELAY);
        return loadUserWithRetry(retryCount + 1);
      }
      // Clear potentially corrupted data on final failure
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } finally {
      if (retryCount === MAX_RETRIES - 1) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUserWithRetry();
  }, []);

  const checkNetworkConnection = async (): Promise<void> => {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      throw new Error("No internet connection");
    }
  };

  const signIn = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      try {
        await checkNetworkConnection();

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
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred");
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