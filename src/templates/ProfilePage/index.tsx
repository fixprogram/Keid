import Activity, { ActivityProps } from "@/features/Activity";
import PageHeader from "@/features/PageHeader";
import DangerButton from "@/shared/ui/DangerButton";
import Layout from "@/widgets/Layout";
import { useSession, signOut } from "next-auth/react";
import Body from "./ui/Body";

// const mocks = {
//   days: [
//     {
//       title: "M",
//       tasksAmount: 5,
//     },
//     {
//       title: "T",
//       tasksAmount: 2,
//     },
//     {
//       title: "W",
//       tasksAmount: 1,
//     },
//     {
//       title: "T",
//       tasksAmount: 7,
//     },
//     {
//       title: "F",
//       tasksAmount: 10,
//     },
//     {
//       title: "S",
//       tasksAmount: 2,
//     },
//     {
//       title: "S",
//       tasksAmount: 3,
//     },
//   ],
//   allTasks: 30,
//   allProjects: 6,
//   maxActivity: 10,
// };

interface ProfilePageProps {
  activityData: ActivityProps;
}

export default function ProfilePage({ activityData }: ProfilePageProps) {
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

      <Activity {...activityData} />
    </Layout>
  );
}
