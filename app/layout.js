import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "UShort - URL Shortener",
  description: "A simple URL shortener built with Next.js and Firebase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
