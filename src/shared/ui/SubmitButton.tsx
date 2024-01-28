import { ButtonHTMLAttributes, FC } from "react";

export const SubmitButton: FC<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type">
> = ({ ...props }) => {
  //   const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex justify-center items-center border-primary border-2 rounded-3xl text-white font-bold h-12 w-full"
      //   aria-disabled={pending}
      {...props}
    />
  );
};
