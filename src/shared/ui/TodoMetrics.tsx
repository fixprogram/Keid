import { FC } from "react";
import Icon from "./Icon";

type Metric = {
  iconName: string;
  name: string;
  value: string | number;
  valueColor?: string;
};

interface TodoMetricsPropsType {
  metrics: Metric[];
}

export const TodoMetrics: FC<TodoMetricsPropsType> = ({ metrics }) => {
  if (metrics.length === 0) {
    // TODO: Skeleton
    return null;
  }

  return (
    <div className="flex flex-wrap items-end gap-6 mt-6">
      {metrics.map(({ name, iconName, value, valueColor }) => (
        <div key={name} className="flex gap-4">
          <div>
            <Icon name={iconName} height={48} width={48} />
          </div>
          <div>
            <div className="text-deactive text-sm font-medium">{name}</div>
            <div
              className="font-bold text-lg"
              style={{ color: valueColor ? valueColor : "#FFFFFF" }}
            >
              {value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
