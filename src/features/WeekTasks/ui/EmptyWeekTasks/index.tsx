import { FC } from "react";

export const EmptyWeekTasks: FC = () => {
  return (
    <section
      className="mt-8 p-1 rounded-[20px] relative"
      style={{
        background:
          "radial-gradient(102.94% 100% at 72.83% 100%, #FFB8E0 0%, #BE9EFF 38.89%, #88C0FC 67.4%, #86FF99 100%)",
      }}
    >
      <div className="p-5">
        <h3 className="font-poppins font-semibold text-xl">Week Tasks</h3>
        <p className="font-medium text-base">No tasks for this week</p>
      </div>
    </section>
  );
};
