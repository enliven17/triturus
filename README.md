# Triturus - Earn from your community in WEB3

A minimalist pixel-art styled DApp built on Sui Move that enables SUI wallet connections (including zkLogin) for donations.

## Features

- 🎨 Pixel art styling with CRT monitor effects
- 💰 One-time donations and subscriptions
- 🎮 Soulbound NFT collection for donors
- 🔐 SUI wallet integration with zkLogin support
- 📱 Mobile-responsive design

## Tech Stack

- **Frontend**: Next.js + TypeScript
- **Smart Contracts**: Sui Move
- **Wallet Integration**: @mysten/dapp-kit
- **Styling**: Tailwind CSS

## Prerequisites

- Node.js 16+
- Sui CLI
- A Sui wallet (e.g., Sui Wallet, Ethos)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/triturus.git
cd triturus
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Build and deploy the Move package:
```bash
cd ../triturus
sui move build
sui client publish --gas-budget 100000000
```

4. Start the development server:
```bash
cd ../frontend
npm run dev
```

## Smart Contract Structure

- `donate.move`: Handles one-time donations and subscriptions
- `soulbound.move`: Manages Soulbound NFT minting and ownership

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Sui Foundation for the amazing blockchain platform
- The pixel art community for inspiration
- All contributors and supporters 