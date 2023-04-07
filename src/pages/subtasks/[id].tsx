import { wrapper } from "@/application/store/store";
import { getTaskById } from "@/entities/task/models/getTaskById";
import SubtaskPage from "@/templates/SubtaskPage";
import { getSubtaskById } from "@/entities/subtask/models/getSubtaskById";
import { setupSubtaskData } from "@/templates/SubtaskPage/store/subtaskSlice";

export default function Subtask() {
  return <SubtaskPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
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

    store.dispatch(
      setupSubtaskData({
        parentTaskName: parentTask.title,
        parentTaskStyle: parentTask.style,
        subtaskId,
        title,
        deadline,
      })
    );
  }
);
