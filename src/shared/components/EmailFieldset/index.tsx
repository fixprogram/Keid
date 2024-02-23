type Props = {
  email: string;
  setEmail: Function;
  error: string;
};

export default function EmailFieldset({ email, setEmail, error }: Props) {
  return (
    <fieldset>
      <label
        htmlFor={email}
        className="block text-darkDeactive text-xxs uppercase"
      >
        Your email
      </label>

      <input
        type="search"
        name="email"
        placeholder="Email"
        className="w-full text-lg text-white font-bold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
        required
        style={{ background: "inherit" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
      />

      {error.length ? <p className="text-red mt-4">{error}</p> : null}
    </fieldset>
  );
}
