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
    <div className="h-1 w-full bg-deactive rounded-full">
      <div
        className="h-full rounded-full"
        style={{
          background: challengeStyle.gradient,
          width: `${progress}%`,
        }}
      />
    </div>
  );
};
