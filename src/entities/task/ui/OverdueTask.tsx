"use client";

import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";
import { FC, useState } from "react";
import { TaskCard } from "./TaskCard";

type OverdueTaskPropsType = {
  link: string;
  title: string;
  deadline: string | null;
  style: string;
  progress: number;
  isStarred?: boolean;
  projectTitle?: string;
  subtasks: any[];
};

export const OverdueTask: FC<OverdueTaskPropsType> = ({
  link,
  title,
  deadline,
  style,
  progress,
  isStarred = false,
  projectTitle = "",
  subtasks,
}) => {
  const [isOpened, setOpened] = useState(false);

  const taskStyle = projectStyles[style as ProjectStyleKey];

  const subtasksTotal = subtasks.length;

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-background2 p-5 flex gap-5 rounded-xl">
        <RoundProgressBar
          id={link}
          progress={progress}
          stopColors={taskStyle.progressGradient}
        />

        <div
          className="flex flex-col justify-between align-center"
          style={{ width: "calc(100% - 125px)" }}
        >
          {projectTitle ? (
            <div className="relative flex">
              {isStarred ? (
                <div className="absolute top-0 left-0">
                  <Icon name="starred" width={12} height={12} />
                </div>
              ) : null}
              <Link
                href={link}
                style={{
                  color: taskStyle.background,
                  fontSize: 10,
                  lineHeight: "14px",
                  marginLeft: isStarred ? "18px" : "0",
                }}
              >
                {projectTitle}
              </Link>
            </div>
          ) : null}
          <Link
            href={link}
            className="text-lg text-white font-semibold"
            style={{ overflowX: "hidden" }}
          >
            {title}
          </Link>
          {/* {deadline ? (
            <p
              className="text-smm font-medium"
              style={{ color: taskStyle.background }}
            >
              {deadline}
            </p>
          ) : null} */}
        </div>

        <div
          className="flex flex-col justify-between align-top"
          style={{ marginLeft: "auto" }}
        >
          {deadline ? (
            <p className="text-smm font-medium text-expired">{deadline}</p>
          ) : null}

          {subtasksTotal ? (
            <button
              type="button"
              onClick={() => setOpened((prevState) => !prevState)}
            >
              <Icon name="arrow-down" width={20} height={20} />
            </button>
          ) : null}
        </div>
      </div>
      {isOpened && subtasksTotal
        ? subtasks.map((subtask) => <TaskCard key={subtask.id} {...subtask} />)
        : null}
    </div>
  );
};
