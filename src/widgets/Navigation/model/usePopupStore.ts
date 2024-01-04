import { create } from "zustand";
import { RepeatsOptionType } from "../config/types";
import { REPEATS_OPTIONS } from "../config/consts";

interface PopupStateType {
  title: string;
  style: string;
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
  repeats: number;
  points: number;
  setTitle: (newTitle: string) => void;
  setStyle: (newStyle: string) => void;
  openStyleList: () => void;
  closeStyleList: () => void;
  toggleWithDeadline: () => void;
  setDeadline: (newDeadline: number) => void;
  openCalendar: () => void;
  closeCalendar: () => void;
  setProject: (newProject: { title: string; style: string }) => void;
  setRepeatsOption: (newRepeatsOption: RepeatsOptionType) => void;
  setRepeats: (newRepeats: number) => void;
  setPoints: (newPoints: number) => void;
  reset: () => void;
}

const initialDeadline = new Date();
initialDeadline.setHours(23, 59, 59, 999);

const INITIAL_STATE = {
  title: "",
  style: "01",
  error: "",
  isStyleListOpened: false,
  deadline: initialDeadline.getTime(),
  isWithDeadline: true,
  isCalendarOpened: false,
  activeProject: {
    title: "No project",
    style: "01",
  },
  activeRepeatsOption: REPEATS_OPTIONS[0],
  repeats: 0,
  points: 0,
};

export const usePopupStore = create<PopupStateType>((set, get) => ({
  ...INITIAL_STATE,
  setTitle: (newTitle: string) => set(() => ({ title: newTitle })),
  setStyle: (newStyle: string) => set(() => ({ style: newStyle })),
  openStyleList: () => set(() => ({ isStyleListOpened: true })),
  closeStyleList: () => set(() => ({ isStyleListOpened: false })),
  toggleWithDeadline: () =>
    set(() => ({ isWithDeadline: !get().isWithDeadline })),
  setDeadline: (newDeadline: number) => {
    const differenceInTime = Math.abs(
      new Date(newDeadline).getTime() - new Date().getTime()
    );

    const repeats = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return set(() => ({ deadline: newDeadline, repeats }));
  },
  openCalendar: () => set(() => ({ isCalendarOpened: true })),
  closeCalendar: () => set(() => ({ isCalendarOpened: false })),
  setProject: (newProject: { title: string; style: string }) =>
    set(() => ({ activeProject: newProject })),
  setRepeatsOption: (newRepeatsOption: RepeatsOptionType) =>
    set(() => ({ activeRepeatsOption: newRepeatsOption })),
  setRepeats: (newRepeats: number) => set(() => ({ repeats: newRepeats })),
  setPoints: (newPoints: number) => set(() => ({ points: newPoints })),
  reset: () => set(() => ({ ...INITIAL_STATE })),
}));
