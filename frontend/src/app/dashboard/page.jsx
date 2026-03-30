"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { openLogin } from "@/store/slices/authSlice";
import AddCategoryForm from "@/components/forms/AddCategoryForm";

export default function DashboardPage() {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoading(false);
  }, []);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      dispatch(openLogin());
    } else if (user.role !== "Admin") {
      router.push("/");
    }
  }, [user, loading, dispatch, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div>
      Admin Dashboard
      <AddCategoryForm />
    </div>
  );
}