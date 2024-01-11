import { Inter, Poppins } from "next/font/google";

import "./globals.css";
import Providers from "@/utils/providers";
import { MAX_WIDTH } from "@/shared/config/consts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keid",
  description: "Keid",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "/public/apple-touch-icon.png" },
    { rel: "icon", url: "/public/icon-192.png" },
  ],
};

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["600", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

interface RootLayoutProps {
  children: React.ReactNode;
}
export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>Keid</title>
        <link rel="manifest" href="/public/manifest.json" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans`}
        style={{ maxWidth: MAX_WIDTH }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
