import { ActivityProps } from "@/features/Activity";
import { getWeeklyActivityData } from "@/features/Activity/api";
import { ProfilePage } from "@/templates/ProfilePage";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";

interface ProfilePageProps {
  activityData: ActivityProps;
}

function Profile({ activityData }: ProfilePageProps) {
  return <ProfilePage activityData={activityData} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    throw new Error("session is not defined");
  }

  const user = session.user as { id: string };
  const userId = user.id;
  const activityData = await getWeeklyActivityData(userId);

  return {
    props: { activityData }, // will be passed to the page component as props
  };
};

export default Profile;
