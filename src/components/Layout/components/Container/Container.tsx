import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Container: FC<Props> = ({ children }) => {
  return (
    <section className="px-5 pt-6 pb-[120px] relative z-20">{children}</section>
  );
};

export default Container;