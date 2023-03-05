import { FC } from "react";
import Navigation from "./components/Navigation";
import Container from "./components/Container";
import Sprite from "../Sprite";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <section>
      {/* <section className={`${inter.variable} font-sans`}> */}
      <Sprite />
      <Container>{children}</Container>
      <Navigation />
    </section>
  );
};

export default Layout;
