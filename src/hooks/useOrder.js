import api from "../utils/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import {
  clearStoredData,
  getStoredData,
  setStoredData,
} from "../utils/storageHelper";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const OrderContext = createContext();

export function OrderProvider({ children }) {
  const queryClient = useQueryClient();
  let navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [totalSells, setTotalSells] = useState(0);
  useQuery(
    "orders",
    () => {
      return api.get("/orders").then((res) => res.data.message);
    },
    {
      onSuccess: (data) => {
        setOrders(data);
      },
      onError: (data) => {
        console.log(data);
      },
      initialData: [],
      retry: 0,
    }
  );
  useQuery(
    "totalSells",
    () => {
      return api.get("/orders/sells").then((res) => res.data.message);
    },
    {
      onSuccess: (data) => {
        setTotalSells(data);
      },
      onError: (data) => {
        console.log(data);
      },
      initialData: [],
      retry: 0,
    }
  );
  const placeOrder = useMutation(
    (formData) => api.post("/orders/new", formData).then((res) => res.data),
    {
      onSuccess: (data) => {
        clearStoredData("cartItems");
        setStoredData("orderID", data.message);
        navigate("/checkout/summary", { state: data.message });
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const updateOrder = useMutation(
    (variable) =>
      api
        .put(`/orders/${variable.id}`, variable.formData)
        .then((res) => res.data),
    {
      // enable:variable.id !== null,
      onSuccess: (data) => {
        queryClient.invalidateQueries(`orders`);
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  const cancelOrder = useMutation(
    (id) => api.delete(`/orders/${id}`).then((res) => res.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
        toast.success("order canceled Successfully");
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  return (
    <OrderContext.Provider
      value={{ placeOrder, totalSells, updateOrder, cancelOrder, orders }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export default function useOrder() {
  const order = useContext(OrderContext);
  return order;
}
