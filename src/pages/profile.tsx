import Layout from "@/components/Layout";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const session = useSession();

  return (
    <Layout>
      Profile
      <hr />
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </Layout>
  );
}
