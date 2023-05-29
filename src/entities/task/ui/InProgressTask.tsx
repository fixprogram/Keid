import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";
import { FC } from "react";

type InProgressTaskPropsType = {
  link: string;
  title: string;
  deadline: string | null;
  style: string;
  progress: number;
  isStarred?: boolean;
  projectTitle?: string;
  subtasksTotal?: number;
  subtaskCompleted?: number;
};

export const InProgressTask: FC<InProgressTaskPropsType> = ({
  link,
  title,
  deadline,
  style,
  progress,
  isStarred = false,
  projectTitle = "",
  subtasksTotal,
  subtaskCompleted,
}) => {
  const taskStyle = projectStyles[style as ProjectStyleKey];

  return (
    <Link href={link}>
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
              <b
                style={{
                  color: taskStyle.background,
                  fontSize: 10,
                  lineHeight: "14px",
                  marginLeft: isStarred ? "18px" : "0",
                }}
              >
                {projectTitle}
              </b>
            </div>
          ) : null}
          <b
            className="text-lg text-white font-semibold"
            style={{ overflowX: "hidden" }}
          >
            {title}
          </b>
        </div>

        <div
          className="flex flex-col justify-between align-top"
          style={{ marginLeft: "auto" }}
        >
          {deadline ? (
            <p
              className="text-smm font-medium text-white"
              // style={{ color: taskStyle.background }}
            >
              {deadline}
            </p>
          ) : null}

          {subtasksTotal ? (
            <div
              className={`text-white font-bold h-[20px]`}
              style={{
                fontSize: "10px",
                lineHeight: "20px",
              }}
            >
              {0}/{subtasksTotal}
            </div>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
