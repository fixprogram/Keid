"use client";

import { getIsCompletedForToday, ChallengeCard } from "@/entities/challenge";
import { mapTasksIntoHierarchy } from "@/entities/task";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { DailyTasks } from "@/features/DailyTasks";
import { links } from "@/shared/config/links";
import { fetcher } from "@/shared/lib/utils/fetcher";
import { useDashboardStore, DateType } from "@/templates/DashboardPage";
import { HabitCard } from "@/templates/DashboardPage/ui/HabitCard";
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
          {/* <DailyTasks tasks={tasks} /> */}
          <section className="mt-8 relative">
            <h3 className="font-poppins font-semibold text-xl text-white">
              Tasks
            </h3>
            {taskTrees.length ? (
              <section
                className="mt-4 flex flex-col gap-4"
                style={{ maxHeight: 272, overflowY: "scroll" }}
              >
                {taskTrees.map((task) => (
                  <TaskCard key={task.id} {...task} withoutDeadline />
                ))}
              </section>
            ) : null}
          </section>

          <section className="mt-8">
            <h3 className="font-poppins font-semibold text-xl text-white">
              Habits
            </h3>
            <section
              className="flex align-center mt-4 gap-4"
              style={{ overflowX: "scroll" }}
            >
              {habits.map((habit: any) => (
                <HabitCard
                  link={`/habits/${habit.id}`}
                  {...habit}
                  isCompletedForToday={getIsCompletedForToday(habit)}
                  key={habit.id}
                />
              ))}
            </section>
          </section>

          <section className="mt-8">
            <h3 className="font-poppins font-semibold text-xl text-white">
              Challenges
            </h3>
          </section>
          <section className="flex flex-col mt-4 gap-4">
            {challenges.map((challenge: any) => (
              <ChallengeCard {...challenge} key={challenge.id} />
            ))}
          </section>
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
