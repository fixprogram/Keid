import Layout from "@/widgets/Layout";
import PageTitle from "@/shared/ui/PageTitle";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import RouterBack from "@/shared/components/RouterBack";
import { signIn, SignInResponse } from "next-auth/react";
import InputLabel from "@/shared/ui/InputLabel";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

interface Props {
  email: string;
  goBack: () => void;
}

export default function Signin({ email, goBack }: Props) {
  const [password, setPassword] = useState({ value: "", error: "" });
  const router = useRouter();

  const login = useCallback(async () => {
    const res = (await signIn("credentials", {
      email,
      password: password.value,
      redirect: false,
    })) as SignInResponse;

    if (res.error)
      setPassword((prevPassword) => ({
        ...prevPassword,
        error: "Password is not correct",
      }));

    if (res.url) router.push("/");
  }, [router, email, password.value]);

  const error = password.error ? (
    <span className="text-red mt-2">{password.error}</span>
  ) : null;

  return (
    <Layout withNav={false}>
      <RouterBack goBack={goBack} />

      <PageTitle>Login</PageTitle>

      <p className="text-deactive text-small mt-3">
        Using <span className="text-white font-bold mx-[2px]">{email}</span> to
        login
      </p>

      <form action="/api/signin" method="post" className="mt-10">
        <input type="hidden" name="email" defaultValue={email} />

        <fieldset>
          <InputLabel htmlFor="password" text="Your password" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required={true}
            value={password.value}
            onChange={(e) =>
              setPassword((prevPassword) => ({
                ...prevPassword,
                value: e.target.value,
              }))
            }
            className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
            style={{ background: "inherit" }}
          />
          {error}
        </fieldset>

        <div className="mt-10">
          <PrimaryButton text="Sign in" onClick={login} />
        </div>
      </form>
    </Layout>
  );
}
