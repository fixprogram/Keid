type Props = {
  htmlFor: string;
  text: string;
};

export default function InputLabel({ htmlFor, text }: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-darkDeactive text-xxs uppercase"
    >
      {text}
    </label>
  );
}
