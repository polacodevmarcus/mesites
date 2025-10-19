import React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  error?: string;
}

export const Input: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  register,
  error,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-left text-sm font-normal mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full text-sm font-normal bg-[var(--color-input-light)] border-none rounded-lg px-4 py-3 focus:ring-2 focus:outline-none transition-shadow ${error
          ? 'focus:ring-red-500 ring-2 ring-red-500'
          : 'focus:ring-[var(--color-primary)]'
          }`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};