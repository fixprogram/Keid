import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
import { useProjectFormSubmit } from "@/widgets/Navigation/hooks/useProjectFormSubmit";
import { useCallback, SyntheticEvent } from "react";
import { openStyleList, setProjectName } from "../../store/addProjectSlice";

export default function PopupBody() {
  const dispatch = useAppDispatch();
  const handleFormSubmit = useProjectFormSubmit();
  const projectName = useAppSelector((state) => state.addProject.projectName);
  const projectStyle = useAppSelector((state) => state.addProject.projectStyle);
  const error = useAppSelector((state) => state.addProject.error);

  const style = projectStyles[projectStyle as keyof ProjectStyleType];

  const handleProjectNameChange = useCallback(
    (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      return dispatch(setProjectName(target.value));
    },
    [dispatch]
  );

  return (
    <section className="px-5 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <div className="flex items-end">
          <button
            type="button"
            className="w-4 h-4 bg-primary rounded mr-4 mb-[5px]"
            style={{ background: style.gradient }}
            onClick={() => dispatch(openStyleList())}
          ></button>

          <input
            type="text"
            name="name"
            placeholder="Project Name..."
            className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
            style={{ background: "inherit" }}
            value={projectName}
            onChange={handleProjectNameChange}
            autoComplete="off"
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
