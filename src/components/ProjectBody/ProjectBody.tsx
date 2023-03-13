import TaskList from "./components/TaskList";

interface Props {
  screen: string;
}

const ComponentMap = {
  "Task List": TaskList,
};

export default function ProjectBody({ screen }: Props) {
  const Component = ComponentMap[screen];

  return <Component />;
}
