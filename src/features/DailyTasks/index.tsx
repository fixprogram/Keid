import { HabitCard } from "@/entities/habit/ui/HabitCard";
import { List } from "@/shared/ui/List";
import { Habit, Task } from "@prisma/client";
import { FC, useState } from "react";

interface DailyTasksPropsType {
  tasks: Habit[];
}

export const DailyTasks: FC<DailyTasksPropsType> = ({ tasks }) => {
  const [isOpened, setOpened] = useState(false);
  const completedTasks = tasks.filter((task) => task.completed);
  const tasksAmount = tasks.length;
  const completedTaskAmount = completedTasks.length;

  const filteredTasks = tasks.filter((task) => !task.completed);

  return (
    <section
      className="p-5 mt-8"
      style={{
        backgroundColor: isOpened ? "inherit" : "#FF968E",
        borderRadius: "20px",
        border: isOpened ? "4px solid #FF968E" : "none",
      }}
    >
      <div
        className={`flex justify-between ${
          isOpened ? "items-center" : "items-start"
        }`}
      >
        <div>
          <b
            className={`font-poppins text-xl ${
              isOpened ? "text-white" : "text-active"
            }`}
          >
            Daily tasks
          </b>

          {!isOpened ? (
            <p className="text-base text-active font-medium">
              Start from this task
            </p>
          ) : null}
        </div>

        <div
          className={`text-sm py-1 px-3 ${
            isOpened ? "text-white" : "text-active"
          } font-bold`}
          style={{
            border: `1.5px solid ${isOpened ? "#fff" : "#200745"}`,
            borderRadius: "20px",
          }}
          onClick={() => setOpened(!isOpened)}
        >
          {completedTaskAmount}/{tasksAmount}
        </div>
      </div>

      {filteredTasks.length ? (
        <div className="mt-4">
          {isOpened ? (
            <List>
              {filteredTasks.map((task) => (
                <HabitCard link={`habits/${task.id}`} key={task.id} {...task} />
              ))}
            </List>
          ) : (
            <HabitCard
              {...filteredTasks[0]}
              link={`habits/${filteredTasks[0].id}`}
            />
          )}
        </div>
      ) : null}
    </section>
  );
};
