import { useLocalSearchParams } from "expo-router";
import Login from "../src/components/auth/login";
import SignUp from "../src/components/auth/signup";
import ForgotPassword from "../src/components/auth/forgot-password";

export default function Auth() {
  const { type } = useLocalSearchParams<{ type: string }>();

  switch (type) {
    case "signin":
      return <Login />;
    case "signup":
      return <SignUp />;
    case "forgot-password":
      return <ForgotPassword />;
    default:
      return <Login />;
  }
}
