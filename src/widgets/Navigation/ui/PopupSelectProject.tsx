import { FC, SyntheticEvent, useEffect } from "react";
import Icon from "@/shared/ui/Icon";
import { Project } from "@/widgets/Navigation/config/types";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { shallow } from "zustand/shallow";
import { usePopupStore } from "@/widgets/Navigation/model/usePopupStore";

export const PopupSelectProject: FC = () => {
  const projects = useNavigationStore((state) => state.userProjects);
  const [activeProject, setTaskProject] = usePopupStore(
    (state) => [state.activeProject, state.setProject],
    shallow
  );

  useEffect(() => {
    if (activeProject.title === "") {
      setTaskProject(projects[0]);
    }
  }, [projects, activeProject.title, setTaskProject]);

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
    <div className="flex items-center gap-4 mb-5">
      <Icon name="project" width={16} height={16} color="white" />

      <select
        className="text-white font-bold"
        style={{ background: "inherit" }}
        value={activeProject.title}
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
