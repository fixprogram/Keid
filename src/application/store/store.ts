import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import navigationSlice from "@/widgets/Navigation/store/navigationSlice";
import overviewSlice from "@/widgets/Overview/store/overviewSlice";
import projectSlice from "../../templates/ProjectPage/store/projectSlice";
import projectsSlice from "../../templates/ProjectsPage/store/projectsSlice";
import addProjectSlice from "@/widgets/Navigation/components/PopupAdd/components/PopupProject/store/addProjectSlice";
import addTaskSlice from "@/widgets/Navigation/components/PopupAdd/components/PopupTask/store/addTaskSlice";
import tasksSlice from "@/templates/TasksPage/store/tasksSlice";
import taskSlice from "@/templates/TaskPage/store/taskSlice";
import addSubtaskSlice from "@/templates/TaskPage/components/AddSubtaskPopup/store/addSubtaskSlice";
import subtaskSlice from "@/templates/SubtaskPage/store/subtaskSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      overview: overviewSlice,
      navigation: navigationSlice,
      addProject: addProjectSlice,
      addTask: addTaskSlice,
      addSubtask: addSubtaskSlice,
      project: projectSlice,
      projects: projectsSlice,
      tasks: tasksSlice,
      task: taskSlice,
      subtask: subtaskSlice,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
