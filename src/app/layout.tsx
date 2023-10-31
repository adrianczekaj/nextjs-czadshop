import React from "react";
import type { Metadata } from 'next'
import './globals.css'
import ThemeProvider from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: 'Czadshop-Next Dev',
  description: 'An e-commerce site built with Next.js and TypeScript',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
