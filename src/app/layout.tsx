import { Inter, Poppins } from "next/font/google";

import "./globals.css";
import Providers from "@/utils/providers";
import { MAX_WIDTH } from "@/shared/config/consts";

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
