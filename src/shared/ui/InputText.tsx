import { InputHTMLAttributes } from "react";

export default function InputText({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
      style={{ background: "inherit" }}
    />
  );
}
