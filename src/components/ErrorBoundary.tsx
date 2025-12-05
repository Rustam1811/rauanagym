/**
 * Global Error Boundary Component
 * Catches React component errors and shows fallback UI
 */

'use client';

import React, { Component, ReactNode } from 'react';
import { logError } from '@/lib/errors';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logError(error, {
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Упс! Что-то пошло не так
            </h1>
            
            <p className="text-gray-600 mb-6">
              Произошла непредвиденная ошибка. Мы уже работаем над её исправлением.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 rounded-2xl border border-red-200 text-left">
                <p className="text-xs font-mono text-red-800 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <button
              onClick={this.handleReset}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              Перезагрузить страницу
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Или вернитесь на{' '}
              <Link href="/" className="text-purple-600 font-semibold hover:underline">
                главную страницу
              </Link>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Async Error Boundary for Suspense fallbacks
 */
export function AsyncErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-500 animate-pulse" />
            </div>
            <p className="text-gray-600">Загрузка...</p>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
