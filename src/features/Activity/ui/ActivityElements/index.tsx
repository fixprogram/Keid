interface ActivityElementsProps {
  allTasks: number;
  allProjects: number;
}

export default function ActivityElements({
  allTasks,
  allProjects,
}: ActivityElementsProps) {
  return (
    <div className="mt-4 flex gap-4 w-full">
      <b className="text-base" style={{ color: "#FBA3FF" }}>
        {allTasks} Tasks
      </b>
      <b className="text-base" style={{ color: "#A06AF9" }}>
        {allProjects} Projects
      </b>
    </div>
  );
}
