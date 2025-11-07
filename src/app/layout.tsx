import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Aaruchudar - Awaken Human Intelligence",
  description: "Discover your mental clarity and decision-making skills through innovative learning experiences.",
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
