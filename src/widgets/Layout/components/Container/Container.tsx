import { FC } from "react";

interface Props {
  withNav?: boolean;
  children: React.ReactNode;
}

const Container: FC<Props> = ({ withNav = true, children }) => {
  return (
    <section
      className={`${
        withNav ? "px-6 pt-6 pb-[120px]" : "p-6"
      } flex flex-col grow`}
    >
      {/* <section className={`${withNav ? "px-6 pt-6 pb-[120px]" : "p-10"}`}> */}
      {children}
    </section>
  );
};

export default Container;
