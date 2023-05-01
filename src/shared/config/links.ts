const apiLnk = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/`;
const apiProject = apiLnk + "project";
const apiTask = apiLnk + "task";
const apiSubtask = apiLnk + "subtask";

export const links = {
  login: `${apiLnk}login`,
  signup: `${apiLnk}signup`,
  project: {
    add: `${apiProject}/add`,
    delete: `${apiProject}/delete`,
    toggleStarred: `${apiProject}//toggleStarred`,
    changeProjectName: `${apiProject}//changeProjectName`,
  },
  task: {
    add: `${apiTask}/add`,
    delete: `${apiTask}/delete`,
    updateProgress: `${apiTask}/updateProgress`,
    complete: `${apiTask}/complete`,
    addComment: `${apiTask}/addComment`,
    deleteComment: `${apiTask}/deleteComment`,
    updateDeadline: `${apiTask}/updateDeadline`,
    updateTitle: `${apiTask}/updateTitle`,
  },
  subtask: {
    add: `${apiSubtask}/add`,
    delete: `${apiSubtask}/delete`,
    complete: `${apiSubtask}/complete`,
    addComment: `${apiSubtask}/addComment`,
    deleteComment: `${apiSubtask}/deleteComment`,
    updateDeadline: `${apiSubtask}/updateDeadline`,
  },
};
