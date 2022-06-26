import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import api from "../utils/api";
import {
  clearStoredData,
  getStoredData,
  setStoredData,
} from "../utils/storageHelper";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const data = getStoredData("user-token");
    if (data) {
      setIsLoggedIn((prev) => !prev);
    }
  }, []);

  let navigate = useNavigate();
  const registerUser = useMutation(
    (formData) => api.post("/register", formData).then((res) => res.data),
    {
      onSuccess: (data) => {
        setStoredData("user-token", data.token);
        setIsLoggedIn((prev) => !prev);
        navigate("/profile", { replace: true });
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const loginUser = useMutation(
    (formData) => api.post("/login", formData).then((res) => res.data),
    {
      onSuccess: (data) => {
        setStoredData("user-token", data.token);
        setIsLoggedIn(true);

        navigate(
          location?.state?.pathname ? location?.state?.pathname : "/menu",
          { replace: true }
        );
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  function logOut() {
    clearStoredData("user-token");
    clearStoredData("profile");
    toast.success("you logged out successfully");
    setIsLoggedIn((prev) => !prev);
    navigate("/menu", { replace: true });
  }

  return (
    <AuthContext.Provider
      value={{
        logOut,
        isLoggedIn,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
