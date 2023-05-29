"use client";

import Activity from "@/features/Activity";
import PageHeader from "@/features/PageHeader";
import DangerButton from "@/shared/ui/DangerButton";
import { ProfileBody } from "@/templates/ProfilePage/ui/ProfileBody";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import React from "react";

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

async function getData() {
  const res = await fetch(`/api/profile`);
  const data = await res.json();

  return data;
}

export default function Profile() {
  const { data } = useQuery({ queryKey: ["profile"], queryFn: getData });

  const { activityData, userName, userEmail } = data ? data : defaultData;

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <PageHeader title="Profile" />

      <ProfileBody name={userName} email={userEmail} />

      <DangerButton
        text="Sign out"
        onClick={() => signOut({ callbackUrl: "/" })}
      />

      <Activity {...activityData} />
    </Layout>
  );
}
