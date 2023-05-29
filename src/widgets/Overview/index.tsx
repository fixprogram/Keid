// // import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import { WeekTasks } from "@/features/WeekTasks";
// import Cards from "./components/Cards";
// import Filter from "./components/Filter";

// export default function Overview({
//   totalTaskAmount,
//   overdueTaskAmount,
//   projectAmount,
// }) {
//   // const projectAmount = useAppSelector((state) => state.overview.projectAmount);
//   // const totalTaskAmount = useAppSelector(
//   //   (state) => state.overview.totalTaskAmount
//   // );
//   // const overdueTaskAmount = useAppSelector(
//   //   (state) => state.overview.overdueTaskAmount
//   // );

//   return (
//     <>
//       <Filter />

//       <WeekTasks />

//       <Cards
//         cards={[
//           { type: "Task", amount: totalTaskAmount },
//           { type: "Habit", amount: overdueTaskAmount },
//           { type: "Project", amount: projectAmount },
//         ]}
//       />
//     </>
//   );
// }
