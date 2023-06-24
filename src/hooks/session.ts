import { useEffect, useState } from "react";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log("localStorage", localStorage);
    setIsLoggedIn(!!localStorage.getItem("auth_token"));
  }, []);
  return { isLoggedIn, setIsLoggedIn };
};
