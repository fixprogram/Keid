import ProgressBar from "@/features/WeeklyProgress/ui/ProgressBar";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";
import { FC } from "react";

type HabitCardPropsType = {
  link: string;
  title: string;
  //   deadline: string | null;
  style: string;
  streak: number;
  repeats: number;
  //   isStarred?: boolean;
};

export const HabitCard2: FC<HabitCardPropsType> = ({
  link,
  title,
  style,
  streak,
  repeats,
  //   isStarred = false,
}) => {
  const taskStyle = projectStyles[style as ProjectStyleKey];

  //   console.log("taskStyle: ", taskStyle.progressGradient);
  const progress = Math.floor((streak / repeats) * 100);
  return (
    <Link href={link}>
      <div className="min-w-[80px] h-[70px] rounded-full grid place-items-center relative">
        <div className="absolute">
          <b
            className="text-lg text-white font-semibold mt-4"
            style={{ fontSize: 14 }}
          >
            {progress}%
          </b>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="70px"
          height="70px"
          style={{ transform: "rotate(90deg" }}
        >
          <defs>
            <linearGradient id={`ProgressBar-${link}`}>
              <stop
                offset="0%"
                stopColor={taskStyle.progressGradient.firstStopColor}
              />
              {/* <stop offset="0%" stopColor="#BBFFE7" /> */}
              <stop
                offset="70%"
                stopColor={taskStyle.progressGradient.secondStopColor}
              />
              {/* <stop offset="70%" stopColor="#86FFCA" /> */}
            </linearGradient>
          </defs>

          <circle
            cx={35}
            cy={35}
            r={32}
            strokeLinecap="round"
            style={{
              fill: "none",
              stroke: "rgba(94, 98, 114, .5)",
              strokeWidth: "6px",
            }}
          />
          {progress ? (
            <circle
              cx={35}
              cy={35}
              r={32}
              strokeLinecap="round"
              style={{
                fill: "none",
                stroke: `url(#ProgressBar-${link})`,
                strokeWidth: "6px",
                strokeDasharray: 184,
                strokeDashoffset: `calc(180 - ${(progress * 184) / 100})`,
              }}
            />
          ) : null}
        </svg>
      </div>

      <b className="text-lg text-white font-semibold mt-4 block max-w-[80px] text-center">
        {title}
      </b>
    </Link>
  );
};
