import EmailFieldset from "@/shared/components/EmailFieldset";
import { links } from "@/shared/config/links";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { SyntheticEvent, useCallback, useState } from "react";

interface Props {
  email: string;
  setEmail: Function;
  setType: Function;
}

export default function CheckEmail({ email, setEmail, setType }: Props) {
  const [error, setError] = useState("");
  const onSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      if (
        !String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        return setError("Invalid email address");
      }

      await fetch(links.login, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then(async (res) => {
          if (!res.ok) {
            return res.json().then((data) => {
              throw new Error(data.error);
            });
          }

          const body = await res.json();
          setType(body.type);
        })
        .catch((error: any) => {
          console.log("Error: ", error.message);
          setError(error.message);
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
      autoComplete="new-password"
    >
      <EmailFieldset email={email} setEmail={setEmail} error={error} />

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
