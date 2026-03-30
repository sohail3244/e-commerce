"use client";

import { useForm } from "react-hook-form";
import { Tag, FileText, Upload } from "lucide-react"; // Upload icon added
import Button from "../ui/Button";
import TextAreaField from "../ui/TextAreaField";
import InputField from "../ui/InputField";

export default function AddCategoryForm({
  title = "", 
  submitText = "Save Category",
  defaultValues = {},
  onCancel, // Added for flexibility
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("categoryName", data.categoryName);
    formData.append("sku", data.sku);
    formData.append("description", data.description);
    if (data.image?.[0]) formData.append("image", data.image[0]);
    console.log("FormData Ready:", formData);
  };

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-xl font-bold text-slate-800 mb-6">{title}</h2>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Category Name"
            placeholder="Electronics"
            icon={Tag}
            isRequired
            error={errors.categoryName?.message}
            {...register("categoryName", { required: "Name is required" })}
          />

          <InputField
            label="SKU (Optional)"
            placeholder="ELEC-001"
            icon={Tag}
            {...register("sku")}
          />
        </div>

        <TextAreaField
          label="Description"
          placeholder="Brief details about this category..."
          icon={FileText}
          isRequired
          error={errors.description?.message}
          {...register("description", { required: "Description is required" })}
        />

        {/* Improved Image Upload UI */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Upload size={16} /> Category Image
          </label>
          <div className="relative border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors rounded-xl p-4 bg-slate-50/50">
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center pointer-events-none">
              <p className="text-sm text-slate-600 font-medium">Click to upload or drag and drop</p>
              <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-100 mt-6">
          <Button
            type="button"
            text="Cancel"
            variant="secondary"
            onClick={onCancel || (() => reset())}
            className="px-6 border-none text-slate-500 hover:bg-slate-100"
          />
          <Button
            type="submit"
            text={submitText}
            className="px-8 bg-[#2A4150] hover:bg-[#1e2f3a] text-white shadow-lg shadow-blue-900/10"
          />
        </div>
      </form>
    </div>
  );
}