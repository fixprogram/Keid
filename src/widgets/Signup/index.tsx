import Layout from "@/widgets/Layout";
import RouterBack from "@/shared/components/RouterBack";
import InputLabel from "@/shared/ui/InputLabel";
import PageTitle from "@/shared/ui/PageTitle";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";
import { links } from "@/shared/config/links";

interface Props {
  email: string;
  goBack: () => void;
}

export default function Signup({ email, goBack }: Props) {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (nameRef.current && passwordRef.current) {
      const name = nameRef.current.value;
      const password = passwordRef.current.value;

      fetch(links.signup, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, password }),
      }).then(async (res) => {
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res.url) router.push("/");
      });
    }
  }

  return (
    <Layout withNav={false}>
      <RouterBack goBack={goBack} />

      <PageTitle>Sign Up</PageTitle>

      <p className="text-deactive text-small mt-3">
        Using <span className="text-white font-bold mx-[2px]">{email}</span> to
        sign up
      </p>

      <form
        action="/api/signup"
        method="post"
        className="mt-10"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="email" defaultValue={email} />

        <fieldset className="mb-6">
          <InputLabel htmlFor="name" text="Your name" />

          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
            style={{ background: "inherit" }}
            ref={nameRef}
            autoComplete="off"
          />
        </fieldset>

        <fieldset className="mb-6">
          <InputLabel htmlFor="password" text="Your password" />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
            style={{ background: "inherit" }}
            ref={passwordRef}
          />
        </fieldset>

        <PrimaryButton type="submit" text="Sign up" />
      </form>
    </Layout>
  );
}
