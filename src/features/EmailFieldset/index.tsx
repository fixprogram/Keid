import InputLabel from "@/shared/ui/InputLabel";
import InputText from "@/shared/ui/InputText";

export default function EmailFieldset({ email, setEmail }) {
  return (
    <fieldset>
      <InputLabel htmlFor="email" text="Your email" />
      <InputText
        type="email"
        name="email"
        placeholder="Email"
        required={true}
      />
    </fieldset>
  );
}
