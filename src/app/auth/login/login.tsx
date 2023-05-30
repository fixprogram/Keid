"use client";

import { useCallback, useState } from "react";
import { getSession } from "next-auth/react";
import Layout from "@/widgets/Layout";
import Signin from "@/widgets/Signin";
import Signup from "@/widgets/Signup";
import PageTitle from "@/shared/ui/PageTitle";
import CheckEmail from "@/widgets/CheckEmail";
import RouterBack from "@/shared/components/RouterBack";
import { GetServerSideProps, GetStaticProps } from "next/types";

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
