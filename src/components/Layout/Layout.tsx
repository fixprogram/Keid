import { FC } from "react";
import Navigation from "./components/Navigation";
import Container from "./components/Container";
import Sprite from "../Sprite";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <section>
      <Sprite />
      <Container>{children}</Container>
      <Navigation />
    </section>
  );
};

export default Layout;
