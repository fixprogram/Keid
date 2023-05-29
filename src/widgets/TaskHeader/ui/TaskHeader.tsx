import Icon from "@/shared/ui/Icon";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Complete } from "@/features/Complete";
import { TaskSettings } from "./TaskSettings";
import { UpdateProgress } from "@/features/UpdateProgress";

interface TaskHeaderPropsType {
  style: string;
  progress: number;
}

export const TaskHeader: FC<TaskHeaderPropsType> = ({ style, progress }) => {
  const router = useRouter();

  return (
    <section className="flex items-center justify-between">
      <button type="button" onClick={() => router.back()}>
        <Icon name="back" height={27} width={27} />
      </button>

      <div className="flex gap-10">
        {progress < 100 ? <Complete itemType="task" /> : null}

        <UpdateProgress
          style={style}
          initialProgress={progress}
          itemType="task"
        />

        <TaskSettings />
      </div>
    </section>
  );
};
