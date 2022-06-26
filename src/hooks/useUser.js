import { useQuery, useQueryClient } from "react-query";
import api from "../utils/api";
import {
  clearStoredUser,
  getStoredUser,
  setStoredUser,
} from "../utils/storageHelper";

export default function useUser() {
  const queryClient = useQueryClient();
  const { data: user } = useQuery(
    "user",
    () => api.get("/account/profile/me").then((res) => res.data.message),
    {
      initialData: getStoredUser,
      retry: 1,
      refetchOnWindowFocus: false,
      onSuccess: (received) => {
        if (!received) {
          clearStoredUser();
        } else {
          setStoredUser(received);
        }
      },
    }
  );

  // meant to be called from useAuth
  function updateUser() {
    // update the user
    queryClient.setQueryData("user");
  }

  // meant to be called from useAuth
  function clearUser() {
    // reset user to null
    queryClient.setQueryData("user", null);
  }

  return { user, updateUser, clearUser };
}
