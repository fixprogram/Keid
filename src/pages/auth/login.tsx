import { useCallback, useState } from "react";
import { getSession } from "next-auth/react";
import Layout from "@/components/Layout";
import Signin from "@/Widgets/Signin";
import Signup from "@/Widgets/Signup";
import PageTitle from "@/shared/ui/PageTitle";
import CheckEmail from "@/Widgets/CheckEmail";
import RouterBack from "@/shared/components/RouterBack";
import { GetStaticProps } from "next/types";

export default function Login() {
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");

  const goBack = useCallback(() => {
    setType("");
  }, []);

  if (type === "signin") {
    return <Signin email={email} goBack={goBack} />;
  }

  if (type === "signup") {
    return <Signup email={email} goBack={goBack} />;
  }

  return (
    <Layout withNav={false}>
      <RouterBack />

      <PageTitle>What’s your email address?</PageTitle>

      <CheckEmail email={email} setEmail={setEmail} setType={setType} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return { props: {} };
};
