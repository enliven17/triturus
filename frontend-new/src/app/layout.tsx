import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Triturus DApp",
  description: "A minimalist pixel-art styled DApp for donations and subscriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        {/* Floating background shapes */}
        <div className="floating-shape pink" />
        <div className="floating-shape blue" />
        <div className="floating-shape green" />
        <div className="floating-shape purple" />
        
        {/* Main content */}
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
