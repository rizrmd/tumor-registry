'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import authService from '@/services/auth.service';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Email wajib diisi');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.forgotPassword(email);
      setSuccess(response.message || 'Jika email terdaftar, instruksi reset password telah dikirim.');
    } catch (err: any) {
      const message = err?.response?.data?.message || err?.message || 'Gagal mengirim permintaan reset password.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">Lupa Password</h1>
        <p className="mt-2 text-sm text-gray-600">Masukkan email Anda untuk menerima instruksi reset password.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="nama@contoh.com"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-emerald-600">{success}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Link Reset'}
          </button>
        </form>

        <div className="mt-4 text-sm">
          <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
            Kembali ke login
          </Link>
        </div>
      </div>
    </div>
  );
}
