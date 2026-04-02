import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakingNews from "@/components/BreakingNews";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL('https://www.hindnationnews.in'),
  title: {
    default: "HIND NATION NEWS | Lalit Shishodia",
    template: "%s | HIND NATION NEWS"
  },
  description: "Official news portal of HIND NATION NEWS. Breaking news, latest updates, and in-depth reporting by Lalit Shishodia.",
  keywords: ["HIND NATION NEWS", "Lalit Shishodia", "Indian News", "Breaking News India", "Digital Journalism", "Hindi News"],
  authors: [{ name: "Lalit Shishodia" }],
  creator: "Lalit Shishodia",
  publisher: "HIND NATION NEWS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' }
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "HIND NATION NEWS | Lalit Shishodia",
    description: "Official news portal of HIND NATION NEWS. Breaking news, latest updates, and in-depth reporting by Lalit Shishodia.",
    url: 'https://www.hindnationnews.in',
    siteName: 'HIND NATION NEWS',
    images: [
      {
        url: '/hindnews.png',
        width: 1200,
        height: 630,
        alt: 'HIND NATION NEWS Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "HIND NATION NEWS | Lalit Shishodia",
    description: "Official news portal of HIND NATION NEWS. Breaking news, latest updates, and in-depth reporting by Lalit Shishodia.",
    creator: '@lalitshishodia', // Assuming this is the handle based on previous context
    images: ['/hindnews.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans bg-white text-black min-h-screen flex flex-col overflow-x-hidden">
        <Header />
        <BreakingNews />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
