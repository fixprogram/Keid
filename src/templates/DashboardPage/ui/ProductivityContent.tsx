// import { FC } from "react";

// import { getData } from "@/app/dashboard/productivity/productivity";
// import { useQuery } from "@tanstack/react-query";
// import { DateType, useDashboardStore } from "../model/useDashboardStore";
// import { DailyProgress } from "@/features/DailyProgress";
// import { WeeklyActivity } from "@/features/WeeklyActivity";
// import { WeeklyStatistics } from "@/features/WeeklyStatistics";

// export const ProductivityContent: FC = () => {
//   const [dateType] = useDashboardStore((state) => [state.dateType]);

//   const { data, isLoading } = useQuery({
//     queryKey: ["dashboard", "productivity", dateType],
//     queryFn: () => getData(dateType),
//   });

//   if (isLoading || !data) {
//     return <div className="text-white">Loading...</div>;
//   }

//   if (dateType === DateType.Today) {
//     return <DailyProgress {...data} />;
//   }

//   if (dateType === DateType.Week) {
//     return (
//       <>
//         <WeeklyActivity {...data.activity} />
//         <WeeklyStatistics {...data} />
//       </>
//     );
//   }

//   return <div className="text-deactive">Empty for now</div>;
// };
