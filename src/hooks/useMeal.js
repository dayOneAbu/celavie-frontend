import { useMutation, useQuery, useQueryClient } from "react-query";
import { createContext, useContext } from "react";
import api from "../utils/api";
import { useState } from "react";
import toast from "react-hot-toast";

const MealContext = createContext();
export function MealProvider({ children }) {
  const [meals, setMeals] = useState([]);
  const queryClient = useQueryClient();
  const [editedComment, setEditedComment] = useState({
    item: {},
    isEditing: false,
  });
  function editComment(item) {
    setEditedComment({
      item,
      isEditing: true,
    });
  }
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState();

  useQuery(
    "getCategory",
    () => {
      return api.get("/category").then((res) => res.data.message);
    },
    {
      onSuccess: (data) => {
        setCategory(data);
      },
      onError: (data) => {
        console.log(data);
      },
      initialData: [],
      retry: 0,
    }
  );

  useQuery(
    "fetchMeals",
    () => {
      return api.get("/meals").then((res) => res.data.message);
    },
    {
      onSuccess: (data) => {
        setMeals(data);
        setIsLoading((prev) => !prev);
      },
      onError: (data) => {
        console.log(data);
      },
      initialData: [],
      retry: 0,
    }
  );
  const deleteComment = useMutation(
    (variable) =>
      api
        .delete(`/comments/${variable.id}/comments/${variable.comId}`)
        .then((res) => res.data),
    {
      onSuccess: (data, variable) => {
        queryClient.invalidateQueries(`Detail for ${variable.slug}`);
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const addComment = useMutation(
    (variable) =>
      api
        .post(`/comments/${variable.props.id}/comments/new`, variable.formData)
        .then((res) => res.data),
    {
      onSuccess: (data, variable) => {
        queryClient.invalidateQueries(`Detail for ${variable.props.slug}`);
        queryClient.invalidateQueries(`fetchMeals`);
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const addMeal = useMutation(
    (formData) =>
      api.post(`/manager/meals/new`, formData).then((res) => res.data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(`fetchMeals`);
        console.log(data);
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  const updateComment = useMutation(
    (variable) =>
      api
        .put(`/comments/${variable.comId}`, variable.formData)
        .then((res) => res.data),
    {
      onSuccess: (data, variable) => {
        queryClient.invalidateQueries(`Detail for ${variable.props.slug}`);
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );

  return (
    <MealContext.Provider
      value={{
        meals,
        editComment,
        addMeal,
        setEditedComment,
        category,
        editedComment,
        addComment,
        isLoading,
        updateComment,
        deleteComment,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}
export default function useMeal() {
  const meals = useContext(MealContext);
  return meals;
}
