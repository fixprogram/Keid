import { FC, useCallback, useState } from "react";
import { useNavigationStore } from "../model/useNavigationStore";
import { usePopupStore } from "../model/usePopupStore";
import { MetricFormItem } from "@/entities/metric";

export const PopupMetrics: FC = () => {
  const [activeProject, activeMetrics, setActiveMetrics] = usePopupStore(
    (state) => [
      state.activeProject,
      state.activeMetrics,
      state.setActiveMetrics,
    ]
  );
  const projects = useNavigationStore((state) => state.userProjects);

  const toggleActiveMetric = useCallback(
    (title: string) => {
      const arrayIndex = activeMetrics.indexOf(title);

      console.log("arrayIndex: ", arrayIndex);

      if (arrayIndex !== -1) {
        return setActiveMetrics(
          activeMetrics.filter((_, i) => i !== arrayIndex)
        );
      }

      return setActiveMetrics([...activeMetrics, title]);
    },
    [activeMetrics, setActiveMetrics]
  );

  const projectMetrics = projects.find(
    (project) => project.title === activeProject.title
  )?.metrics;

  if (!projectMetrics || projectMetrics.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <b className="text-white">Metrics</b>

      <div className="flex gap-4 mt-4">
        {projectMetrics.map(({ title }, index) => (
          <MetricFormItem
            key={`${title}-${index}`}
            title={title}
            isActive={activeMetrics.indexOf(title) !== -1}
            toggleActive={() => {
              toggleActiveMetric(title);
            }}
          />
        ))}
      </div>
    </div>
  );
};
