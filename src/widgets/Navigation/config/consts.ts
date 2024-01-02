import { RepeatsOptionType } from "./types";

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

export const INITIAL_POPUP_CHALLENGE_STATE = {
  title: "",
  style: "01",
  error: "",
  isStyleListOpened: false,
  deadline: Date.now(),
  isWithDeadline: true,
  isCalendarOpened: false,
  repeatsAmount: 1,
};

export const NAV_LINKS = [
  {
    iconName: "dashboard",
    iconSize: { width: 20, height: 20 },
    alt: "Dashboard page",
    to: "/dashboard/overview",
  },
  {
    iconName: "goals",
    iconSize: { width: 19, height: 20 },
    alt: "Projects page",
    to: "/projects",
  },
  {
    iconName: "notification",
    iconSize: { width: 20, height: 22 },
    alt: "Profile page",
    to: "/profile",
  },
  {
    iconName: "search",
    iconSize: { width: 21, height: 21 },
    alt: "Search page",
    to: "/search",
  },
];
