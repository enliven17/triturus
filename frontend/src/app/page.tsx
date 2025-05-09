'use client'

import { ConnectButton } from '@mysten/dapp-kit'
import { useState } from 'react'

export default function Home() {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-pixel text-pixel-accent">Triturus</h1>
          <ConnectButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Donation Form */}
          <div className="pixel-card">
            <h2 className="text-2xl mb-4">Make a Donation</h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Amount (SUI)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pixel-input w-full"
                  placeholder="0.0"
                />
              </div>
              <div>
                <label className="block mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="pixel-input w-full"
                  placeholder="Your message..."
                  rows={3}
                />
              </div>
              <button className="pixel-button w-full">
                Donate
              </button>
            </div>
          </div>

          {/* Profile Section */}
          <div className="pixel-card">
            <h2 className="text-2xl mb-4">Your Profile</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-pixel-deep rounded"></div>
                <div>
                  <h3 className="text-xl">Username</h3>
                  <p className="text-sm text-pixel-accent">Connect wallet to view</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl mb-2">Total Donations</h3>
                <p className="text-2xl text-pixel-accent">0 SUI</p>
              </div>
              <div>
                <h3 className="text-xl mb-2">Soulbound NFTs</h3>
                <div className="grid grid-cols-3 gap-2">
                  {/* NFT placeholders */}
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-pixel-deep rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 