import './globals.css'
import { Inter } from 'next/font/google'
import { WalletProvider } from '@mysten/dapp-kit'
import { getFullnodeUrl } from '@mysten/sui.js/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Triturus - Pixel Art DApp',
  description: 'A minimalist pixel-art styled DApp for donations on Sui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} crt`}>
        <WalletProvider
          chains={[
            {
              id: 'sui:testnet',
              rpcUrl: getFullnodeUrl('testnet'),
            },
          ]}
          autoConnect
        >
          {children}
        </WalletProvider>
      </body>
    </html>
  )
} 