import { Metric } from "@/entities/metric";
import { ProjectMetrics } from "@/widgets/ProjectMetrics";
import { Metric as MetricType } from "@prisma/client";
import { FC } from "react";

interface ProjectOverviewPropsType {
  metrics: MetricType[];
}

export const ProjectOverview: FC<ProjectOverviewPropsType> = ({ metrics }) => {
  return (
    <div className="text-white">
      Project overview
      <ProjectMetrics metrics={metrics} />
    </div>
  );
};
