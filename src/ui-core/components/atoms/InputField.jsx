import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function InputField(props) {
  const { title, type, placeholder, name, value, onChange, disabled=false } = props;

  return (
    <div className="flex flex-col gap-3">
      <Label>{title}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
        disabled={disabled}
      />
    </div>
  );
}

export default InputField;
