import PageHeader from "@/features/PageHeader";
import DangerButton from "@/shared/ui/DangerButton";
import Layout from "@/widgets/Layout";
import { useSession, signOut } from "next-auth/react";
import Body from "./components/Body";

export default function ProfilePage() {
  const { data } = useSession();

  if (!data) {
    return null;
  }

  return (
    <Layout withNav={false}>
      <PageHeader title="Profile" />

      <Body />

      <DangerButton
        text="Sign out"
        onClick={() => signOut({ callbackUrl: "/" })}
      />
      {/* <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button> */}
    </Layout>
  );
}
