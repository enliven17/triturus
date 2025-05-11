'use client';

import { useRouter } from 'next/navigation';

export default function LaunchPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-8xl font-bold gradient-text mb-8 animate-fade-in">
          Triturus
        </h1>
        
        <p className="text-2xl text-gray-300 mb-12 animate-fade-in-delay max-w-2xl mx-auto leading-relaxed">
          A modern DApp for donations and subscriptions
        </p>

        <div className="glass p-8 max-w-xl mx-auto mb-12 animate-slide-up">
          <p className="text-gray-300 mb-6">
            Experience seamless crypto transactions with our intuitive platform
          </p>
          <button
            onClick={() => router.push('/app')}
            className="btn-primary text-xl px-16 py-6 animate-float"
          >
            Enter App
          </button>
        </div>
      </div>
    </div>
  );
}
