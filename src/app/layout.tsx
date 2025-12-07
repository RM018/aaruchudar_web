"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/reset.css";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isQuizPage = pathname === "/quiz";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1" />
      </head>
      <body
        className={`antialiased`}
        suppressHydrationWarning
      >
        {!isQuizPage && <Navbar />}
        <main className={`${!isQuizPage ? '' : ''} min-h-screen safe-bottom pb-16 md:pb-0`} aria-label="Page content">
          {children}
        </main>
      </body>
    </html>
  );
}
