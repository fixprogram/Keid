// "use client";

// import { FC, useEffect } from "react";
// // import { getData } from "@/app/dashboard/overview/overview";
// import { DateType, useDashboardStore } from "../model/useDashboardStore";
// import { useQuery } from "@tanstack/react-query";
// import { DailyTasks } from "@/features/DailyTasks";
// import { HabitCard } from "./HabitCard";
// import { ChallengeCard, getIsCompletedForToday } from "@/entities/challenge";
// import Cards from "@/widgets/Overview/ui/Cards";
// import { CardType } from "@/widgets/Overview/config/types";
// import { Challenge, Habit, Task } from "@prisma/client";
// import { TaskType } from "@/shared/config/types";
// import { getOverviewData } from "@/server/actions";

// type ChallengeType = Challenge & { isCompletedForToday: boolean };

// type DataType = {
//   tasks: TaskType[];
//   habits: Habit[];
//   challenges: ChallengeType[];
//   totalTaskAmount: number;
//   projectAmount: number;
//   overdueTaskAmount: number;
// };

// export default function OverviewContent({ data }: { data: any }) {
//   const [dateType, scrollY, setScrollY] = useDashboardStore((state) => [
//     state.dateType,
//     state.scrollY,
//     state.setScrollY,
//   ]);

//   // const { data, isLoading } = useQuery({
//   //   queryKey: ["dashboard", "overview", dateType],
//   //   queryFn: () => getOverviewData(dateType),
//   // });

//   useEffect(() => {
//     if (scrollY) {
//       window.scrollTo(0, scrollY);
//       setScrollY(0);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const { projectAmount, totalTaskAmount, tasks, habits, challenges } = data;

//   return (
//     <>
//       {dateType === DateType.Today ? (
//         <>
//           <DailyTasks tasks={tasks} />
//           <section className="mt-8">
//             <h3 className="font-poppins font-semibold text-xl text-white">
//               Habits
//             </h3>
//             <section
//               className="flex align-center mt-4 gap-4"
//               style={{ overflowX: "scroll" }}
//             >
//               {habits.map((habit: Habit) => (
//                 <HabitCard
//                   link={`/habits/${habit.id}`}
//                   {...habit}
//                   isCompletedForToday={getIsCompletedForToday(habit)}
//                   key={habit.id}
//                 />
//               ))}
//             </section>
//           </section>

//           <section className="mt-8">
//             <h3 className="font-poppins font-semibold text-xl text-white">
//               Challenges
//             </h3>
//           </section>
//           <section className="flex flex-col mt-4 gap-4">
//             {challenges.map((challenge: any) => (
//               <ChallengeCard {...challenge} key={challenge.id} />
//             ))}
//           </section>
//         </>
//       ) : null}

//       {dateType === DateType.Week ? <DailyTasks tasks={tasks} /> : null}

//       {dateType === DateType.Month ? <DailyTasks tasks={tasks} /> : null}

//       {/* <Cards
//         cards={[
//           { type: CardType.Task, amount: totalTaskAmount },
//           // { type: CardType.Habit, amount: overdueTaskAmount },
//           { type: CardType.Project, amount: projectAmount },
//         ]}
//       /> */}
//     </>
//   );
// }
