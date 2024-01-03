type Props = {
  type: "text" | "email" | "password" | "search";
  name: string;
  placeholder: string;
  required?: boolean;
};

export default function InputText({
  type,
  name,
  placeholder,
  required = false,
  ...props
}: Props) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
      required={required}
      style={{ background: "inherit" }}
      {...props}
    />
  );
}
