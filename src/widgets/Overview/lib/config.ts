import TotalTask from "~/public/total_task.svg";
import TotalHabit from "~/public/total_habit.svg";
import TotalProject from "~/public/total_project.svg";

export const CARDS_CONFIG = {
  Task: {
    icon: TotalTask,
    color: "#FFDD72",
    to: "/tasks",
    title: "Total Task",
  },
  Project: {
    icon: TotalProject,
    color: "#FBA3FF",
    to: "/projects",
    title: "Total Project",
  },
  Habit: {
    icon: TotalTask,
    color: "#FF968E",
    to: "/tasks/overdue",
    title: "Total overdue",
  },
};
