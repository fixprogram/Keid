"use client";

import { Challenge, CommentType, Habit, Task } from "@prisma/client";
import { FC } from "react";
import ProgressBar from "../WeeklyProgress/ui/ProgressBar";
import { isDateToday } from "@/shared/lib/utils/isDateToday";

interface DailyProgressPropsType {
  tasks: Task[];
  habits: Habit[];
  challenges: Challenge[];
}

export const DailyProgress: FC<DailyProgressPropsType> = ({
  tasks,
  habits,
  challenges,
}) => {
  if (!tasks || !habits || !challenges) {
    return null;
  }

  const totalTaskAmount = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed);
  const completedTaskAmount = completedTasks.length;

  const totalHabitAmount = habits.length;
  const completedHabits = habits.filter((habit) => {
    const lastHabitUpdate = habit.comments
      .filter((comment) => comment.type === CommentType.PROGRESS_UPDATE)
      .at(-1)?.time;

    if (lastHabitUpdate && isDateToday(new Date(Number(lastHabitUpdate)))) {
      return true;
    }
  });
  const completedHabitAmount = completedHabits.length;

  const totalChallengesAmount = challenges.length;
  const completedChallenges = challenges.filter((challenge) => {
    const lastHabitUpdate = challenge.comments
      .filter((comment) => comment.type === CommentType.PROGRESS_UPDATE)
      .at(-1)?.time;

    if (lastHabitUpdate && isDateToday(new Date(Number(lastHabitUpdate)))) {
      return true;
    }
  });
  const completedChallengesAmount = completedChallenges.length;

  const totalTaskPoints = tasks
    .map((task) => task.points)
    .reduce((a, b) => a + b, 0);
  const completedTaskPoints = completedTasks
    .map((task) => task.points)
    .reduce((a, b) => a + b, 0);

  const totalHabitPoints = habits
    .map((habit) => habit.points)
    .reduce((a, b) => a + b, 0);
  const completedHabitPoints = completedHabits
    .map((habit) => habit.points)
    .reduce((a, b) => a + b, 0);

  const totalChallengePoints = challenges
    .map((challenge) => challenge.points)
    .reduce((a, b) => a + b, 0);
  const completedChallengePoints = completedChallenges
    .map((challenge) => challenge.points)
    .reduce((a, b) => a + b, 0);

  const totalPoints = totalTaskPoints + totalHabitPoints + totalChallengePoints;
  const completedPoints =
    completedTaskPoints + completedHabitPoints + completedChallengePoints;

  const progress = Math.floor((completedPoints / totalPoints) * 100);

  return (
    <section
      className="mt-8 pt-5 pr-6 pb-3 pl-5 flex justify-between bg-deactive"
      style={{
        filter: "drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.25))",
        background: "#262A34",
        borderRadius: "20px",
      }}
    >
      <div style={{ maxWidth: "45%" }}>
        <div className="flex flex-col gap-3">
          <p className="text-deactive text-sm">Daily Progress</p>
          <div className="flex gap-2">
            <div
              className="h-[24px] px-2 rounded-full"
              style={{
                background: "linear-gradient(180deg, #9ADB7F 0%, #6EA95C 100%)",
              }}
            >
              <b className="font-base text-white font-bold">
                {completedTaskAmount}/{totalTaskAmount}
              </b>
            </div>
            <b className="text-deactive text-sm">tasks</b>
          </div>
          <div className="flex gap-2">
            <div
              className="h-[24px] px-2 rounded-full"
              style={{
                background: "linear-gradient(180deg, #9ADB7F 0%, #6EA95C 100%)",
              }}
            >
              <b className="font-base text-white font-bold">
                {completedHabitAmount}/{totalHabitAmount}
              </b>
            </div>
            <b className="text-deactive text-sm">habits</b>
          </div>

          <div className="flex gap-2">
            <div
              className="h-[24px] px-2 rounded-full"
              style={{
                background: "linear-gradient(180deg, #9ADB7F 0%, #6EA95C 100%)",
              }}
            >
              <b className="font-base text-white font-bold">
                {completedChallengesAmount}/{totalChallengesAmount}
              </b>
            </div>
            <b className="text-deactive text-sm">challenges</b>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <ProgressBar progress={progress} />
        <b className="text-white text-bold text-lg">{completedPoints} points</b>
      </div>
    </section>
  );
};
