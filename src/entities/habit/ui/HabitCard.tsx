import { CompleteButton } from "@/shared/ui/CompleteButton";
import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC } from "react";
import { HabitProgress } from "./HabitProgress";
import { useCompleteForToday } from "../models/useCompleteForToday";
import { hasCompletedToday } from "@/shared/lib/utils/hasCompletedToday";
import { Habit } from "@prisma/client";

type HabitCardPropsType = Pick<
  Habit,
  "id" | "title" | "style" | "streak" | "repeats" | "comments"
> & {
  initialCompleted?: boolean;
};

export const HabitCard: FC<HabitCardPropsType> = ({
  id,
  title,
  style,
  streak,
  repeats,
  comments,
  initialCompleted,
}) => {
  const { handleComplete, isLoadingComplete } = useCompleteForToday(id);
  const isCompleted = initialCompleted || hasCompletedToday(comments);

  return (
    <section
      className={`${
        isCompleted ? "border-[1px] border-deactive" : "bg-background2"
      } p-3 flex gap-9 rounded-xl relative flex-wrap grow`}
      style={{ aspectRatio: "1 / 1", maxWidth: "calc(50% - 8px)" }}
    >
      <Link
        href={`/habits/${id}`}
        className="w-full flex justify-between flex-wrap"
      >
        <b
          className={`text-lg text-white font-bold ${
            isCompleted ? "line-through	" : ""
          }`}
        >
          {title}
        </b>
      </Link>

      <div className="flex justify-between items-end w-full">
        <HabitProgress style={style} repeats={repeats} streak={streak} />

        {isCompleted ? (
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
