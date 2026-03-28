"use client";

import { useMutation } from "@tanstack/react-query";
import api from "../api";

export const useSignup = () => {
  return useMutation({
    mutationFn: (data) => api.post("/auth/signup", data),
  });
};