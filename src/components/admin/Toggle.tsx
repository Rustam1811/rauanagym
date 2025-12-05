'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`
        relative inline-flex h-7 w-12 items-center rounded-full
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-hj-primary/30 focus:ring-offset-2 focus:ring-offset-white
        disabled:opacity-50 disabled:cursor-not-allowed
        ${checked ? 'bg-gradient-to-r from-hj-primary to-hj-primarySoft shadow-hj' : 'bg-gray-200'}
      `}
    >
      <span
        className={`
          inline-block h-5 w-5 transform rounded-full bg-white shadow-lg
          transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
}
