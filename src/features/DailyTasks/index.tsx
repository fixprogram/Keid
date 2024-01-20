import { HabitCard } from "@/entities/habit/ui/HabitCard";
import { mapTasksIntoHierarchy } from "@/entities/task";
import { TaskCard, TaskCardType } from "@/entities/task/ui/TaskCard";
import { TaskType } from "@/shared/config/types";
import { List } from "@/shared/ui/List";
// import { TaskType } from "@/templates/DashboardPage/model/useDashboardStore";
import { Habit, Task } from "@prisma/client";
import { FC, useState } from "react";

interface DailyTasksPropsType {
  tasks: TaskType[];
}

export const DailyTasks: FC<DailyTasksPropsType> = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed);
  const tasksAmount = tasks.length;
  const completedTaskAmount = completedTasks.length;

  const taskTrees = mapTasksIntoHierarchy(tasks);

  // const uncompletedTasks = taskTrees.filter((task) => !task.completed);

  return (
    <section className="mt-8 relative">
      <h3 className="font-poppins font-semibold text-xl text-white">Tasks</h3>

      {taskTrees.length ? (
        <section
          className="mt-4 flex flex-col gap-4"
          style={{ maxHeight: 272, overflowY: "scroll" }}
        >
          {taskTrees.map((task) => (
            <TaskCard key={task.id} {...task} withoutDeadline />
          ))}
        </section>
      ) : null}
    </section>
    // <section
    //   className="mt-8 p-1 rounded-[20px] relative"
    //   style={{
    //     background:
    //       "radial-gradient(102.94% 100% at 72.83% 100%, #FFB8E0 0%, #BE9EFF 38.89%, #88C0FC 67.4%, #86FF99 100%)",
    //   }}
    // >
    //   <section className={`bg-background1 p-5 rounded-[18px]`}>
    //     <div className="flex justify-between items-center">
    //       <h3 className="font-poppins font-semibold text-xl text-white">
    //         Tasks
    //       </h3>
    //       <div
    //         className={`text-sm py-1 px-3 ${"text-white"} font-bold`}
    //         style={{
    //           border: `1.5px solid  #fff`,
    //           borderRadius: "20px",
    //         }}
    //       >
    //         {completedTaskAmount}/{tasksAmount}
    //       </div>
    //     </div>

    //     {tasks.length ? (
    //       <section
    //         className="mt-4 flex flex-col gap-4"
    //         style={{ maxHeight: 272, overflowY: "scroll" }}
    //       >
    //         {tasks.map((task) => (
    //           <TaskCard key={task.id} {...task} withoutDeadline />
    //         ))}
    //       </section>
    //     ) : null}
    //   </section>
    // </section>
  );
};
