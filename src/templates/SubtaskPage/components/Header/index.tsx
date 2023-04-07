import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import Icon from "@/shared/ui/Icon";
import { useRouter } from "next/router";
import { useCompleteSubtask } from "../../hooks/useCompleteSubtask";
import { openSettings } from "../../store/subtaskSlice";

export default function TaskHeader() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const completeSubtaskHandler = useCompleteSubtask();

  return (
    <section className="flex items-center justify-between">
      <button type="button" onClick={() => router.back()}>
        <Icon name="back" height={27} width={27} />
      </button>

      <div className="flex gap-10">
        <button type="button" onClick={completeSubtaskHandler}>
          <Icon name="complete" height={14} width={19} />
        </button>

        <button type="button" onClick={() => dispatch(openSettings())}>
          <Icon name="settings" height={24} width={24} />
        </button>
      </div>
    </section>
  );
}
