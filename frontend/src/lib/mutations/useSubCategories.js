import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

//  CREATE SUBCATEGORY
export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("sku", data.sku || "");
      formData.append("description", data.description || "");
      formData.append("categoryId", data.categoryId);

      // ✅ IMAGE ADD
      if (data.image) {
        formData.append("image", data.image);
      }

      return api.post("/subcategory/create", formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });
};

//  DELETE SUBCATEGORY
export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      api.delete(`/subcategory/${id}`),

    onSuccess: () => {
      queryClient.invalidateQueries(["subcategories"]);
    },
  });
};