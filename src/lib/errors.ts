/**
 * Centralized Error Handling System
 * Production-ready error management with user-friendly messages
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public userMessage: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class AuthError extends AppError {
  constructor(message: string, userMessage: string = 'Ошибка авторизации') {
    super(message, 'AUTH_ERROR', userMessage, 401);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, userMessage: string = 'Неверные данные') {
    super(message, 'VALIDATION_ERROR', userMessage, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string, userMessage: string = 'Данные не найдены') {
    super(message, 'NOT_FOUND', userMessage, 404);
  }
}

export class PermissionError extends AppError {
  constructor(message: string, userMessage: string = 'Недостаточно прав') {
    super(message, 'PERMISSION_DENIED', userMessage, 403);
  }
}

export class NetworkError extends AppError {
  constructor(message: string, userMessage: string = 'Проблема с подключением') {
    super(message, 'NETWORK_ERROR', userMessage, 503);
  }
}

/**
 * Parse Firebase errors into user-friendly messages
 */
export function parseFirebaseError(error: unknown): AppError {
  const err = error as Error & { code?: string };
  const code = err.code || '';
  
  // Auth errors
  if (code.startsWith('auth/')) {
    switch (code) {
      case 'auth/user-not-found':
        return new AuthError(err.message, 'Пользователь не найден');
      case 'auth/wrong-password':
        return new AuthError(err.message, 'Неверный пароль');
      case 'auth/email-already-in-use':
        return new AuthError(err.message, 'Email уже используется');
      case 'auth/weak-password':
        return new ValidationError(err.message, 'Слишком слабый пароль');
      case 'auth/invalid-email':
        return new ValidationError(err.message, 'Неверный формат email');
      case 'auth/too-many-requests':
        return new AuthError(err.message, 'Слишком много попыток. Попробуйте позже');
      case 'auth/network-request-failed':
        return new NetworkError(err.message, 'Нет подключения к интернету');
      default:
        return new AuthError(err.message, 'Ошибка авторизации');
    }
  }
  
  // Firestore errors
  if (code.startsWith('permission-denied') || code === 'PERMISSION_DENIED') {
    return new PermissionError(err.message, 'Недостаточно прав для выполнения операции');
  }
  
  if (code === 'not-found' || code === 'NOT_FOUND') {
    return new NotFoundError(err.message);
  }
  
  if (code === 'unavailable' || code === 'UNAVAILABLE') {
    return new NetworkError(err.message, 'Сервис временно недоступен');
  }
  
  // Default error
  return new AppError(
    err.message || 'Unknown error',
    'UNKNOWN_ERROR',
    'Что-то пошло не так. Попробуйте ещё раз',
    500
  );
}

/**
 * Log error to console (and monitoring service in production)
 */
export function logError(error: Error | AppError, context?: Record<string, unknown>) {
  // In production, send to Sentry/LogRocket
  console.error('🔴 Error:', {
    name: error.name,
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
  
  // TODO: Add Sentry integration
  // if (process.env.NODE_ENV === 'production') {
  //   Sentry.captureException(error, { extra: context });
  // }
}

/**
 * Handle async errors with automatic logging
 */
export async function handleAsync<T>(
  promise: Promise<T>,
  errorMessage?: string
): Promise<[T | null, AppError | null]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error: unknown) {
    const appError = parseFirebaseError(error);
    logError(appError, { originalError: error, customMessage: errorMessage });
    return [null, appError];
  }
}

/**
 * Retry failed operations with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: unknown;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on auth/validation errors
      const code = (error as Error & { code?: string }).code || '';
      if (code.startsWith('auth/') || code === 'PERMISSION_DENIED') {
        throw error;
      }
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
}
