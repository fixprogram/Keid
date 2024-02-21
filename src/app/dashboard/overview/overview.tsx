"use client";

import { ChallengeCard } from "@/entities/challenge";
import { HabitCard } from "@/entities/habit";
import { TasksBlock } from "@/shared/components/TasksBlock";
import { links } from "@/shared/config/links";
import { fetcher } from "@/shared/lib/utils/fetcher";
import { hasCompletedToday } from "@/shared/lib/utils/hasCompletedToday";
import { useDashboardStore } from "@/templates/DashboardPage";
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

  const { tasks, weekTasks, monthTasks, habits, challenges } = data;

  return (
    <>
      {tasks.length ? <TasksBlock tasks={tasks} title="Today's Tasks" /> : null}

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

      {weekTasks.length ? (
        <TasksBlock tasks={weekTasks} title="Week's Tasks" />
      ) : null}

      {monthTasks.length ? (
        <TasksBlock tasks={monthTasks} title="Month's Tasks" />
      ) : null}
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
