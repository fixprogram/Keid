import Activity, { ActivityProps } from "@/features/Activity";
import PageHeader from "@/features/PageHeader";
import DangerButton from "@/shared/ui/DangerButton";
import Layout from "@/widgets/Layout";
import { useSession, signOut } from "next-auth/react";
import { FC } from "react";
import Body from "./ui/Body";

interface ProfilePagePropsType {
  activityData: ActivityProps;
}

export const ProfilePage: FC<ProfilePagePropsType> = ({ activityData }) => {
  const { status } = useSession();

  if (status !== "authenticated") {
    return null;
  }

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <PageHeader title="Profile" />

      <Body />

      <DangerButton
        text="Sign out"
        onClick={() => signOut({ callbackUrl: "/" })}
      />

      <Activity {...activityData} />
    </Layout>
  );
};
