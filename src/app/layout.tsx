import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";

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
        className={`antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Navbar />
        <main className="pt-20 flex-grow">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
