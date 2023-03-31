import Link from "next/link";

import { Gradients, gradients } from "@/gradients";
import Icon from "../../../../shared/ui/Icon";
import { Goal } from "../../GoalsList";

export default function GridGoalItem({ goal }: { goal: Goal }) {
  const { color, title, category, allTasksAmount, completedTasksAmount } = goal;
  return (
    <Link
      href={`projects/${goal.id}`}
      className="min-h-[100px] p-5 rounded-xl bg-background2/50"
    >
      <div className="flex flex-col h-full ">
        <div
          className={`p-2 rounded-xl w-[40px] h-[40px]`}
          style={{ backgroundColor: color }}
        >
          <Icon name="goal" width={24} height={24} />
        </div>

        <div className="mt-3">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <p className="font-medium text-deactive text-sm">{category}</p>
        </div>

        {allTasksAmount && completedTasksAmount ? (
          <div className="mt-auto flex items-center justify-between">
            <div className="w-full h-1 bg-white/10 rounded-full">
              <div
                className="rounded-full h-full"
                style={{
                  width: `${(completedTasksAmount / allTasksAmount) * 100}%`,
                  background: gradients[color as keyof Gradients],
                }}
              ></div>
            </div>

            <div className={`text-xs text-white font-medium ml-[14px]`}>
              {completedTasksAmount}/{allTasksAmount}
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
}
