import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
// import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
// import { AutoSizedTextarea } from "@/shared/ui/AutoSizedTextarea";
// import { changeNewSubtaskText } from "@/templates/TaskPage/store/taskSlice";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

// type Props = {
//   link: string;
//   title: string;
//   deadline: string;
//   style: { background: string; gradient: string };
// };

export default function NewSubtask({}) {
  const [isFocused, setFocused] = useState(false);
  // const dispatch = useAppDispatch();
  // const text = useAppSelector((state) => state.task.newSubtaskText);

  // const handleInputChange = (event: SyntheticEvent) => {
  //   const target = event.target as HTMLInputElement;

  //   dispatch(changeNewSubtaskText(target.value));
  // };

  return (
    // <Link href={link}>
    <div
      className="bg-background2 p-2 flex items-center gap-2 rounded-xl border-2"
      style={{ borderColor: isFocused ? "#246BFD" : "transparent" }}
    >
      <div className="min-w-[24px] h-6 rounded-full border-2 border-deactive m-2"></div>

      <div className="flex flex-grow items-center gap-2 mr-3">
        {/* <input
          type="text"
          value={text}
          placeholder="Add subtask..."
          onChange={handleInputChange}
          style={{ backgroundColor: "inherit" }}
          className="text-lg flex-grow text-white font-semibold"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        /> */}

        {/* {text.length ? <AddButton /> : null} */}

        {/* <b className="text-lg flex-grow text-white font-semibold">{title}</b> */}
      </div>
    </div>
    // </Link>
  );
}
