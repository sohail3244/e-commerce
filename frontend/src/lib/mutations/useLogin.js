"use client";

import { useMutation } from "@tanstack/react-query";
import api from "../api";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) => api.post("/auth/login", data),
  });
};