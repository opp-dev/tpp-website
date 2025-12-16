import type { Metadata } from "next";
import { Public_Sans, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedLogo from "@/components/FixedLogo";

const publicSans = Public_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  style: ['normal', 'italic'],
});


export const metadata: Metadata = {
  title: "The Product Papers",
  description: "A blog about product design",
  icons: {
    icon: "/tpp-favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable} ${ibmPlexMono.variable} ${playfairDisplay.variable} antialiased flex flex-col min-h-screen`}
      >
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="d7eb3f0d-828f-41b2-b826-5075871d8903"
        />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FixedLogo />
      </body>
    </html>
  );
}
