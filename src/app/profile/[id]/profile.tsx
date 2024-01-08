"use client";

import { useUser } from "@/entities/user/models/userContext";
import { FollowUser } from "@/features/FollowUser";
import PageHeader from "@/features/PageHeader";
import DangerButton from "@/shared/ui/DangerButton";
import { ProfileBody } from "@/templates/ProfilePage";
import Layout from "@/widgets/Layout";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { FC, useCallback } from "react";

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
  const user = useUser();
  const userId = user?.userId as string;

  const { data } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getData(id),
  });

  const {
    activityData,
    userName,
    userEmail,
    isFollowing,
    followersAmount,
    followingAmount,
  } = data ? data : defaultData;

  //   const handleToggleFollow = useCallback(() => {

  //   }, [])

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <PageHeader title="Profile" />

      <ProfileBody name={userName} email={userEmail} />

      <div className="mt-4 flex gap-4 justify-between">
        <Link className="text-white" href={`/profile/${id}/followers`}>
          Followers: {followersAmount}
        </Link>
        <Link className="text-white" href={`/profile/${id}/following`}>
          Following: {followingAmount}
        </Link>
      </div>

      {userId !== id ? (
        <FollowUser userId={userId} id={id} initialValue={isFollowing} />
      ) : null}

      {userId === id ? (
        <div className="mt-auto">
          <DangerButton
            text="Sign out"
            onClick={() => signOut({ callbackUrl: "/" })}
          />
        </div>
      ) : null}

      {/* <Activity {...activityData} /> */}
    </Layout>
  );
};
