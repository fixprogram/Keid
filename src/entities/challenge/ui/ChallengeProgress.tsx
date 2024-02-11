import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { FC } from "react";

interface ChallengeProgressPropsType {
  style: string;
  repeats: number;
  streak: number;
}

export const ChallengeProgress: FC<ChallengeProgressPropsType> = ({
  style,
  repeats,
  streak,
}) => {
  const challengeStyle = projectStyles[style as ProjectStyleKey];

  const progress = Math.floor((streak / repeats) * 100);

  return (
    <div className="flex items-center">
      <div
        className="h-[10px] w-10 bg-deactive rounded-full"
        style={{ transform: "rotate(-90deg)", marginLeft: -15 }}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: challengeStyle.gradient,
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="flex flex-col" style={{ marginLeft: -3 }}>
        <b style={{ color: challengeStyle.background }}>
          {streak}/{repeats}
        </b>
        <span style={{ color: challengeStyle.background }}>days</span>
      </div>
    </div>
  );
};
