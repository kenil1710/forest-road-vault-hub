import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const title = "Forest Road Vault Community Hub — Yield Calculator & Protocol Guide";
const description =
  "An independent community tool for Forest Road Vault: estimate sUSDfr returns, read the live book, understand the loss cascade and weigh the risks. Not affiliated with Forest Road Asset Management.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Forest Road Vault Community Hub",
  },
  description,
  applicationName: "Forest Road Vault Community Hub",
  keywords: [
    "Forest Road Vault",
    "USDfr",
    "sUSDfr",
    "private credit",
    "RWA",
    "yield calculator",
    "ERC-4626",
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Forest Road Vault Community Hub",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} antialiased`}>
      <body className="min-h-screen bg-navy font-sans text-fg">{children}</body>
    </html>
  );
}
