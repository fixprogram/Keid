import { wrapper } from "@/application/store/store";
import { getTaskById } from "@/entities/task/models/getTaskById";
import SubtaskPage from "@/templates/SubtaskPage";
import { getSubtaskById } from "@/entities/subtask/models/getSubtaskById";
import { setupSubtaskData } from "@/templates/SubtaskPage/store/subtaskSlice";
import { CommentType } from "@/features/Comments/models/types";
import { getSession } from "next-auth/react";

export default function Subtask() {
  return <SubtaskPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession(context);

    if (!session) {
      throw new Error("session is not defined");
    }

    const user = session.user as { name: string };

    const subtaskId = context.query.id as string;
    const data = await getSubtaskById(subtaskId);

    if (!data) {
      throw new Error(`Task with id: ${subtaskId} wasn't found`);
    }

    const parentTask = await getTaskById(data.taskId);

    if (!parentTask) {
      throw new Error(`Project with id: ${subtaskId} wasn't found`);
    }

    const { title, deadline } = data;

    const comments: CommentType[] = [];
    data.comments.forEach((comment) => {
      comments.push({ ...comment, userName: user.name });
    });

    store.dispatch(
      setupSubtaskData({
        parentTaskName: parentTask.title,
        parentTaskStyle: parentTask.style,
        subtaskId,
        title,
        deadline,
        comments,
      })
    );

    return {
      props: {},
    };
  }
);
