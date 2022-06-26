import api from "../utils/api";
import { useMutation, useQueryClient } from "react-query";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { getStoredData, setStoredData } from "../utils/storageHelper";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AdminContext = createContext();

export function AdminProvider({ children }) {
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const location = useLocation();
  const [editedItem, setEditedItem] = useState({
    item: {},
    isEditing: false,
  });

  const updateMeal = useMutation(
    ({ id, data }) =>
      api.put(`/manager/meals/${id}`, data).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("fetchMeals");
        toast.success("meal updated successfully");
      },
      onError: (data) => {
        toast.error(data);
      },
    }
  );

  const deleteMeal = useMutation(
    (id) => api.delete(`/manager/meals/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchMeals");
        toast.success("Meal deleted Successfully");
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const createCategory = useMutation(
    (formData) =>
      api.post("/manager/category/new", formData).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getCategory");
        toast.success("Category Created Successfully");
      },
      onError: (err) => {
        toast.error(`Error occurred${err}`);
      },
    }
  );
  const adminLogin = useMutation(
    (formData) => api.post("/manager/login", formData).then((res) => res.data),
    {
      onSuccess: (data) => {
        setStoredData("user-token", data.token);
        setStoredData("userType", "manager");

        navigate(
          location?.state?.pathname
            ? location?.state?.pathname
            : "/admin/dashboard/home",
          {
            replace: true,
          }
        );
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const updateCategory = useMutation(
    ({ id, data }) =>
      api.put(`/manager/category/${id}`, data).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries("getCategory");
        toast.success("Category updated Successfully");
      },
      onError: (data) => {
        toast.error(data);
      },
    }
  );
  const deleteCategory = useMutation(
    (id) => api.delete(`/manager/category/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getCategory");
        toast.success("Category deleted Successfully");
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const edit = (item, path) => {
    setEditedItem({
      item,
      isEditing: true,
    });
    path && navigate(path, { replace: false });
  };
  return (
    <AdminContext.Provider
      value={{
        adminLogin,
        createCategory,
        deleteCategory,
        updateCategory,
        editedItem,
        edit,
        deleteMeal,
        updateMeal,
        setEditedItem,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default function useAdmin() {
  const admin = useContext(AdminContext);
  return admin;
}
