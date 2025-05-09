'use client';

import { WalletKitProvider, ConnectButton } from '@mysten/wallet-kit';
import { useRouter } from 'next/navigation';

export default function AppPage() {
  const router = useRouter();

  return (
    <WalletKitProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <header className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => router.push('/')}
                className="text-white/80 hover:text-white transition-colors text-lg"
              >
                ←
              </button>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Triturus
              </h1>
            </div>
            <ConnectButton />
          </header>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Donation Section */}
            <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-colors">
              <h2 className="text-2xl font-bold mb-8 text-white">
                Donate
              </h2>
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Wallet Address or SNS Name"
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
                  />
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Amount in SUI"
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">SUI</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-xl hover:opacity-90 transition-opacity">
                  Send
                </button>
              </div>
            </section>

            {/* Subscription Section */}
            <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-colors">
              <h2 className="text-2xl font-bold mb-8 text-white">
                Subscribe
              </h2>
              <div className="space-y-6">
                <select className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                  <option value="1" className="bg-gray-900">Basic</option>
                  <option value="2" className="bg-gray-900">Premium</option>
                  <option value="3" className="bg-gray-900">VIP</option>
                </select>
                <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl hover:opacity-90 transition-opacity">
                  Join
                </button>
              </div>
            </section>

            {/* Profile Section */}
            <section className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 transition-colors md:col-span-2">
              <h2 className="text-2xl font-bold mb-8 text-white">
                Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <h3 className="font-bold mb-2 text-white/80">Donations</h3>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">0 SUI</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <h3 className="font-bold mb-2 text-white/80">Tier</h3>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">None</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                  <h3 className="font-bold mb-2 text-white/80">NFTs</h3>
                  <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">0</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </WalletKitProvider>
  );
} 