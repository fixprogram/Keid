import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { CompleteButton } from "@/shared/ui/CompleteButton";
import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC, useState } from "react";
import { HabitProgress } from "./HabitProgress";
import { useCompleteForToday } from "../models/useCompleteForToday";

type HabitCardPropsType = {
  id: string;
  title: string;
  style: string;
  streak: number;
  repeats: number;
  hasCompletedToday: boolean;
};

export const HabitCard: FC<HabitCardPropsType> = ({
  id,
  title,
  style,
  streak,
  repeats,
  hasCompletedToday,
}) => {
  const habitStyle = projectStyles[style as ProjectStyleKey];
  const progress = Math.floor((streak / repeats) * 100);

  const { handleComplete, isLoadingComplete, hasCompleted } =
    useCompleteForToday(id, hasCompletedToday);

  return (
    <div
      className={`${
        hasCompleted ? "border-[1px] border-deactive" : "bg-background2"
      } p-3 flex gap-5 rounded-xl relative`}
    >
      {hasCompleted ? (
        <div className="w-[40px]">
          <Icon name="completed" width={40} height={40} />
        </div>
      ) : (
        <form action={handleComplete}>
          <CompleteButton isLoading={isLoadingComplete} />
        </form>
      )}

      <Link
        href={`/habits/${id}`}
        className="w-full flex justify-between flex-wrap"
      >
        <b
          className={`text-lg text-white font-semibold ${
            hasCompleted ? "line-through	" : ""
          }`}
        >
          {title}
        </b>

        <b style={{ color: habitStyle.background, fontSize: "10px" }}>
          {streak}/{repeats}
        </b>

        <HabitProgress style={style} progress={progress} />
      </Link>

      {/* Settings button */}
    </div>
  );
};
