import { wrapper } from "@/application/store/store";
import TaskPage from "@/templates/TaskPage";
import { getTaskById } from "@/entities/task/models/getTaskById";
import { setupTaskData } from "@/templates/TaskPage/store/taskSlice";
import { getProjectById } from "@/entities/project/models/getProjectById";
import { getSubtasksByIds } from "@/entities/subtask/models/getSubtasksByIds";
import { CommentType } from "@/application/types/comment";
import { getSession } from "next-auth/react";

export default function Task() {
  return <TaskPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession(context);

    if (!session) {
      throw new Error("session is not defined");
    }

    const user = session.user as { name: string };
    const taskId = context.query.id as string;
    const data = await getTaskById(taskId);

    if (!data) {
      throw new Error(`Task with id: ${taskId} wasn't found`);
    }

    const parentProject = await getProjectById(data.projectId);

    if (!parentProject) {
      throw new Error(`Project with id: ${taskId} wasn't found`);
    }

    const subtasks = await getSubtasksByIds(data.subtaskIds);

    const comments: CommentType[] = [];
    data.comments.forEach((comment) => {
      comments.push({ ...comment, userName: user.name });
    });

    store.dispatch(
      setupTaskData({
        ...data,
        projectTitle: parentProject.title,
        projectStyle: parentProject.style,
        taskId,
        subtasks,
        comments,
      })
    );

    return {
      props: {},
    };
  }
);
