"use client";

import { ChallengeCard } from "@/entities/challenge";
import { HabitCard } from "@/entities/habit";
import { mapTasksIntoHierarchy } from "@/entities/task";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { DailyTasks } from "@/features/DailyTasks";
import { links } from "@/shared/config/links";
import { fetcher } from "@/shared/lib/utils/fetcher";
import { hasCompletedToday } from "@/shared/lib/utils/hasCompletedToday";
import { useDashboardStore, DateType } from "@/templates/DashboardPage";
import { Habit } from "@prisma/client";
import useSWR, { SWRConfig } from "swr";

function OverviewContent() {
  const [dateType] = useDashboardStore((state) => [state.dateType]);

  const { data } = useSWR(
    `${links.dashboardOverview}?dateType=${dateType}`,
    fetcher
  );

  if (!data) {
    return null;
  }

  const { projectAmount, totalTaskAmount, tasks, habits, challenges } = data;

  const taskTrees = mapTasksIntoHierarchy(tasks);

  return (
    <>
      {dateType === DateType.Today ? (
        <>
          {taskTrees.length ? (
            <section className="mt-8 relative">
              <h3 className="font-poppins font-semibold text-xl text-white">
                {`Today's Tasks`}
              </h3>
              <div
                className="mt-5 flex flex-col gap-4"
                style={{ maxHeight: 272, overflowY: "scroll" }}
              >
                {taskTrees.map((task) => (
                  <TaskCard key={task.id} {...task} withoutDeadline />
                ))}
              </div>
            </section>
          ) : null}

          {habits.length ? (
            <section className="mt-8">
              <h3 className="font-poppins font-semibold text-xl text-white">
                Habits
              </h3>
              <div className="flex align-center mt-5 gap-4 flex-wrap">
                {habits.map((habit: Habit) => (
                  <HabitCard
                    {...habit}
                    hasCompletedToday={hasCompletedToday(habit)}
                    key={habit.id}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {challenges.length ? (
            <section className="mt-8">
              <h3 className="font-poppins font-semibold text-xl text-white">
                Challenges
              </h3>
              <div className="flex flex-col mt-5 gap-4">
                {challenges.map((challenge: any) => (
                  <ChallengeCard {...challenge} key={challenge.id} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      ) : null}

      {dateType === DateType.Week ? <DailyTasks tasks={tasks} /> : null}

      {dateType === DateType.Month ? <DailyTasks tasks={tasks} /> : null}
    </>
  );
}

export default function Overview({ initialData }: { initialData: any }) {
  const [dateType] = useDashboardStore((state) => [state.dateType]);

  const key = `${links.dashboardOverview}?dateType=${dateType}`;

  return (
    <SWRConfig
      value={{
        fallback: {
          [key]: initialData,
        },
      }}
    >
      <OverviewContent />
    </SWRConfig>
  );
}
