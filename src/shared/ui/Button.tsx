import { ButtonHTMLAttributes, FC } from "react";

export const Button: FC<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">
> = ({ ...props }) => {
  return (
    <button
      type="button"
      className="flex justify-center items-center border-primary border-2 rounded-3xl text-white font-bold h-12 w-full"
      {...props}
    />
  );
};
