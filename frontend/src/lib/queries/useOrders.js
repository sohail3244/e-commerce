import { useQuery } from "@tanstack/react-query";
import api from "../api";

//  Get All Orders
export const useGetOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await api.get("/order/get-orders");
      return res.data.data;
    },
  });
};

//  Get Single Order
export const useOrder = (id) => {
  return useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await api.get(`/order/get-order/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

