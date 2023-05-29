import { RepeatsOptionType } from "../model/types";

export const REPEATS_OPTIONS: RepeatsOptionType[] = ["Once", "Everyday"];

export const INITIAL_POPUP_PROJECT_STATE = {
  projectName: "",
  projectStyle: "01",
  error: "",
  isStyleListOpened: false,
};

export const INITIAL_POPUP_HABIT_STATE = {
  habitName: "",
  habitStyle: "01",
  error: "",
  isStyleListOpened: false,
};

export const INITIAL_POPUP_TASK_STATE = {
  taskName: "",
  taskStyle: "01",
  error: "",
  isStyleListOpened: false,
  deadline: Date.now(),
  isWithDeadline: true,
  isCalendarOpened: false,
  activeProject: {
    title: "No project",
    style: "01",
  },
  activeRepeatsOption: REPEATS_OPTIONS[0],
};
