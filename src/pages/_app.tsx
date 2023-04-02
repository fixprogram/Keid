import "@/index.css";
import { Inter, Poppins } from "next/font/google";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../application/store/store";
import { Provider } from "react-redux";

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
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <main className={`${inter.variable} ${poppins.variable} font-sans`}>
          <Component {...props.pageProps} />
        </main>
      </Provider>
    </SessionProvider>
  );
}
