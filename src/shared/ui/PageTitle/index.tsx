import { FC } from "react";

type Props = {
  children: React.ReactNode;
};

const PageTitle: FC<Props> = ({ children }) => {
  return (
    <h1
      className="text-white font-poppins font-semibold mt-10 pr-[18%]"
      style={{ fontSize: 32, lineHeight: "40px" }}
    >
      {children}
    </h1>
  );
};

export default PageTitle;
