import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getStoredData, setStoredData } from "../utils/storageHelper";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const queryClient = useQueryClient();
  const userType = getStoredData("userType");
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState({
    item: {},
    isEditing: false,
  });
  const { isLoggedIn } = useAuth();

  let navigate = useNavigate();
  function editProfile(item) {
    setEditedProfile({
      item,
      isEditing: true,
    });
    navigate("../profile", { replace: true });
  }
  useEffect(() => {
    setStoredData("profile", profile);
  }, [profile]);
  useEffect(() => {
    // setStoredData("profile", profile);
    const data = getStoredData("profile");
    if (data) {
      setProfile(() => data);
    }
  }, [isLoggedIn]);
  const { data: customers } = useQuery("customers", () => {
    return api.get(`/account/profile/all`).then((res) => res.data.message);
  });

  useQuery(
    "profile",
    () => {
      return api.get("/account/profile/me").then((res) => res.data.message);
    },
    {
      // enabled: userType === "manager" ? false : true,
      onSuccess: (data) => {
        setProfile(() => data);
        setStoredData("profile", data);
      },
      onError: (err) => {
        if (isLoggedIn) {
          toast.error(err);
          // navigate("/profile", { replace: true });
        }
      },
      retry: 0,
      refetchOnWindowFocus: false,
    }
  );

  const createProfile = useMutation(
    (formData) =>
      api.post("/account/profile", formData).then((res) => res.data),

    {
      onSuccess: (data) => {
        setStoredData("profile", data.message);
        queryClient.invalidateQueries("profile");
        toast.success("profile saved");
      },
      onError: (data) => {
        toast.error(data);
      },
    }
  );

  const updateProfile = useMutation(
    (formData) => api.put("/account/profile", formData).then((res) => res.data),
    {
      onSuccess: (data) => {
        setStoredData("profile", data.message);
        queryClient.invalidateQueries("profile");
        toast.success("profile saved");
      },
      onError: (data) => {
        toast.error(data);
      },
    }
  );
  return (
    <ProfileContext.Provider
      value={{
        profile,
        editedProfile,
        editProfile,
        setEditedProfile,
        setProfile,
        customers,
        createProfile,
        updateProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export default function useProfile() {
  const profile = useContext(ProfileContext);
  return profile;
}
