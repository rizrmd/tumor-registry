'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useWails } from '@/hooks/useWails';

interface SetupProgress {
  stage: string;
  progress: number;
  message: string;
  error?: string;
}

export default function SetupPage() {
  const { isWailsAvailable } = useWails();
  const [progress, setProgress] = useState<SetupProgress>({ stage: 'checking', progress: 0, message: 'Initializing...' });
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string>('');
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!isWailsAvailable) {
      // Redirect to login if not in desktop mode
      window.location.href = '/login';
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    // Start the setup process
    const startSetup = async () => {
      try {
        const wails = (window as any).go?.main?.App;
        if (!wails) {
          setError('Wails not available');
          return;
        }

        // Check if this is first run
        const isFirstRun = await wails.IsFirstRun();
        if (!isFirstRun) {
          // Already set up, redirect to login
          window.location.href = '/login';
          return;
        }

        // Perform setup with progress callbacks
        await wails.PerformSetup((update: SetupProgress) => {
          setProgress(update);

          if (update.stage === 'complete') {
            setIsComplete(true);
            // Redirect after 2 seconds
            setTimeout(() => {
              window.location.href = '/login';
            }, 2000);
          }

          if (update.error) {
            setError(update.error);
          }
        });
      } catch (err: any) {
        console.error('Setup error:', err);
        setError(err?.message || err?.string || 'Setup failed. Please try again.');
      }
    };

    startSetup();
  }, [isWailsAvailable]);

  if (!isWailsAvailable) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">This page is only for desktop app setup...</p>
          <a href="/login" className="text-blue-600 hover:underline">
            Go to login
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 bg-red-100 rounded-full">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Setup Error</h2>
            <p className="mt-2 text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 w-full inline-flex justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStepStatus = (stage: string): 'pending' | 'in-progress' | 'complete' => {
    if (isComplete) return 'complete';
    const stages = ['checking', 'downloading-bun', 'downloading-postgres', 'installing-deps', 'initializing-db', 'complete'];
    const currentIndex = stages.indexOf(progress.stage);
    const stepIndex = stages.indexOf(stage);
    if (stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'in-progress';
    return 'pending';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white">Setting Up INAMSOS</h1>
              <p className="mt-2 text-emerald-100">
                {progress.message || 'Initializing your local environment...'}
              </p>
            </div>
          </div>

          {/* Setup Steps */}
          <div className="p-8 space-y-6">
            <SetupStep
              title="Checking Requirements"
              status={getStepStatus('checking')}
              description="Verifying system requirements"
            />
            <SetupStep
              title="Downloading Bun Runtime"
              status={getStepStatus('downloading-bun')}
              description="Downloading fast JavaScript runtime (~40 MB)"
            />
            <SetupStep
              title="Downloading Database"
              status={getStepStatus('downloading-postgres')}
              description="Setting up embedded database"
            />
            <SetupStep
              title="Installing Dependencies"
              status={getStepStatus('installing-deps')}
              description="Installing backend dependencies (this may take 1-2 minutes)"
            />
            <SetupStep
              title="Initializing Database"
              status={getStepStatus('initializing-db')}
              description="Setting up database schema"
            />

            {/* Progress Indicator */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm text-gray-500">
                  {isComplete ? 'Complete!' : `${Math.round(progress.progress)}%`}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${Math.min(100, Math.max(0, progress.progress))}%`,
                  }}
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 001-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">One-Time Setup</h3>
                  <p className="mt-1 text-sm text-blue-700">
                    This will only happen once. We're downloading and setting up everything you need to run INAMSOS offline.
                    All data is stored locally on your computer.
                  </p>
                </div>
              </div>
            </div>

            {/* Completion Message */}
            {isComplete && (
              <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <svg className="mx-auto h-8 w-8 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-emerald-800 font-medium">Setup complete! Redirecting to login...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SetupStepProps {
  title: string;
  status: 'pending' | 'in-progress' | 'complete';
  description: string;
}

function SetupStep({ title, status, description }: SetupStepProps) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        {status === 'complete' ? (
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        ) : status === 'in-progress' ? (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-gray-400" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h3 className={`text-sm font-medium ${
          status === 'complete' ? 'text-emerald-700' :
          status === 'in-progress' ? 'text-blue-700' :
          'text-gray-500'
        }`}>
          {title}
        </h3>
        <p className={`text-sm ${
          status === 'complete' ? 'text-emerald-600' :
          status === 'in-progress' ? 'text-blue-600' :
          'text-gray-400'
        }`}>
          {description}
        </p>
      </div>
    </div>
  );
}
