import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "expo-router";
import { useToast } from "../components/ToastProvider";

type User = {
  id: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
    username: string
  ) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      if (!email.trim() || !password.trim()) {
        throw new Error("Email and password are required");
      }

      const mockUser = {
        id: "123",
        email,
        username: email.split("@")[0],
      };

      setUser(mockUser);
      showToast("Welcome!", { type: "success" });
      router.push("/(tabs)/home");
      return true;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("An unexpected error occurred");
    }
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, username: string) => {
      try {
        if (!email.trim() || !password.trim() || !username.trim()) {
          throw new Error("All fields are required");
        }

        const mockUser = {
          id: "123",
          email,
          username,
        };

        setUser(mockUser);
        showToast("Welcome!", { type: "success" });
        router.push("/(tabs)/home");
        return true;
      } catch (error) {
        throw error instanceof Error
          ? error
          : new Error("An unexpected error occurred");
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      setUser(null);
      router.push("/auth?type=signin");
      return true;
    } catch (error) {
      console.error("Sign out error:", error);
      return false;
    }
  }, []);

  const forgotPassword = useCallback(async (email: string) => {
    try {
      if (!email.trim()) {
        throw new Error("Email is required");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showToast("Password reset email sent", { type: "success" });
      return true;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error("An unexpected error occurred");
    }
  }, []);

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut, forgotPassword }),
    [user, signIn, signUp, signOut, forgotPassword]
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
