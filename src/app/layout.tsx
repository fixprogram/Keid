import "./globals.css";
import Providers from "@/utils/providers";
import { MAX_WIDTH } from "@/shared/config/consts";
import { Metadata } from "next";
import { inter, poppins } from "./ui/fonts";
import { auth } from "./lib/auth";

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
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
    { rel: "icon", url: "/icon-192.png" },
  ],
};

interface RootLayoutPropsType {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutPropsType) {
  const session = await auth();

  console.log("session: ", session);

  return (
    <html lang="en">
      <head>
        <title>Keid</title>
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans`}
        style={{ maxWidth: MAX_WIDTH }}
      >
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
