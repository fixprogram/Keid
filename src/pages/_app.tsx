import "@/index.css";
import { Inter, Poppins } from "next/font/google";
import type { AppProps } from "next/app";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: "600",
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${poppins.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
