import { useQuery } from "@tanstack/react-query";
import api from "../api";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me");
      return res.data.data.user;
    },
    retry: false,
  });
};