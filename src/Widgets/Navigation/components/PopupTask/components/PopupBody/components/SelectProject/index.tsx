import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTaskProject } from "../../../../store/addTaskSlice";

export default function SelectProject() {
  const dispatch = useDispatch();
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
