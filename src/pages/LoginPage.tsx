import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect } from "react";

export function LoginPage() {
  const { signIn } = useAuthContext();
  useEffect(() => {
      signIn();
  }, []); // The empty array causes this effect to only run once

  return null; // Return null to render nothing
}