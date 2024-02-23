"use client";

import { ProjectStyleKey, projectStyles } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import { useDashboardStore } from "@/templates/DashboardPage";
import Link from "next/link";
import { FC } from "react";
import { ChallengeProgress } from "./ChallengeProgress";
import { CompleteButton } from "@/shared/ui/CompleteButton";
import { useCompleteForToday } from "../model/useCompleteForToday";

interface ChallengeCardPropsType {
  id: string;
  title: string;
  style: string;
  streak: number;
  repeats: number;
  hasCompletedToday: boolean;
}

export const ChallengeCard: FC<ChallengeCardPropsType> = ({
  id,
  title,
  style,
  streak,
  repeats,
  hasCompletedToday,
}) => {
  const setScrollY = useDashboardStore((state) => state.setScrollY);

  const { handleComplete, isLoadingComplete } = useCompleteForToday(id);

  const challengeStyle = projectStyles[style as ProjectStyleKey];

  return (
    <section
      className={`${
        hasCompletedToday ? "border-[1px] border-deactive" : "bg-background2"
      } p-3 flex gap-9 rounded-xl relative flex-wrap`}
    >
      <div className="flex justify-between w-full gap-4">
        <Link
          href={`/challenges/${id}`}
          className="w-full flex justify-between flex-wrap"
        >
          <b
            className={`text-lg text-white font-bold ${
              hasCompletedToday ? "line-through	" : ""
            }`}
          >
            {title}
          </b>
        </Link>
        {hasCompletedToday ? (
          <div className="w-[40px]">
            <Icon name="completed" width={40} height={40} />
          </div>
        ) : (
          <form action={handleComplete}>
            <CompleteButton isLoading={isLoadingComplete} />
          </form>
        )}
      </div>

      <div className="flex justify-between w-full flex-wrap gap-4">
        <ChallengeProgress style={style} repeats={repeats} streak={streak} />

        <div className="flex justify-between w-full">
          <div>
            <Icon name="avatar" width={24} height={24} />
          </div>

          <div
            className="text-white py-2 px-3 rounded-full"
            style={{
              backgroundColor: challengeStyle.background,
              fontSize: "10px",
              fontWeight: 800,
            }}
          >
            {streak}/{repeats}
          </div>
        </div>
      </div>

      {/* Settings button */}
    </section>
  );
};
