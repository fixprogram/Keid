import { FC } from "react";
import { Day } from "../Activity/models";
import BackgroundTable from "../Activity/ui/BackgroundTable";
import DaysList from "../Activity/ui/DaysList";
import ActivityStats from "../Activity/ui/ActivityStats";
import ActivityElements from "../Activity/ui/ActivityElements";

export interface WeeklyActivityPropsType {
  days: Day[];
  allTasks: number;
  allProjects: number;
  maxActivity: number;
}

export const WeeklyActivity: FC<WeeklyActivityPropsType> = ({
  days,
  allTasks,
  allProjects,
  maxActivity,
}) => {
  return (
    <section className="rounded-[20px] bg-background2 p-5 relative mt-4">
      <p className="text-deactive">Activity in the last 7 Days</p>

      <div className="flex justify-between flex-wrap mt-5">
        <BackgroundTable />

        <DaysList days={days} maxActivity={maxActivity} />

        <ActivityStats maxActivity={maxActivity} />

        <ActivityElements allTasks={allTasks} allProjects={allProjects} />
      </div>
    </section>
  );
};
