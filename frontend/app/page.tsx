'use client';

import { WalletKitProvider, ConnectButton } from '@mysten/wallet-kit';
import { useState } from 'react';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <WalletKitProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
              Triturus DApp
            </h1>
            <ConnectButton />
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Donation Section */}
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Make a Donation
              </h2>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Amount in SUI"
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                  Donate
                </button>
              </div>
            </section>

            {/* Subscription Section */}
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Subscribe
              </h2>
              <div className="space-y-4">
                <select className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white">
                  <option value="1">Tier 1 - Basic</option>
                  <option value="2">Tier 2 - Premium</option>
                  <option value="3">Tier 3 - VIP</option>
                </select>
                <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
                  Subscribe
                </button>
              </div>
            </section>

            {/* Profile Section */}
            <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Your Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Total Donations</h3>
                  <p className="text-gray-600 dark:text-gray-300">0 SUI</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Subscription Tier</h3>
                  <p className="text-gray-600 dark:text-gray-300">None</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                  <h3 className="font-bold mb-2 text-gray-800 dark:text-white">Soulbound NFTs</h3>
                  <p className="text-gray-600 dark:text-gray-300">0</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </WalletKitProvider>
  );
}
