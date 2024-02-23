import { createWithEqualityFn } from "zustand/traditional";
import { RepeatsOptionType } from "../config/types";
import { REPEATS_OPTIONS } from "../config/consts";
import { isDateToday } from "@/shared/lib/utils/isDateToday";

interface PopupStateType {
  title: string;
  style: string;
  error?: string;
  isStyleListOpened: boolean;
  deadline: Date | null;
  isCalendarOpened: boolean;
  activeProject: {
    title: string;
    style: string;
  };
  activeRepeatsOption: RepeatsOptionType;
  repeats: number;
  points: number;
  isMembersOpened: boolean;
  members: string[];
  activeMetrics: string[];
  setTitle: (newTitle: string) => void;
  setStyle: (newStyle: string) => void;
  openStyleList: () => void;
  closeStyleList: () => void;
  setDeadline: (newDeadline: Date | null) => void;
  openCalendar: () => void;
  closeCalendar: () => void;
  setProject: (newProject: { title: string; style: string }) => void;
  setRepeatsOption: (newRepeatsOption: RepeatsOptionType) => void;
  setRepeats: (newRepeats: number) => void;
  setPoints: (newPoints: number) => void;
  openMembers: () => void;
  closeMembers: () => void;
  setMembers: (newMembers: string[]) => void;
  reset: () => void;
  setActiveMetrics: (newActiveMetrics: string[]) => void;
}

const INITIAL_STATE = {
  title: "",
  style: "01",
  error: "",
  isStyleListOpened: false,
  deadline: null,
  isCalendarOpened: false,
  activeProject: {
    title: "No project",
    style: "01",
  },
  activeRepeatsOption: REPEATS_OPTIONS[0],
  repeats: 28,
  points: 0,
  members: [],
  isMembersOpened: false,
  activeMetrics: [],
};

export const usePopupStore = createWithEqualityFn<PopupStateType>(
  (set, get) => ({
    ...INITIAL_STATE,
    setTitle: (newTitle: string) => set(() => ({ title: newTitle })),
    setStyle: (newStyle: string) => set(() => ({ style: newStyle })),
    openStyleList: () => set(() => ({ isStyleListOpened: true })),
    closeStyleList: () => set(() => ({ isStyleListOpened: false })),
    setDeadline: (newDeadline: Date | null) => {
      if (!newDeadline) {
        return set(() => ({ deadline: newDeadline }));
      }

      const differenceInTime = Math.abs(
        new Date(newDeadline).getTime() - new Date().getTime()
      );

      const repeats = isDateToday(new Date(newDeadline))
        ? 1
        : Math.floor(differenceInTime / (1000 * 3600 * 24));

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
    openMembers: () => set(() => ({ isMembersOpened: true })),
    closeMembers: () => set(() => ({ isMembersOpened: false })),
    setMembers: (newMembers) => set({ members: newMembers }),
    reset: () => set(() => ({ ...INITIAL_STATE })),
    setActiveMetrics: (newActiveMetrics: string[]) => ({
      activeMetrics: newActiveMetrics,
    }),
  })
);
