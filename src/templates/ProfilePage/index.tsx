import Activity, { ActivityProps } from "@/features/Activity";
import PageHeader from "@/features/PageHeader";
import DangerButton from "@/shared/ui/DangerButton";
import Layout from "@/widgets/Layout";
import { useSession, signOut } from "next-auth/react";
import Body from "./ui/Body";

interface ProfilePageProps {
  activityData: ActivityProps;
}

export default function ProfilePage({ activityData }: ProfilePageProps) {
  const { status } = useSession();

  if (status !== "authenticated") {
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

      <Activity {...activityData} />
    </Layout>
  );
}
