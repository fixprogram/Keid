import { Inter, Poppins } from "next/font/google";

export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const poppins = Poppins({
  weight: ["600", "400"],
  subsets: ["latin"],
  variable: "--font-poppins",
});
