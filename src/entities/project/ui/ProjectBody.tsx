import { ProjectTasks } from "@/widgets/ProjectTasks";

interface Props {
  screen: "Task List";
  tasks: [];
}

const ComponentMap = {
  "Task List": ProjectTasks,
};

export default function ProjectBody({ screen, tasks }: Props) {
  const Component = ComponentMap[screen];

  return <Component initialTasks={tasks} />;
}
