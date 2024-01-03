"use client";

import PageHeader from "@/features/PageHeader";
import DangerButton from "@/shared/ui/DangerButton";
import { ProfileBody } from "@/templates/ProfilePage/ui/ProfileBody";
import Layout from "@/widgets/Layout";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import React, { FC } from "react";

const defaultData = {
  activityData: {
    days: [],
    allTasks: 0,
    allProjects: 0,
    maxActivity: 0,
  },
  userName: "",
  userEmail: "",
};

async function getData(id: string) {
  const res = await fetch(`/api/profile/${id}`);
  const data = await res.json();

  return data;
}

interface ProfilePropsType {
  id: string;
}

export const Profile: FC<ProfilePropsType> = ({ id }) => {
  const userId = useNavigationStore((state) => state.userId);
  const { data } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getData(id),
  });

  const { activityData, userName, userEmail } = data ? data : defaultData;

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <PageHeader title="Profile" />

      <ProfileBody name={userName} email={userEmail} />

      {userId === id ? (
        <DangerButton
          text="Sign out"
          onClick={() => signOut({ callbackUrl: "/" })}
        />
      ) : null}

      {/* <Activity {...activityData} /> */}
    </Layout>
  );
};
