import { FC, SyntheticEvent, useEffect } from "react";
import Icon from "@/shared/ui/Icon";
import { Project } from "@/widgets/Navigation/model/types";
import { useNavigationStore } from "@/widgets/Navigation/model/navigationStore";
import { shallow } from "zustand/shallow";
import { usePopupTaskStore } from "../../popupTaskStore";

export const SelectProject: FC = () => {
  const projects = useNavigationStore((state) => state.userProjectNames);
  const [taskProject, setTaskProject] = usePopupTaskStore(
    (state) => [state.activeProject, state.setTaskProject],
    shallow
  );

  useEffect(() => {
    if (taskProject.title === "") {
      setTaskProject(projects[0]);
    }
  }, [projects, taskProject.title, setTaskProject]);

  const handleSelectChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLSelectElement;

    if (target.value === "No project") {
      return setTaskProject({ title: "No project", style: "01" });
    }

    return setTaskProject(
      projects.find((project) => project.title === target.value) as Project
    );
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 mt-5">
      <Icon name="project" width={16} height={16} />

      <select
        className="text-white font-bold"
        style={{ background: "inherit" }}
        value={taskProject.title}
        onChange={handleSelectChange}
      >
        {projects.map((pr) => (
          <option key={pr.title} value={pr.title}>
            {pr.title}
          </option>
        ))}
        <option value={"No project"}>No project</option>
      </select>
    </div>
  );
};
