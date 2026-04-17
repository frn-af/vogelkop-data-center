import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BBKSDA Papua Barat Daya",
    template: "%s | BBKSDA Papua Barat Daya",
  },
  description:
    "Portal resmi Balai Besar Konservasi Sumber Daya Alam Papua Barat Daya — Layanan publik, perizinan, dan informasi kawasan konservasi di Semenanjung Kepala Burung.",
  keywords: [
    "BBKSDA",
    "Papua Barat Daya",
    "konservasi",
    "kawasan konservasi",
    "SIMAKSI",
    "perizinan",
    "flora fauna",
    "Vogelkop",
    "KLHK",
  ],
  authors: [{ name: "BBKSDA Papua Barat Daya" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "BBKSDA Papua Barat Daya",
    title: "BBKSDA Papua Barat Daya",
    description:
      "Portal resmi Balai Besar KSDA Papua Barat Daya — Layanan publik dan informasi kawasan konservasi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BBKSDA Papua Barat Daya",
    description:
      "Portal resmi Balai Besar KSDA Papua Barat Daya — Layanan publik dan informasi kawasan konservasi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
