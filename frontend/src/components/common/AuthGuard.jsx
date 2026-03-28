"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { openLogin } from "@/store/slices/authSlice";

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // ✅ prevent multiple dispatch
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasOpened.current) {
      dispatch(openLogin());
      hasOpened.current = true;
    }
  }, [isAuthenticated, dispatch]);

  // ❌ login nahi hai → page hide
  if (!isAuthenticated) return null;

  return children;
}