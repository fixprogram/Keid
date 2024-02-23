import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC } from "react";

import styles from "./TaskCard.module.css";

type CompletedTaskPropsType = {
  link: string;
  title: string;
  isExpired: boolean;
  completed: string;
  isStarred?: boolean;
  projectTitle?: string;
};

export const CompletedStatisticsTask: FC<CompletedTaskPropsType> = ({
  link,
  title,
  isExpired,
  completed,
  isStarred = false,
  projectTitle,
}) => {
  return (
    <Link href={link} className={styles.CompletedStatisticsLink}>
      <div className={styles.CompletedStatisticsTask}>
        {isStarred ? (
          <div className="absolute top-3 left-3">
            <Icon name="star-sm" width={8} height={8} />
          </div>
        ) : null}

        <div className="min-w-[40px]">
          <Icon name="completed" width={40} height={40} />
        </div>

        <div
          className="flex flex-col justify-center align-center"
          style={{ width: "calc(100% - 125px)" }}
        >
          {projectTitle ? (
            <div className="relative flex">
              {isStarred ? (
                <div className="absolute top-0 left-0">
                  <Icon name="starred" width={12} height={12} />
                </div>
              ) : null}
              <b
                style={{
                  // color: taskStyle.background,
                  fontSize: 10,
                  lineHeight: "14px",
                  marginLeft: "18px",
                }}
              >
                {projectTitle}
              </b>
            </div>
          ) : null}
          <b className={`text-lg text-white font-bold ${styles.taskTitle}`}>
            {title}
          </b>
        </div>

        <p
          className={`text-smm font-medium ml-auto ${
            isExpired ? "text-expired" : "text-green"
          }`}
        >
          {completed}
        </p>
      </div>
    </Link>
  );
};
