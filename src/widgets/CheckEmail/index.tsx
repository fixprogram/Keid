import EmailFieldset from "@/shared/components/EmailFieldset";
import { links } from "@/shared/config/links";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { SyntheticEvent, useCallback } from "react";

interface Props {
  email: string;
  setEmail: Function;
  setType: Function;
}

export default function CheckEmail({ email, setEmail, setType }: Props) {
  const onSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      await fetch(links.login, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }).then(async (res) => {
        const body = await res.json();
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

      <div className="mt-10">
        <PrimaryButton
          type="submit"
          text="Continue with Email"
          iconName={"letter"}
        />
      </div>
    </form>
  );
}
