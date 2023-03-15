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
    icon: TotalHabit,
    color: "#A5F59C",
    to: "/habits",
    title: "Total Habit",
  },
};
