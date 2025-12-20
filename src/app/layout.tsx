import type { Metadata } from "next";
import { Public_Sans, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedLogo from "@/components/FixedLogo";

const charis = localFont({
  src: [
    {
      path: "../../public/Charis-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Charis-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/Charis-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Charis-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/Charis-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Charis-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/Charis-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Charis-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-charis",
});

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
        className={`${publicSans.variable} ${ibmPlexMono.variable} ${playfairDisplay.variable} ${charis.variable} antialiased flex flex-col min-h-screen`}
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
