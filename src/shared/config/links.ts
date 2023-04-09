const apiLnk = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/`;

export const links = {
  login: `${apiLnk}login`,
  signup: `${apiLnk}signup`,
  project: {
    add: `${apiLnk}project/add`,
    delete: `${apiLnk}project/delete`,
  },
  task: {
    add: `${apiLnk}task/add`,
    delete: `${apiLnk}task/delete`,
    complete: `${apiLnk}task/complete`,
  },
  subtask: {
    add: `${apiLnk}subtask/add`,
    delete: `${apiLnk}subtask/delete`,
    complete: `${apiLnk}subtask/complete`,
  },
};
