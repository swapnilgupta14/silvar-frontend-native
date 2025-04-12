import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";

export const useAuthWithToast = () => {
  const auth = useAuth();
  const { showToast } = useToast();

  const signIn = async (email: string, password: string) => {
    try {
      await auth.signIn(email, password);
      showToast("Welcome!", {
        description: "You have successfully logged in",
        type: "success",
        image: {
          type: "icon",
          source: "checkmark-circle-outline"
        }
      });
    } catch (error) {
      showToast("Error", {
        description: "Invalid email or password",
        type: "error",
        image: {
          type: "icon",
          source: "alert-circle-outline"
        }
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      await auth.signUp(email, password, username);
      showToast("Success!", {
        description: "Account created successfully",
        type: "success",
        image: {
          type: "icon",
          source: "checkmark-circle-outline"
        }
      });
    } catch (error) {
      showToast("Error", {
        description: "Please fill in all fields correctly",
        type: "error",
        image: {
          type: "icon",
          source: "alert-circle-outline"
        }
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      showToast("Logged out", {
        description: "You have been successfully logged out",
        type: "info",
        image: {
          type: "icon",
          source: "log-out-outline"
        }
      });
    } catch (error) {
      showToast("Error", {
        description: "Failed to sign out. Please try again.",
        type: "error",
        image: {
          type: "icon",
          source: "alert-circle-outline"
        }
      });
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await auth.forgotPassword(email);
      showToast("Email Sent", {
        description: `Password reset link sent to ${email}`,
        type: "success",
        image: {
          type: "icon",
          source: "mail-outline"
        }
      });
    } catch (error) {
      showToast("Error", {
        description: "Failed to send reset link. Please try again.",
        type: "error",
        image: {
          type: "icon",
          source: "alert-circle-outline"
        }
      });
      throw error;
    }
  };

  return {
    ...auth,
    signIn,
    signUp,
    signOut,
    forgotPassword,
  };
}; 