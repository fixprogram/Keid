import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
import { useProjectFormSubmit } from "@/widgi/Navigation/hooks/useProjectFormSubmit";
import { SyntheticEvent, useCallback, useEffect } from "react";
import { setProjectName, setProjectStyle } from "./store/addProjectSlice";

export default function PopupProject() {
  const dispatch = useAppDispatch();
  const handleFormSubmit = useProjectFormSubmit();
  const projectName = useAppSelector((state) => state.addProject.projectName);
  const projectStyle = useAppSelector((state) => state.addProject.projectStyle);
  const error = useAppSelector((state) => state.addProject.error);
  const style = projectStyles[projectStyle as keyof ProjectStyleType];

  const projectAmount = useAppSelector((state) => state.overview.projectAmount);

  const handleProjectNameChange = useCallback(
    (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      return dispatch(setProjectName(target.value));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(
      setProjectStyle(projectAmount <= 6 ? `0${projectAmount + 1}` : "01")
    );
  }, [dispatch, projectAmount]);

  return (
    <section className="px-5 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="flex items-end">
          <button
            type="button"
            className="w-4 h-4 bg-primary rounded mr-4 mb-[5px]"
            style={{ background: style.gradient }}
          ></button>

          <input
            type="text"
            name="name"
            placeholder="Project Name..."
            className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
            style={{ background: "inherit" }}
            value={projectName}
            onChange={handleProjectNameChange}
          />

          <p>{error}</p>
        </div>

        <div className="mt-6">
          <span className="font-bold text-deactive uppercase text-xxs">
            Privacy
          </span>
          <p className="text-white">Public</p>
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
