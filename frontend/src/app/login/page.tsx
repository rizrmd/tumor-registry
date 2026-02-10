'use client';

import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  const handleLoginSuccess = () => {
    // Redirect will be handled by the LoginForm component
    console.log('Login successful');
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
    // You could add a toast notification here
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full max-w-md px-4">
        <LoginForm
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>&copy; 2024 INAMSOS. Indonesia National Cancer Database System.</p>
        <div className="mt-1 space-x-4">
          <Link href="/privacy" className="hover:text-gray-700">
            Kebijakan Privasi
          </Link>
          <Link href="/terms" className="hover:text-gray-700">
            Syarat & Ketentuan
          </Link>
          <Link href="/help" className="hover:text-gray-700">
            Bantuan
          </Link>
        </div>
      </div>
    </div>
  );
}