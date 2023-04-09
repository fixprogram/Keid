import { wrapper } from "@/application/store/store";
import TaskPage from "@/templates/TaskPage";
import { getTaskById } from "@/entities/task/models/getTaskById";
import { setupTaskData } from "@/templates/TaskPage/store/taskSlice";
import { getProjectById } from "@/entities/project/models/getProjectById";
import { getSubtasksByIds } from "@/entities/subtask/models/getSubtasksByIds";

export default function Task() {
  return <TaskPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
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

    store.dispatch(
      setupTaskData({
        ...data,
        projectTitle: parentProject.title,
        projectStyle: parentProject.style,
        taskId,
        subtasks,
      })
    );

    return {
      props: {},
    };
  }
);
