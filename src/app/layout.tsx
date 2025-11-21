import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Aaruchudar - Transform Your Mind",
  description: "Enhance your mental capabilities and unlock your true potential",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
