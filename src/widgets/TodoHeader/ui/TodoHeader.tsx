import Icon from "@/shared/ui/Icon";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Complete } from "@/features/Complete";
// import { TaskSettings } from "./TaskSettings";
import { UpdateProgress } from "@/features/UpdateProgress";
import { ItemType } from "@/shared/config/types";
import { TodoSettings } from "./TodoSettings";
import { TodoPoints } from "@/features/TodoPoints";

interface TodoHeaderPropsType {
  style: string;
  progress: number;
  todoType: ItemType;
  isHabit?: boolean;
  points?: number;
}

export const TodoHeader: FC<TodoHeaderPropsType> = ({
  style,
  progress,
  todoType,
  isHabit = false,
  points = 0,
}) => {
  const router = useRouter();

  return (
    <section className="flex items-center justify-between">
      <button type="button" onClick={() => router.back()}>
        <Icon name="back" height={27} width={27} />
      </button>

      <div className="flex gap-10">
        {isHabit ? (
          <TodoPoints todoType="habit" initialPoints={points} />
        ) : (
          <>
            {progress < 100 ? <Complete itemType={todoType} /> : null}

            {todoType === "challenge" ? null : (
              <UpdateProgress
                style={style}
                initialProgress={progress}
                itemType={todoType}
              />
            )}
          </>
        )}

        <TodoSettings todoType={todoType} />
      </div>
    </section>
  );
};
