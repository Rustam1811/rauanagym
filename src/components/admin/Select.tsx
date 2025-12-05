'use client';

interface SelectProps {
  label?: string;
  options?: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function Select({ 
  label, 
  options,
  value, 
  onChange,
  required = false,
  disabled = false,
  children
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-hj-textMain">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="
          w-full px-4 py-3 
          bg-white border border-gray-200 rounded-2xl
          text-hj-textMain
          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
        "
      >
        {children || options?.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-slate-900">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
