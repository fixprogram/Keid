import { Project, Task } from "@prisma/client";
import { FC } from "react";
import { StatisticProject, TaskType } from "./ui/StatisticProject";

type ProjectType = {
  style: string;
  id: string;
  title: string;
  progressChange: number;
  currentProgress: number;
  tasks: TaskType[];
};

interface WeeklyStatisticsPropsType {
  projects: ProjectType[];
}

export const WeeklyStatistics: FC<WeeklyStatisticsPropsType> = ({
  projects,
}) => {
  return (
    <ul className="flex flex-col gap-6 mt-5">
      {projects.map((project) => (
        <StatisticProject key={project.id} {...project} />
      ))}
    </ul>
  );
};
