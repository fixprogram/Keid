import { TaskType } from "@/shared/config/types";

const sortTaskByProgress = (a: TaskType, b: TaskType) => {
  if (a.progress > b.progress) {
    return -1;
  }
  if (a.progress < b.progress) {
    return 1;
  }
  return 0;
};

const sortTaskByDeadline = (a: TaskType, b: TaskType) => {
  if (a.deadline < b.deadline) {
    return -1;
  }
  if (a.deadline > b.deadline) {
    return 1;
  }
  return 0;
};

const sortTaskByCompleted = (a: TaskType, b: TaskType) => {
  if (a.completed > b.completed) {
    return -1;
  }
  if (a.completed < b.completed) {
    return 1;
  }
  return 0;
};

export const sortTasks = (tasks: TaskType[]) => {
  const favouriteTasks = tasks.filter((task) => task.isFavorite);

  const favouriteToDoTasks = favouriteTasks
    .filter((task) => task.completed === 0 && task.deadline)
    .sort(sortTaskByDeadline)
    .sort(sortTaskByProgress);
  const favouriteToDoTasksWithoutDeadline = favouriteTasks
    .filter((task) => task.completed === 0 && !task.deadline)
    .sort(sortTaskByProgress);
  const favouriteCompletedTasks = favouriteTasks.filter(
    (task) => task.completed
  );

  const completedTasks = tasks
    .filter((task) => task.completed && !task.isFavorite)
    .sort(sortTaskByCompleted);

  const toDoTasks = tasks
    .filter((task) => !task.completed && !task.isFavorite && task.deadline)
    .sort(sortTaskByDeadline)
    .sort(sortTaskByProgress);

  const toDoTasksWithoutDeadline = tasks
    .filter((task) => !task.completed && !task.isFavorite && !task.deadline)
    .sort(sortTaskByProgress);

  return [
    ...favouriteToDoTasks,
    ...favouriteToDoTasksWithoutDeadline,
    ...toDoTasks,
    ...toDoTasksWithoutDeadline,
    ...favouriteCompletedTasks,
    ...completedTasks,
  ];
};
