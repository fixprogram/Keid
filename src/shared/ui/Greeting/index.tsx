import { FC } from "react";

interface GreetingPropsType {
  name: string;
}

export const Greeting: FC<GreetingPropsType> = ({ name }) => {
  return (
    <h2 className="text-white font-poppins font-semibold text-xxl mt-[22px]">
      {`Hello, ${name}`}
    </h2>
  );
};
