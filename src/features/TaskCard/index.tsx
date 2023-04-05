import CompletedTask from "./components/CompletedTask";
import TaskInProgress from "./components/TaskInProgress";

type Props = {
  link: string;
  title: string;
  deadline: string;
  style: string;
  progress: number;
  completed: string;
};

export default function TaskCard({
  link,
  title,
  deadline,
  style,
  progress,
  completed,
}: Props) {
  if (completed) {
    return <CompletedTask link={link} title={title} completed={completed} />;
  }

  return (
    <TaskInProgress
      link={link}
      title={title}
      deadline={deadline}
      style={style}
      progress={progress}
    />
  );
}
