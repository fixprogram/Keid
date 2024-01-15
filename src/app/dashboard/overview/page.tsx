import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/app/lib/prisma/db.server";
import getUserProjectNames from "@/app/lib/data/user/getUserProjectNames";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
// import Overview from "./overview";
import { getThisWeekTasks } from "@/templates/DashboardPage/api/getThisWeekTasks";
import { getServerUser } from "@/app/lib/getServerUser";
import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { getTodayTasks } from "@/templates/DashboardPage/api/getTodayTasks";
import { getThisMonthTasks } from "@/templates/DashboardPage/api/getThisMonthTasks";
import { Challenge, CommentType, Member, Task } from "@prisma/client";
// import { transformChallenge } from "@/templates/DashboardPage/lib/transformChallenge";
import { isDateToday } from "@/shared/lib/utils/isDateToday";
import { getTodayHabits } from "@/templates/DashboardPage/api/getTodayHabits";
import { mapAndSortTasks } from "@/templates/DashboardPage/lib/mapAndSortTasks";
import { getTodayChallenges } from "@/templates/DashboardPage/api/getTodayChallenges";
import { getOverviewData } from "@/server/actions";
import Layout from "@/widgets/Layout";
import { DashboardHeader } from "@/templates/DashboardPage/ui/DashboardHeader";
import { Tabs } from "@/templates/DashboardPage/ui/Tabs";
// import OverviewContent from "@/templates/DashboardPage/ui/OverviewContent";
import { Suspense } from "react";
import { DailyTasks } from "@/features/DailyTasks";
import { ChallengeCard, getIsCompletedForToday } from "@/entities/challenge";
import { mapTasksIntoHierarchy } from "@/entities/task";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { HabitCard } from "@/templates/DashboardPage/ui/HabitCard";

// export async function getData(dateType: DateType) {
//   const user = await getServerUser();

//   const userId = user.id;

//   const userProjectNames = await getUserProjectNames(userId);
//   const projects = await prisma.project.findMany({
//     where: { userId, isArchived: false },
//     select: { id: true, taskIds: true, isStarred: true },
//   });

//   const projectIDs = projects.map((projectId) => projectId.id);
//   projectIDs.push(userId);

//   let tasks: Task[] = [];

//   switch (dateType) {
//     case DateType.Today: {
//       tasks = await getTodayTasks(userId);

//       break;
//     }
//     case DateType.Week: {
//       tasks = await getThisWeekTasks(projectIDs);
//       break;
//     }
//     case DateType.Month: {
//       tasks = await getThisMonthTasks(projectIDs);
//       break;
//     }
//     default: {
//       throw new Error(`Date type ${dateType} doesn't exist`);
//     }
//   }

//   const projectAmount = userProjectNames.length;
//   const totalTasksIds: string[] = [];

//   const taskWithoutProjectIds = await prisma.task.findMany({
//     where: { projectId: userId },
//     select: { id: true },
//   });
//   taskWithoutProjectIds.forEach((task) => {
//     totalTasksIds.push(task.id);
//   });
//   projects.forEach((project) => {
//     totalTasksIds.push(...project.taskIds);
//   });

//   const totalTaskAmount = totalTasksIds.length;

//   const overdueTasks = await prisma.task.findMany({
//     where: {
//       id: { in: totalTasksIds },
//       deadline: { lt: new Date().setHours(23, 59, 59, 999) },
//       AND: { completed: 0 },
//       NOT: { deadline: 0 },
//     },
//     select: { id: true },
//   });

//   const overdueTaskAmount = overdueTasks.length;

//   // TODO: Analyze which approach is more efficient

//   // const weeklyActivityData = await getWeeklyActivityData(userId);
//   // const habits = await getTodayHabits(userId);
//   // const challenges = await getTodayChallenges(userId);

//   const [weeklyActivityData, habits, challenges] = await Promise.all([
//     getWeeklyActivityData(userId),
//     getTodayHabits(userId),
//     getTodayChallenges(userId),
//   ]);
//   //

//   return {
//     projectAmount,
//     overdueTaskAmount,
//     totalTaskAmount,
//     tasks: mapAndSortTasks(tasks, projects),
//     userName: user.name,
//     projects: weeklyActivityData.projects,
//     activityFeed: weeklyActivityData.activityFeed,
//     habits,
//     challenges,
//   };
// }

export const revalidate = 3600;

async function OverviewContent() {
  // const [dateType, scrollY, setScrollY] = useDashboardStore((state) => [
  //   state.dateType,
  //   state.scrollY,
  //   state.setScrollY,
  // ]);

  // const { data, isLoading } = useQuery({
  //   queryKey: ["dashboard", "overview", dateType],
  //   queryFn: () => getOverviewData(dateType),
  // });

  // useEffect(() => {
  //   if (scrollY) {
  //     window.scrollTo(0, scrollY);
  //     setScrollY(0);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const dateType = DateType.Today;

  const data = await getOverviewData(dateType);

  const { projectAmount, totalTaskAmount, tasks, habits, challenges } = data;

  const taskTrees = mapTasksIntoHierarchy(tasks);

  // console.log("data: ", data);

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

      {/* {dateType === DateType.Week ? <DailyTasks tasks={tasks} /> : null}

      {dateType === DateType.Month ? <DailyTasks tasks={tasks} /> : null} */}

      {/* <Cards
        cards={[
          { type: CardType.Task, amount: totalTaskAmount },
          // { type: CardType.Habit, amount: overdueTaskAmount },
          { type: CardType.Project, amount: projectAmount },
        ]}
      /> */}
    </>
  );
}

export default async function Page() {
  // const dateType = DateType.Today;

  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(["dashboard", "overview", dateType], () =>
  //   getOverviewData(dateType)
  // );
  // const dehydratedState = dehydrate(queryClient);

  return (
    // <Hydrate state={dehydratedState}>
    <Layout>
      <DashboardHeader />

      <Tabs />

      <Suspense fallback={null}>
        {/* <OverviewContent data={data} /> */}
        <OverviewContent />
      </Suspense>
    </Layout>
    // </Hydrate>
  );
}
