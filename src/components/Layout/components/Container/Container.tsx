import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <section className="px-5 py-6" style={{ maxHeight: `calc(100vh - 63px)` }}>
      {children}
    </section>
  );
};

export default Container;
