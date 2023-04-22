import { CompletedTask, InProgressTask, OverdueTask } from "@/entities/task";

interface Props {
  link: string;
  title: string;
  deadline: string;
  style: string;
  progress: number;
  completed: string;
}

export default function TaskCard({
  link,
  title,
  deadline,
  style,
  progress,
  completed,
}: Props) {
  const isCompleted = Boolean(completed);
  const isOverdue = Date.now() > new Date(deadline).getTime();

  if (isCompleted) {
    return <CompletedTask link={link} title={title} completed={completed} />;
  }

  if (isOverdue) {
    return (
      <OverdueTask
        link={link}
        title={title}
        deadline={deadline}
        style={style}
        progress={progress}
      />
    );
  }

  return (
    <InProgressTask
      link={link}
      title={title}
      deadline={deadline}
      style={style}
      progress={progress}
    />
  );
}
