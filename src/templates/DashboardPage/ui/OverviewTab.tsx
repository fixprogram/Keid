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
import { HabitCard } from "@/entities/habit/ui/HabitCard";
import { List } from "@/shared/ui/List";
import { HabitCard2 } from "@/entities/habit/ui/HabitCard2";
import Tabs from "./Tabs";
import { ChallengeCard } from "@/entities/challenge";

export const OverviewTab: FC = () => {
  const [dateType, dashboardData, setData] = useDashboardStore((state) => [
    state.dateType,
    state.data,
    state.setData,
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

  return (
    <Layout>
      <DashboardHeader />

      <Tabs />

      {dateType === DateType.Today ? (
        <>
          <DailyTasks tasks={tasks} />
          <section
            className="flex align-center mt-8 gap-10"
            style={{ overflowX: "scroll" }}
          >
            {habits.map((habit) => (
              <HabitCard2
                link={`/habits/${habit.id}`}
                {...habit}
                key={habit.id}
              />
            ))}
          </section>

          <section className="flex flex-col mt-8 gap-4">
            {challenges.map((challenge) => (
              <ChallengeCard {...challenge} key={challenge.id} />
            ))}
          </section>
        </>
      ) : null}

      {dateType === DateType["This week"] ? <WeekTasks tasks={tasks} /> : null}

      {dateType === DateType["This month"] ? (
        <div style={{ color: "wheat" }}>Empty for now</div>
      ) : null}

      <Cards
        cards={[
          { type: CardType.Task, amount: totalTaskAmount },
          { type: CardType.Habit, amount: overdueTaskAmount },
          { type: CardType.Project, amount: projectAmount },
        ]}
      />
    </Layout>
  );
};
