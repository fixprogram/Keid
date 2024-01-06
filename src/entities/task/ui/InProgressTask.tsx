import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";
import { FC, useState } from "react";

import styles from "./TaskCard.module.css";
import { TaskCard } from "./TaskCard";

type InProgressTaskPropsType = {
  link: string;
  title: string;
  deadline: string | null;
  style: string;
  progress: number;
  isStarred?: boolean;
  projectTitle?: string;
  subtasks: any[];
  parentOpened: boolean;
};

export const InProgressTask: FC<InProgressTaskPropsType> = ({
  link,
  title,
  deadline,
  style,
  progress,
  isStarred = false,
  projectTitle = "",
  subtasks,
  parentOpened = false,
}) => {
  const [isOpened, setOpened] = useState(false);
  const taskStyle = projectStyles[style as ProjectStyleKey];

  const subtasksTotal = subtasks.length;

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`${
          isOpened || parentOpened ? "bg-background1" : "bg-background2"
        } 
        ${isOpened && !parentOpened ? "border border-deactive" : ""}
        ${
          parentOpened
            ? "border-t border-deactive rounded-b-xl rounded-l-xl rounded-t-none"
            : " rounded-xl"
        }`}
      >
        <div className="flex gap-5 p-5">
          <RoundProgressBar
            id={link}
            progress={progress}
            stopColors={taskStyle.progressGradient}
            isOnPage={isOpened || parentOpened}
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
                    display: "block",
                  }}
                >
                  {projectTitle}
                </Link>
              </div>
            ) : null}
            <Link
              href={link}
              className={`text-lg text-white font-semibold ${styles.taskTitle}`}
            >
              {title}
            </Link>
          </div>

          <div
            className="flex flex-col justify-between align-top"
            style={{ marginLeft: "auto" }}
          >
            {deadline ? (
              <p className="text-smm font-medium text-white">{deadline}</p>
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
          ? subtasks.map((subtask) => (
              <TaskCard key={subtask.id} {...subtask} parentOpened={isOpened} />
            ))
          : null}
      </div>
    </div>
  );
};
