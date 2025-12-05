'use client';

interface InputProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'email' | 'password' | 'number' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function Input({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  placeholder,
  required = false,
  disabled = false
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-hj-textMain">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className="
          w-full px-4 py-3 
          bg-white border border-gray-200 rounded-2xl
          text-hj-textMain placeholder:text-hj-textSoft
          focus:outline-none focus:ring-2 focus:ring-hj-primary/30 focus:border-hj-primary
          disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100
          transition-all duration-200 shadow-sm
        "
      />
    </div>
  );
}
