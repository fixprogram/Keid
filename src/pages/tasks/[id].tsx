import { wrapper } from "@/application/store/store";
import TaskPage from "@/templates/TaskPage";
import { getTaskById } from "@/entities/task/models/getTaskById";
import { setupTaskData } from "@/templates/TaskPage/store/taskSlice";
import { getProjectById } from "@/entities/project/models/getProjectById";
import { getSubtasksByIds } from "@/entities/subtask/models/getSubtasksByIds";
import { getSession } from "next-auth/react";
import { setupProgress } from "@/features/Progress/store/progressSlice";
import { CommentType } from "@/features/Comments/models/types";

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

    const subtasks = await getSubtasksByIds(data.subtaskIds);

    const comments: CommentType[] = [];
    data.comments.forEach((comment) => {
      comments.push({ ...comment, userName: user.name });
    });

    const taskData = {
      ...data,
      taskId,
      subtasks,
      comments,
    };

    const parentProject = await getProjectById(data.projectId);

    if (parentProject) {
      store.dispatch(
        setupTaskData({
          ...taskData,
          projectTitle: parentProject.title,
          projectStyle: parentProject.style,
        })
      );
    } else {
      store.dispatch(
        setupTaskData({
          ...taskData,
          projectTitle: "No project",
          projectStyle: "01",
        })
      );
    }

    store.dispatch(setupProgress(data.progress));

    return {
      props: {},
    };
  }
);
