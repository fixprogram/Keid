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
  //   isStarred?: boolean;
};

export const HabitCard: FC<HabitCardPropsType> = ({
  link,
  title,
  style,
  streak,
  //   isStarred = false,
}) => {
  const taskStyle = projectStyles[style as ProjectStyleKey];

  return (
    <Link href={link}>
      <div className="bg-background2 p-5 flex gap-5 rounded-xl relative">
        {/* {isStarred ? (
          <div className="absolute top-3 left-3">
            <Icon name="star-sm" width={8} height={8} />
          </div>
        ) : null} */}

        {/* <RoundProgressBar
          id={link}
          progress={progress}
          stopColors={taskStyle.progressGradient}
        /> */}

        <div>
          <b className="text-white">{streak}</b>
        </div>

        {/* <div className="flex flex-col justify-center align-center"> */}
        <b className="text-lg text-white font-semibold">{title}</b>

        {/* </div> */}
      </div>
    </Link>
  );
};
