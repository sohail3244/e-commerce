import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import toast from "react-hot-toast";

// ==============================
// ✅ CREATE PRODUCT
// ==============================
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("categoryid", data.categoryid);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("status", data.status);

      if (data.images) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      return api.post("/product/create-product", formData,);
    },

    onSuccess: () => {
  toast.success("Product created successfully ");
  queryClient.invalidateQueries(["products"]);
},

onError: (err) => {
  toast.error(err.response?.data?.message || "Create failed ");
},
  });
};

// ==============================
// ✅ UPDATE PRODUCT
// ==============================
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => {
      const formData = new FormData();

      if (data.name) formData.append("name", data.name);
      if (data.description) formData.append("description", data.description);
      if (data.categoryid) formData.append("categoryid", data.categoryid);
      if (data.price) formData.append("price", data.price);
      if (data.stock) formData.append("stock", data.stock);
      if (data.status) formData.append("status", data.status);

      // 🔥 FIXED: FileList support
      if (data.images) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      return api.put(`/product/update-product/${id}`, formData, {
       
      });
    },

    onSuccess: () => {
  toast.success("Product updated successfully ");
  queryClient.invalidateQueries(["products"]);
},

onError: (err) => {
  toast.error(err.response?.data?.message || "Update failed ");
},
  });
};

// ==============================
// ✅ DELETE PRODUCT
// ==============================
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      api.delete(`/product/delete-product/${id}`),

    onSuccess: () => {
  toast.success("Product deleted ");
  queryClient.invalidateQueries(["products"]);
},

onError: (err) => {
  toast.error(err.response?.data?.message || "Delete failed ");
},
  });
};