import EmailFieldset from "@/shared/components/EmailFieldset";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { useCallback } from "react";

interface Props {
  email: string;
  setEmail: Function;
  setType: Function;
}

export default function CheckEmail({ email, setEmail, setType }: Props) {
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }).then(async (res) => {
        const body = await res.json();
        console.log("body: ", body);
        setType(body.type);
      });
    },
    [email, setType]
  );

  return (
    <form
      method="post"
      action="/api/login"
      onSubmit={onSubmit}
      className="mt-6"
    >
      <EmailFieldset email={email} setEmail={setEmail} />

      <PrimaryButton
        type="submit"
        text="Continue with Email"
        iconName={"letter"}
      />
    </form>
  );
}
