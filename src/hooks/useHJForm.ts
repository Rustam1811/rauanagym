// hooks/useHJForm.ts
'use client';

import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: unknown) => string | undefined;
}

interface FieldConfig {
  initialValue: unknown;
  validation?: ValidationRule;
}

interface FormConfig {
  [key: string]: FieldConfig;
}

/**
 * Продвинутый хук для управления формами с валидацией
 */
export function useHJForm<T extends Record<string, unknown>>(config: FormConfig) {
  const [values, setValues] = useState<T>(() => {
    const initial = {} as T;
    Object.keys(config).forEach((key) => {
      initial[key as keyof T] = config[key].initialValue as T[keyof T];
    });
    return initial;
  });

  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const validateField = useCallback(
    (name: keyof T, value: unknown): string | undefined => {
      const rules = config[name as string]?.validation;
      if (!rules) return undefined;

      if (rules.required && !value) {
        return 'Это поле обязательно';
      }

      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        return `Минимум ${rules.minLength} символов`;
      }

      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        return `Максимум ${rules.maxLength} символов`;
      }

      if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        return 'Неверный формат';
      }

      if (rules.custom) {
        return rules.custom(value);
      }

      return undefined;
    },
    [config]
  );

  const handleChange = useCallback(
    (name: keyof T, value: unknown) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      
      // Валидация при изменении (только если поле уже было touched)
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, values[name]);
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [values, validateField]
  );

  const validate = useCallback(() => {
    const newErrors: Partial<Record<keyof T, string>> = {};
    let isValid = true;

    Object.keys(config).forEach((key) => {
      const error = validateField(key as keyof T, values[key as keyof T]);
      if (error) {
        newErrors[key as keyof T] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [config, values, validateField]);

  const reset = useCallback(() => {
    const initial = {} as T;
    Object.keys(config).forEach((key) => {
      initial[key as keyof T] = config[key].initialValue as T[keyof T];
    });
    setValues(initial);
    setErrors({});
    setTouched({});
  }, [config]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0,
  };
}
