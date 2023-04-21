import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { toggleWeekTasks } from "./store/weekTasksSlice";
import TaskList from "./ui/TaskList";

export default function WeekTasks() {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector((state) => state.weekTasks.isOpened);
  const taskAmount = useAppSelector((state) => state.weekTasks.taskAmount);
  const completedTaskAmount = useAppSelector(
    (state) => state.weekTasks.completedTaskAmount
  );
  const progress = useAppSelector((state) => state.weekTasks.progress);
  console.log("progress: ", progress);

  return (
    <section
      className="mt-8 p-1 rounded-[20px] relative"
      style={{
        background:
          "radial-gradient(102.94% 100% at 72.83% 100%, #FFB8E0 0%, #BE9EFF 38.89%, #88C0FC 67.4%, #86FF99 100%)",
      }}
    >
      <section
        className={`${isOpened ? "bg-background1" : ""} p-5 rounded-[18px]`}
      >
        <div className={`${isOpened ? "text-white" : "text-active"}`}>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-poppins font-semibold text-xl">Week Tasks</h3>
              <p className="font-medium text-base">
                {completedTaskAmount}/{taskAmount} is completed
              </p>
            </div>

            <button onClick={() => dispatch(toggleWeekTasks())}>
              {isOpened ? "Close" : "Open"}
            </button>
          </div>

          {isOpened ? <TaskList /> : null}

          {isOpened ? null : (
            <div className="flex gap-[25px] items-center mt-[17px]">
              <div className="h-[12px] w-[200px] bg-white rounded-[5px]">
                <div
                  className="h-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #353843 0%, #181A20 100%)",
                    borderRadius: "5px 2px 2px 5px",
                    width: `${progress}%`,
                  }}
                ></div>
              </div>
              <span className="text-active text-base font-bold">
                {progress}%
              </span>
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
