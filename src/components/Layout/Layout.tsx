import { FC } from "react";
import Navigation from "./components/Navigation";
import Container from "./components/Container";
import Sprite from "../Sprite";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <section className="bg-background1 min-h-screen	relative overflow-hidden">
      <Sprite />
      <Container>{children}</Container>
      <Navigation />

      <div
        className="absolute w-[310px] h-[310px] blur-[40.7742px] opacity-50 top-[-11.15%] left-[-32.53%] mix-blend-overlay rounded-full z-10"
        style={{
          background:
            "radial-gradient(57.72% 57.72% at 61.86% 38.92%, #EF88ED 0%, #7269E3 54.46%, #8350DB 100%)",
        }}
      />

      <div
        className="absolute w-[376px] h-[376px] blur-[40.7742px] opacity-50 bottom-[-11.76%] right-[-32.27%] mix-blend-overlay rounded-full z-10"
        style={{
          background:
            "radial-gradient(57.72% 57.72% at 61.86% 38.92%, #EF88ED 0%, #7269E3 54.46%, #8350DB 100%)",
        }}
      />
    </section>
  );
};

export default Layout;