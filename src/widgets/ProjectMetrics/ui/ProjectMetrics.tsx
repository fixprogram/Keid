import { Metric } from "@/entities/metric";
import { AddProjectMetrics } from "@/features/AddProjectMetrics";
import { Metric as MetricType } from "@prisma/client";
import { FC } from "react";

interface ProjectMetricsPropsType {
  metrics: MetricType[];
}

export const ProjectMetrics: FC<ProjectMetricsPropsType> = ({ metrics }) => {
  if (metrics.length === 0) {
    return (
      <section className="mt-8">
        <h2 className="text-white">Metrics</h2>

        <p className="my-5">No metrics for this project</p>

        <AddProjectMetrics />
      </section>
    );
  }

  return (
    <section className="mt-8">
      <h2 className="text-white">Metrics</h2>
      {metrics.map((metric, index) => (
        <Metric key={`${metric.title}-${index}`} {...metric} />
      ))}
    </section>
  );
};
