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
  const { handleComplete, isLoadingComplete, hasCompleted } =
    useCompleteForToday(id, hasCompletedToday);

  return (
    <section
      className={`${
        hasCompleted ? "border-[1px] border-deactive" : "bg-background2"
      } p-3 flex gap-9 rounded-xl relative max-w-[48%] flex-wrap`}
      style={{ aspectRatio: "1 / 1" }}
    >
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
      </Link>

      <div className="flex justify-between items-end w-full">
        <HabitProgress style={style} repeats={repeats} streak={streak} />

        {hasCompleted ? (
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
