import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import addProjectSlice from "@/widgets/Navigation/components/PopupProject/store/addProjectSlice";
import navigationSlice from "@/widgets/Navigation/store/navigationSlice";
import overviewSlice from "@/widgets/Overview/store/overviewSlice";
import projectSlice from "./projectSlice";
import projectsSlice from "./projectsSlice";
import addTaskSlice from "@/widgets/Navigation/components/PopupTask/store/addTaskSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      overview: overviewSlice,
      navigation: navigationSlice,
      addProject: addProjectSlice,
      addTask: addTaskSlice,
      project: projectSlice,
      projects: projectsSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);