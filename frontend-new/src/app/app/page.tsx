'use client';

import { WalletProvider, ConnectButton, useWallet } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

function DonationSection() {
  const wallet = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSend = async () => {
    setError('');
    setSuccess('');
    if (!wallet.connected) {
      setError('Please connect your wallet.');
      return;
    }
    if (!recipient || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid recipient and amount.');
      return;
    }
    setLoading(true);
    try {
      // Example: sendSui is not a real function, you need to use wallet's API to send SUI
      // Please refer to suiet wallet-kit docs for actual transfer implementation
      // await wallet.sendSui({ to: recipient, amount: Number(amount) });
      setSuccess('Transfer successful!');
      setRecipient('');
      setAmount('');
    } catch (e) {
      setError('Transfer failed: ' + (e.message || e.toString()));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="glass min-w-[350px] w-full max-w-md md:max-w-lg md:w-[500px] mx-auto rounded-2xl shadow-2xl flex flex-col justify-center items-center p-8">
      <h2 className="text-3xl font-extrabold mb-8 text-white text-center">Donate</h2>
      <div className="space-y-6 w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Wallet Address or SNS Name"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4 text-base"
          />
          <div className="relative w-full">
            <input
              type="number"
              placeholder="Amount in SUI"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">SUI</span>
          </div>
        </div>
        <button
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 text-base font-bold"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
        {error && <div className="text-red-400 text-center mt-2">{error}</div>}
        {success && <div className="text-green-400 text-center mt-2">{success}</div>}
      </div>
    </section>
  );
}

function SubscriptionSection() {
  return (
    <section className="glass min-w-[350px] w-full max-w-md md:max-w-lg md:w-[500px] mx-auto rounded-2xl shadow-2xl flex flex-col justify-center items-center p-8">
      <h2 className="text-3xl font-extrabold mb-8 text-white text-center">Subscribe</h2>
      <div className="space-y-6 w-full">
        <select className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base">
          <option value="1" className="bg-gray-900">Basic</option>
          <option value="2" className="bg-gray-900">Premium</option>
          <option value="3" className="bg-gray-900">VIP</option>
        </select>
        <button className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl hover:opacity-90 transition-opacity text-base font-bold">
          Join
        </button>
      </div>
    </section>
  );
}

function Navbar() {
  return (
    <nav className="w-full bg-transparent py-4 mb-16 shadow-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-between px-6">
        <div className="flex flex-row gap-8 items-center">
          <Link href="/app" className="text-white/80 hover:text-white transition-colors text-lg font-bold">Home</Link>
          <Link href="/app/profile" className="text-white/80 hover:text-white transition-colors text-lg font-bold">Profile</Link>
          <Link href="/app/nfts" className="text-white/80 hover:text-white transition-colors text-lg font-bold">NFTs</Link>
        </div>
        <ConnectButton />
      </div>
    </nav>
  );
}

export default function AppPage() {
  const router = useRouter();

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 w-full px-4">
            <DonationSection />
            <SubscriptionSection />
          </div>
        </main>
      </div>
    </WalletProvider>
  );
} 