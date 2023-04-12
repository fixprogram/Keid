import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { useRef } from "react";
import { closeStyleList, setProjectStyle } from "../../store/addProjectSlice";

export default function PopupStyleList() {
  const dispatch = useAppDispatch();
  const projectStyle = useAppSelector((state) => state.addProject.projectStyle);
  const initialStyle = useRef({ projectStyle });

  function setStyle(style: string) {
    dispatch(setProjectStyle(style));
  }

  function cancelStyleList() {
    setStyle(initialStyle.current.projectStyle);
    dispatch(closeStyleList());
  }

  function saveStyle() {
    dispatch(closeStyleList());
  }

  const arrOfStyles = Object.keys(projectStyles);

  return (
    <section className="px-5 pb-6">
      <div className="mt-6">
        <b className="font-bold text-xxs text-deactive tracking-wide uppercase">
          Chose color theme
        </b>

        <ul className="flex mt-5 flex-wrap gap-x-4 gap-y-2">
          {arrOfStyles.map((styleItem) => (
            <li
              key={styleItem}
              className="w-12 h-12 rounded-xl border-2 flex justify-center items-center"
              style={{
                borderColor:
                  projectStyle === styleItem ? "#246BFD" : "transparent",
              }}
            >
              <button
                className="w-4 h-4 rounded-full"
                style={{
                  background:
                    projectStyles[styleItem as keyof ProjectStyleType].gradient,
                }}
                onClick={() => setStyle(styleItem)}
              ></button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-end">
        <button
          type="button"
          onClick={cancelStyleList}
          className="text-red font-bold py-3 px-8"
        >
          Cancel
        </button>
        <div className="w-[100px]">
          <PrimaryButton text="Done" onClick={saveStyle} />
        </div>
      </div>
    </section>
  );
}
