import React from "react";
import { type UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  register?: UseFormRegisterReturn;
  error?: string;
  icon?: string;
  iconPosition?: 'left' | 'right';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  register,
  error,
  icon,
  iconPosition = 'left',
  value,
  onChange,
}) => {
  return (
    <div>
      {
        label &&
        <label htmlFor={id} className="block text-left text-sm font-normal my-3">
          {label}
        </label>
      }
      <div className="relative">
        {icon && iconPosition === 'left' && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400 text-xl">
              {icon}
            </span>
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...register}
          className={`w-full text-sm font-normal bg-[var(--color-input-light)] border-none rounded-lg py-4 focus:ring-2 focus:outline-none transition-shadow ${
            icon && iconPosition === 'left' ? 'pl-10 pr-4' : 
            icon && iconPosition === 'right' ? 'pl-4 pr-10' : 'px-4'
          } ${error
            ? 'focus:ring-red-500 ring-2 ring-red-500'
            : 'focus:ring-[var(--color-primary)]'
          }`}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400 text-xl">
              {icon}
            </span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};