import Activity, { ActivityProps } from "@/features/Activity";
import PageHeader from "@/features/PageHeader";
import DangerButton from "@/shared/ui/DangerButton";
import Layout from "@/widgets/Layout";
import { signOut } from "next-auth/react";
import { FC } from "react";
import { ProfileBody } from "./ui/ProfileBody";

interface ProfilePagePropsType {
  activityData: ActivityProps;
}

export const ProfilePage: FC<ProfilePagePropsType> = ({ activityData }) => {
  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <PageHeader title="Profile" />

      <ProfileBody name="123" email="123" />

      <DangerButton
        text="Sign out"
        onClick={() => signOut({ callbackUrl: "/" })}
      />

      <Activity {...activityData} />
    </Layout>
  );
};
