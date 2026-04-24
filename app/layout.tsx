import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { createMetadata } from "@/lib/metadata";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = createMetadata({
  title: "Portfolio | Giuseppe Caruso",
  description: "Selected works and creative storytelling by Giuseppe Caruso.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased bg-neutral-950 text-white transition-colors">
        <Preloader>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Preloader>
      </body>
    </html>
  );
}