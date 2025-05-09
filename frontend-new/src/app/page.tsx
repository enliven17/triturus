'use client';

import { useRouter } from 'next/navigation';

export default function LaunchPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="text-center px-4">
        <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-8 animate-fade-in">
          Triturus
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 animate-fade-in-delay max-w-md mx-auto">
          A modern DApp for donations and subscriptions
        </p>

        <button
          onClick={() => router.push('/app')}
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-2xl px-16 py-6 rounded-xl transform hover:scale-105 transition-all duration-200 animate-bounce-subtle"
        >
          Enter
        </button>
      </div>
    </div>
  );
}
