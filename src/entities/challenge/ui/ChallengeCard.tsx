import { ProjectStyleKey, projectStyles } from "@/shared/config/projectStyles";
import Link from "next/link";
import { FC } from "react";

interface ChallengeCardPropsType {
  id: string;
  title: string;
  style: string;
  streak: number;
  repeats: number;
}

export const ChallengeCard: FC<ChallengeCardPropsType> = ({
  id,
  title,
  style,
  streak,
  repeats,
}) => {
  const progress = Math.floor((streak / repeats) * 100);

  const gradient = projectStyles[style as ProjectStyleKey].gradient;

  return (
    <Link
      href={`/challenges/${id}`}
      className="p-1 rounded-[20px] relative block"
      style={{
        background: gradient,
      }}
    >
      <section className={` p-5 rounded-[18px]`}>
        <div className={`text-active`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-poppins font-semibold text-xl">{title}</h3>
              <p className="font-medium text-base">
                {streak}/{repeats} is completed
              </p>
            </div>
          </div>

          <div className="flex gap-[25px] items-center mt-[10px]">
            <div className="h-[12px] w-[200px] bg-white rounded-[5px]">
              <div
                className="h-full"
                style={{
                  background:
                    "linear-gradient(90deg, #353843 0%, #181A20 100%)",
                  borderRadius: "5px 2px 2px 5px",
                  width: `${progress}%`,
                }}
              ></div>
            </div>
            <span className="text-active text-base font-bold">{progress}%</span>
          </div>
        </div>
      </section>
    </Link>
  );
};
