import { FC } from "react";

interface ContainerPropsType {
  withNav?: boolean;
  children: React.ReactNode;
}

const Container: FC<ContainerPropsType> = ({ withNav = true, children }) => {
  return (
    <section
      className={`${
        withNav ? "px-3 pt-3 pb-[120px]" : "p-3"
      } flex flex-col grow`}
    >
      {children}
    </section>
  );
};

export default Container;
