type Props = {
  email: string;
  setEmail: Function;
};

export default function EmailFieldset({ email, setEmail }: Props) {
  return (
    <fieldset>
      <label
        htmlFor={email}
        className="block text-darkDeactive text-xxs uppercase"
      >
        Your email
      </label>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
        required
        style={{ background: "inherit" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </fieldset>
  );
}
