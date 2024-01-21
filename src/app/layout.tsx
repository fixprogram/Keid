import "./globals.css";
import Providers from "@/utils/providers";
import { MAX_WIDTH } from "@/shared/config/consts";
import { Metadata, Viewport } from "next";
import { inter, poppins } from "./ui/fonts";
import { auth } from "./lib/auth";
import { redirect } from "next/navigation";

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Keid",
  description: "Keid",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],
  authors: [],
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

  // if (!session) return redirect("/welcome");

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
