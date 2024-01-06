const apiLink = `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api`;
const apiProject = apiLink + "/projects";
const apiTask = apiLink + "/tasks";
const apiHabit = apiLink + "/habits";
const apiChallenge = apiLink + "/challenges";

export const links = {
  login: `${apiLink}/login`,
  signup: `${apiLink}/signup`,
  follow: (id: string) => `${apiLink}/profile/${id}/follow`,
  unfollow: (id: string) => `${apiLink}/profile/${id}/unfollow`,
  shareProgress: (id: string) => `${apiLink}/profile/${id}/shareProgress`,
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
    addSubtask: `${apiTask}/addSubtask`,
    delete: `${apiTask}/delete`,
    updateProgress: `${apiTask}/updateProgress`,
    complete: `${apiTask}/complete`,
    addComment: `${apiTask}/addComment`,
    deleteComment: `${apiTask}/deleteComment`,
    updateDeadline: `${apiTask}/updateDeadline`,
    updateTitle: `${apiTask}/updateTitle`,
    updateDescription: `${apiTask}/updateDescription`,
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
  challenge: {
    add: `${apiChallenge}/add`,
    updateProgress: `${apiChallenge}/updateProgress`,
    addComment: `${apiChallenge}/addComment`,
    deleteComment: `${apiChallenge}/deleteComment`,
    complete: `${apiChallenge}/complete`,
    archive: `${apiChallenge}/archive`,
    delete: `${apiChallenge}/delete`,
    updateDeadline: `${apiChallenge}/updateDeadline`,
    updateTitle: `${apiChallenge}/updateTitle`,
    updateDescription: `${apiChallenge}/updateDescription`,
  },
};
