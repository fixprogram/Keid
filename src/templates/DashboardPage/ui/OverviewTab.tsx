import { getData } from "@/app/dashboard/overview/overview";
import { DailyTasks } from "@/features/DailyTasks";
import { WeekTasks } from "@/features/WeekTasks";
import Cards from "@/widgets/Overview/ui/Cards";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { useDashboardStore, DateType } from "../model/useDashboardStore";
import { DashboardHeader } from "./DashboardHeader";
import Layout from "@/widgets/Layout";
import { CardType } from "@/widgets/Overview/config/types";
import { Tabs } from "./Tabs";
import { ChallengeCard, getIsCompletedForToday } from "@/entities/challenge";
import { isDateToday } from "@/shared/lib/utils/isDateToday";
import { CommentType } from "@prisma/client";
import { usePathname } from "next/navigation";
import { HabitCard } from "./HabitCard";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";

export const OverviewTab: FC = () => {
  const userId = useNavigationStore((state) => state.userId);
  const [dateType, dashboardData, scrollY, setData, setScrollY] =
    useDashboardStore((state) => [
      state.dateType,
      state.overviewData,
      state.scrollY,
      state.setOverviewData,
      state.setScrollY,
    ]);

  const { data } = useQuery({
    queryKey: ["dashboard", "overview", dateType],
    queryFn: () => getData(dateType),
  });

  const {
    overdueTaskAmount,
    projectAmount,
    totalTaskAmount,
    tasks,
    habits,
    challenges,
  } = dashboardData;

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  useEffect(() => {
    if (scrollY) {
      window.scrollTo(0, scrollY);
      setScrollY(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <DashboardHeader />

      <Tabs />

      {dateType === DateType.Today ? (
        <>
          <DailyTasks tasks={tasks} />
          <section className="mt-8">
            <h3 className="font-poppins font-semibold text-xl text-white">
              Habits
            </h3>
            <section
              className="flex align-center mt-4 gap-10"
              style={{ overflowX: "scroll" }}
            >
              {habits.map((habit) => (
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
            {challenges.map((challenge) => (
              <ChallengeCard {...challenge} key={challenge.id} />
            ))}
          </section>
        </>
      ) : null}

      {dateType === DateType.Week ? <WeekTasks tasks={tasks} /> : null}

      {dateType === DateType.Month ? <DailyTasks tasks={tasks} /> : null}

      <Cards
        cards={[
          { type: CardType.Task, amount: totalTaskAmount },
          // { type: CardType.Habit, amount: overdueTaskAmount },
          { type: CardType.Project, amount: projectAmount },
        ]}
      />
    </Layout>
  );
};
