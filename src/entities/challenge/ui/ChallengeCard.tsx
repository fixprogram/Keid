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

  return (
    <section
      className={`${
        hasCompletedToday ? "border-[1px] border-deactive" : "bg-background2"
      } p-3 flex gap-9 rounded-xl relative max-w-[160px] flex-wrap`}
    >
      <Link
        href={`/challenges/${id}`}
        className="w-full flex justify-between flex-wrap"
      >
        <b
          className={`text-lg text-white font-semibold ${
            hasCompletedToday ? "line-through	" : ""
          }`}
        >
          {title}
        </b>
      </Link>

      <div className="flex justify-between w-full">
        {/* <b style={{ color: habitStyle.background, fontSize: "10px" }}>
          {streak}/{repeats}
        </b>

        <HabitProgress style={style} progress={progress} /> */}

        <ChallengeProgress style={style} repeats={repeats} streak={streak} />

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

      {/* Settings button */}
    </section>
  );
};
