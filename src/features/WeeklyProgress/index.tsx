import { projectStyles } from "@/shared/config/projectStyles";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import { Task } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import ProgressBar from "./ui/ProgressBar";

interface WeeklyProgressPropsType {
  tasks: Task[];
}

export const WeeklyProgress: FC<WeeklyProgressPropsType> = ({ tasks }) => {
  const totalTaskAmount = tasks.length;
  const completedTaskAmount = tasks.filter((task) => task.completed).length;

  const progress = Math.floor((completedTaskAmount / totalTaskAmount) * 100);

  return (
    <section
      className="mt-8 pt-5 pr-6 pb-3 pl-5 flex justify-between bg-deactive"
      style={{
        filter: "drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.25))",
        background: "#262A34",
        borderRadius: "20px",
      }}
    >
      <div style={{ maxWidth: "45%" }}>
        <div className="flex flex-col gap-3">
          <p className="text-deactive text-sm">Weekly Progress</p>
          <div className="flex gap-2">
            <div
              className="h-[24px] px-2 rounded-full"
              style={{
                background: "linear-gradient(180deg, #9ADB7F 0%, #6EA95C 100%)",
              }}
            >
              <b className="font-base text-white font-bold">
                {completedTaskAmount}/{totalTaskAmount}
              </b>
            </div>
            <b className="text-white text-bold text-lg">tasks</b>
          </div>

          <p
            className="text-deactive"
            style={{ fontSize: 13, lineHeight: "20px" }}
          >
            You marked {completedTaskAmount}/{totalTaskAmount} tasks are done
          </p>
        </div>
        <Link
          href="tasks"
          className="block w-[95px] mt-4 font-bold text-white text-base py-2 px-5 bg-secondary"
          style={{
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.5)",
            borderRadius: "24px",
          }}
        >
          All Task
        </Link>
      </div>

      <ProgressBar progress={progress} />
    </section>
  );
};
