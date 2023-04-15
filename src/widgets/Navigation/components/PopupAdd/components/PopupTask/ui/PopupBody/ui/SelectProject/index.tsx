import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useEffect } from "react";
import { setTaskProject } from "@/widgets/Navigation/components/PopupAdd/components/PopupTask/store/addTaskSlice";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Project } from "@/widgets/Navigation/models";

export default function SelectProject() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.navigation.projects);
  const taskProject = useAppSelector((state) => state.addTask.taskProject);

  useEffect(() => {
    if (taskProject.title === "") {
      dispatch(setTaskProject(projects[0]));
    }
  }, [dispatch, projects, taskProject.title]);

  if (projects.length === 0) {
    return null;
  }

  return (
    <select
      className="ml-8 mt-5 text-white font-bold"
      style={{ background: "inherit" }}
      value={taskProject.title}
      onChange={(e) =>
        dispatch(
          setTaskProject(
            projects.find(
              (project) => project.title === e.target.value
            ) as Project
          )
        )
      }
    >
      {projects.map((pr) => (
        <option key={pr.title} value={pr.title}>
          {pr.title}
        </option>
      ))}
    </select>
  );
}
