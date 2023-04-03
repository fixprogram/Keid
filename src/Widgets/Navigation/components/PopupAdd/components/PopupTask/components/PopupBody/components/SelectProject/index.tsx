import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useEffect } from "react";
import { setTaskProject } from "@/widgets/Navigation/components/PopupAdd/components/PopupTask/store/addTaskSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";

export default function SelectProject() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.navigation.projects);
  const activeProject = useAppSelector((state) => state.addTask.taskProject);

  useEffect(() => {
    dispatch(setTaskProject(projects[0]));
  }, [dispatch, projects]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <select
      className="ml-8 mt-5 text-white font-bold"
      style={{ background: "inherit" }}
      value={activeProject}
      onChange={(e) => dispatch(setTaskProject(e.target.value))}
    >
      {projects.map((pr) => (
        <option key={pr} value={pr}>
          {pr}
        </option>
      ))}
    </select>
  );
}