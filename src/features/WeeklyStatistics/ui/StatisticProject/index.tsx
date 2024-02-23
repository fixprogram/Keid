"use client";

import { CompletedTask } from "@/entities/task";
import { CompletedStatisticsTask } from "@/entities/task/ui/CompletedStatisticsTask";
import { links } from "@/shared/config/links";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { getDateString } from "@/shared/lib/utils/getDateString";
import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC, useState } from "react";

export type TaskType = {
  id: string;
  title: string;
  isExpired: boolean;
  completed: string;
};

interface StatisticProjectPropsType {
  style: string;
  id: string;
  title: string;
  progressChange: number;
  currentProgress: number;
  tasks: TaskType[];
}

export const StatisticProject: FC<StatisticProjectPropsType> = ({
  style,
  id,
  title,
  progressChange,
  currentProgress,
  tasks,
}) => {
  const [isOpened, setOpened] = useState(false);
  const projectStyle = projectStyles[style as ProjectStyleKey];

  return (
    <div
      className="border-[1px] border-deactive p-5 rounded-xl relative"
      key={id}
    >
      <div className="flex gap-5">
        <div
          className={`p-2 rounded-xl w-[40px] h-[40px] mt-1`}
          style={{ backgroundColor: projectStyle.background }}
        >
          <Icon name="project" width={24} height={24} />
        </div>

        <div className="flex-grow">
          <div className="flex justify-between">
            <Link
              className="text-lg text-white font-bold"
              href={`projects/${id}`}
            >
              {title}
            </Link>
            <b
              className="font-bold"
              style={{
                color: "#8CFFCD",
                fontSize: "13px",
                lineHeight: "15px",
              }}
            >
              +{progressChange}%
            </b>
          </div>

          <div className="w-full h-1 bg-white/10 rounded-full mt-3">
            <div
              className="rounded-full h-full"
              style={{
                width: `${currentProgress}%`,
                background: projectStyle.progressChangeGradient(
                  100 - (currentProgress - progressChange),
                  progressChange
                ),
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setOpened(isOpened ? false : true);
          }}
        >
          <div style={{ transform: isOpened ? "rotate(180deg)" : "" }}>
            <Icon name="arrow-down" width={16} height={16} />
          </div>
        </button>
      </div>

      {isOpened ? (
        <div className="flex flex-col gap-4 mt-6">
          {tasks.map((task) => (
            <CompletedStatisticsTask
              key={task.id}
              {...task}
              link={`tasks/${task.id}`}
              completed={getDateString(new Date(task.completed), false)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};
