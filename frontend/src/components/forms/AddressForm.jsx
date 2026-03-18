"use client";

import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextAreaField";

export default function AddressForm({
  register,
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

  const getProps = (name) => {
    if (register) return register(name);

    return {
      name,
      value: value?.[name] || "",
      onChange: handleChange,
    };
  };

  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>

      {fields.pincode && (
        <InputField
          label="PIN Code"
          placeholder="Enter PIN Code"
          {...getProps("pincode")}
        />
      )}

      {fields.city && (
        <InputField
          label="City"
          placeholder="Enter City"
          {...getProps("city")}
        />
      )}

      {fields.state && (
        <InputField
          label="State"
          placeholder="Enter State"
          {...getProps("state")}
        />
      )}

      {fields.address && (
        <div className="col-span-2">
          <TextAreaField
            label="Address"
            placeholder="House No, Building, Street, Area"
            rows={3}
            {...getProps("address")}
          />
        </div>
      )}

    </div>
  );
}