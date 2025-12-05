/**
 * Custom hook for async data fetching with loading/error states
 * Eliminates useState/useEffect boilerplate
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { handleAsync, logError, AppError } from '@/lib/errors';

interface UseAsyncState<T> {
  data: T | null;
  loading: boolean;
  error: AppError | null;
  refetch: () => Promise<void>;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: unknown[] = []
): UseAsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    const [result, err] = await handleAsync(asyncFunction());

    if (err) {
      setError(err);
      setData(null);
    } else {
      setData(result);
      setError(null);
    }

    setLoading(false);
  }, [asyncFunction]);

  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error, refetch: execute };
}

/**
 * Hook for mutations (create/update/delete operations)
 */
interface UseMutationState<T> {
  mutate: (input: T) => Promise<void>;
  loading: boolean;
  error: AppError | null;
  success: boolean;
  reset: () => void;
}

export function useMutation<T, R>(
  mutationFn: (input: T) => Promise<R>,
  onSuccess?: (result: R) => void,
  onError?: (error: AppError) => void
): UseMutationState<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [success, setSuccess] = useState(false);

  const mutate = async (input: T) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const [result, err] = await handleAsync(mutationFn(input));

    if (err) {
      setError(err);
      logError(err, { input });
      onError?.(err);
    } else {
      setSuccess(true);
      onSuccess?.(result as R);
    }

    setLoading(false);
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  };

  return { mutate, loading, error, success, reset };
}

/**
 * Hook for paginated data fetching
 */
interface UsePaginationState<T> {
  items: T[];
  loading: boolean;
  error: AppError | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function usePagination<T>(
  fetchFn: (lastItem: T | null) => Promise<T[]>,
  pageSize: number = 20
): UsePaginationState<T> {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    const lastItem = items.length > 0 ? items[items.length - 1] : null;
    const [newItems, err] = await handleAsync(fetchFn(lastItem));

    if (err) {
      setError(err);
    } else if (newItems) {
      setItems([...items, ...newItems]);
      setHasMore(newItems.length === pageSize);
    }

    setLoading(false);
  };

  const refresh = async () => {
    setItems([]);
    setHasMore(true);
    setLoading(true);
    setError(null);

    const [newItems, err] = await handleAsync(fetchFn(null));

    if (err) {
      setError(err);
    } else if (newItems) {
      setItems(newItems);
      setHasMore(newItems.length === pageSize);
    }

    setLoading(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { items, loading, error, hasMore, loadMore, refresh };
}

/**
 * Hook for debounced values (search, filters)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for local storage state
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      logError(error as Error, { key });
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      logError(error as Error, { key, value });
    }
  };

  return [storedValue, setValue];
}
