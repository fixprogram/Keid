import { Day } from "./models";
import ActivityElements from "./ui/ActivityElements";
import ActivityStats from "./ui/ActivityStats";
import BackgroundTable from "./ui/BackgroundTable";
import DaysList from "./ui/DaysList";

export interface ActivityProps {
  days: Day[];
  allTasks: number;
  allProjects: number;
  maxActivity: number;
}

export default function Activity({
  days,
  allTasks,
  allProjects,
  maxActivity,
}: ActivityProps) {
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
}
