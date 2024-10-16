"use client";

import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";
import { FC, useState } from "react";

import styles from "./TaskCard.module.css";
import { TaskCard } from "./TaskCard";
import { CompleteButton } from "@/shared/ui/CompleteButton";
import { useComplete } from "../models/useComplete";
import { Task } from "@prisma/client";

type InProgressTaskPropsType = {
  id: string;
  link: string;
  title: string;
  deadline: string | null;
  style: string;
  progress: number;
  isStarred?: boolean;
  projectTitle?: string;
  subtasks: Task[];
  parentOpened: boolean;
};

export const InProgressTask: FC<InProgressTaskPropsType> = ({
  id,
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

  const { handleComplete, isLoadingComplete } = useComplete(id);

  return (
    <div className={`flex flex-col gap-4`}>
      <div
        className={`${
          isOpened || parentOpened ? "bg-background1" : "bg-background2"
        } 
        ${isOpened && !parentOpened ? "border border-deactive" : ""}
        ${
          parentOpened
            ? "border-t border-deactive rounded-b-xl rounded-l-xl rounded-t-none"
            : " rounded-xl"
        }
        `}
      >
        <div
          className={`flex gap-4 p-3 ${
            !projectTitle.length ? "items-center" : ""
          }`}
        >
          <form action={handleComplete} style={{ height: 40 }}>
            <CompleteButton
              // onClick={handleComplete}
              isLoading={isLoadingComplete}
            />
          </form>

          <div
            className="flex flex-col justify-between align-center"
            style={{ width: "calc(100% - 125px)" }}
          >
            {projectTitle ? (
              <div className="relative flex">
                {/* {isStarred ? (
                  <div className="absolute top-0 left-0">
                    <Icon name="starred" width={12} height={12} />
                  </div>
                ) : null} */}
                <Link
                  href={link}
                  style={{
                    color: taskStyle.background,
                    fontSize: 10,
                    lineHeight: "14px",
                    // marginLeft: isStarred ? "18px" : "0",
                    display: "block",
                  }}
                >
                  {projectTitle}
                </Link>
              </div>
            ) : null}
            <Link
              href={link}
              className={`text-lg text-white font-bold ${styles.taskTitle}`}
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
