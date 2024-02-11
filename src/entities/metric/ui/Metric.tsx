import { Metric as MeticType } from "@prisma/client";
import { FC } from "react";

export const Metric: FC<MeticType> = ({ title, goalValue, currentValue }) => {
  return (
    <div className="mt-4">
      <h3>{title}</h3>
      <div className="flex gap-4 mt-4">
        <div>
          <p>Current value</p>
          <b>{currentValue}</b>
        </div>

        {goalValue ? (
          <div>
            <p>Goal value</p>
            <b>{goalValue}</b>
          </div>
        ) : null}
      </div>
    </div>
  );
};
