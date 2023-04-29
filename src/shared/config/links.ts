const apiLnk = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/`;

export const links = {
  login: `${apiLnk}login`,
  signup: `${apiLnk}signup`,
  project: {
    add: `${apiLnk}project/add`,
    delete: `${apiLnk}project/delete`,
    toggleStarred: `${apiLnk}/project/toggleStarred`,
  },
  task: {
    add: `${apiLnk}task/add`,
    delete: `${apiLnk}task/delete`,
    updateProgress: `${apiLnk}task/updateProgress`,
    complete: `${apiLnk}task/complete`,
    addComment: `${apiLnk}task/addComment`,
    deleteComment: `${apiLnk}task/deleteComment`,
    updateDeadline: `${apiLnk}task/updateDeadline`,
  },
  subtask: {
    add: `${apiLnk}subtask/add`,
    delete: `${apiLnk}subtask/delete`,
    complete: `${apiLnk}subtask/complete`,
    addComment: `${apiLnk}subtask/addComment`,
    deleteComment: `${apiLnk}subtask/deleteComment`,
    updateDeadline: `${apiLnk}subtask/updateDeadline`,
  },
};
