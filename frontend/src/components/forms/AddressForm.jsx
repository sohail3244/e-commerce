"use client";

import React from "react";
import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextAreaField";
import { MapPin, Building2, Landmark } from "lucide-react";

export default function AddressForm({
  register,
  errors = {}, 
  value = {},
  onChange,
  className = "",
  fields = {
    pincode: true,
    city: true,
    state: true,
    address: true,
  },
}) {

  const handleChange = (e) => {
    if (!onChange) return;
    onChange({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const getProps = (name, validation = {}) => {
    if (register) return register(name, validation);

    return {
      name,
      value: value?.[name] || "",
      onChange: handleChange,
    };
  };

  return (
    <div className={`grid grid-cols-2 gap-x-5 gap-y-4 ${className}`}>
      
      {fields.pincode && (
        <InputField
        pattern="[0-9]{6}"
          type="text"
          label="PIN Code"
          placeholder="6-digit PIN"
          maxLength={6}
          icon={MapPin}
          {...getProps("pincode", { 
            required: "PIN Code is required",
            pattern: { value: /^[0-9]{6}$/, message: "Invalid PIN Code" }
          })}
          error={errors.pincode?.message}
        />
      )}

      {fields.city && (
        <InputField
          label="City"
          placeholder="Your City"
          icon={Building2}
          {...getProps("city", { required: "City is required" })}
          error={errors.city?.message}
        />
      )}

      {fields.state && (
        <InputField
          label="State"
          placeholder="State"
          icon={Landmark}
          {...getProps("state", { required: "State is required" })}
          error={errors.state?.message}
        />
      )}

      {fields.address && (
        <div className="col-span-2">
          <TextAreaField
            label="Complete Address"
            placeholder="House No, Street, Landmark, Area..."
            rows={3}
            {...getProps("address", { 
              required: "Address is required",
              minLength: { value: 10, message: "Please enter detailed address" }
            })}
            error={errors.address?.message}
            className="resize-none"
          />
        </div>
      )}
    </div>
  );
}