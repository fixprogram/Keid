const apiLink = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/`;
const apiProject = apiLink + "projects";
const apiTask = apiLink + "tasks";
const apiSubtask = apiLink + "subtasks";
const apiHabit = apiLink + "habits";

export const links = {
  login: `${apiLink}login`,
  signup: `${apiLink}signup`,
  project: {
    add: `${apiProject}/add`,
    complete: `${apiProject}/complete`,
    archive: `${apiProject}/archive`,
    unarchive: `${apiProject}/unarchive`,
    delete: `${apiProject}/delete`,
    toggleStarred: `${apiProject}/toggleStarred`,
    changeProjectName: `${apiProject}/changeProjectName`,
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
    updateDescription: `${apiTask}/updateDescription`,
  },
  subtask: {
    add: `${apiSubtask}/add`,
    delete: `${apiSubtask}/delete`,
    updateProgress: `${apiSubtask}/updateProgress`,
    complete: `${apiSubtask}/complete`,
    addComment: `${apiSubtask}/addComment`,
    deleteComment: `${apiSubtask}/deleteComment`,
    updateDeadline: `${apiSubtask}/updateDeadline`,
    updateTitle: `${apiSubtask}/updateTitle`,
    updateDescription: `${apiSubtask}/updateDescription`,
  },
  habit: {
    add: `${apiHabit}/add`,
    archive: `${apiHabit}/archive`,
    delete: `${apiHabit}/delete`,
    updateProgress: `${apiHabit}/updateProgress`,
    complete: `${apiHabit}/complete`,
    addComment: `${apiHabit}/addComment`,
    deleteComment: `${apiHabit}/deleteComment`,
    updateDeadline: `${apiHabit}/updateDeadline`,
    updateTitle: `${apiHabit}/updateTitle`,
    updateDescription: `${apiHabit}/updateDescription`,
  },
};
