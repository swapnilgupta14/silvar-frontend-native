import { useRouter } from "expo-router";
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
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email.trim() && password.trim()) {
          const mockUser = {
            id: "123",
            email,
            username: email.split("@")[0],
          };

          await AsyncStorage.setItem("user", JSON.stringify(mockUser));
          setUser(mockUser);
          router.replace("/(tabs)/home");
        } else {
          throw new Error("Invalid credentials");
        }
      } catch (error) {
        console.error("Sign in error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const signUp = useCallback(
    async (email: string, password: string, username: string) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (email.trim() && password.trim() && username.trim()) {
          const mockUser = {
            id: "123",
            email,
            username,
          };

          await AsyncStorage.setItem("user", JSON.stringify(mockUser));
          setUser(mockUser);
          router.replace("/(tabs)/home");
        } else {
          throw new Error("Invalid input");
        }
      } catch (error) {
        console.error("Sign up error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const forgotPassword = useCallback(
    async (email: string) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        router.replace("/(auth)/login");
      } catch (error) {
        console.error("Forgot password error:", error);
        throw error;
      }
    },
    [router]
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
