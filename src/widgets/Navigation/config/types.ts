export type Project = {
  title: string;
  style: string;
};
export type RepeatsOptionType = "Once" | "Everyday";

export interface PopupProjectState {
  projectName: string;
  projectStyle: string;
  error?: string;
  isStyleListOpened: boolean;
  setProjectName: (newProjectName: string) => void;
  setProjectStyle: (newProjectStyle: string) => void;
  openStyleList: () => void;
  closeStyleList: () => void;
  resetProject: () => void;
}

export interface PopupTaskState {
  taskName: string;
  taskStyle: string;
  error?: string;
  isStyleListOpened: boolean;
  deadline: number;
  isWithDeadline: boolean;
  isCalendarOpened: boolean;
  activeProject: {
    title: string;
    style: string;
  };
  activeRepeatsOption: RepeatsOptionType;
  setTaskName: (newTaskName: string) => void;
  setTaskStyle: (newTaskStyle: string) => void;
  openStyleList: () => void;
  closeStyleList: () => void;
  toggleTaskWithDeadline: () => void;
  setTaskDeadline: (newDeadline: number) => void;
  openCalendar: () => void;
  closeCalendar: () => void;
  setTaskProject: (newProject: { title: string; style: string }) => void;
  setTaskRepeats: (newRepeatsOption: RepeatsOptionType) => void;
  resetTask: () => void;
}

export interface PopupHabitState {
  habitName: string;
  habitStyle: string;
  error?: string;
  isStyleListOpened: boolean;
  setHabitName: (newHabitName: string) => void;
  setHabitStyle: (newHabitStyle: string) => void;
  openStyleList: () => void;
  closeStyleList: () => void;
  resetHabit: () => void;
}
