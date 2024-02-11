import { FC } from "react";

interface MetricFormItemPropsType {
  title: string;
  isActive: boolean;
  toggleActive: () => void;
}

export const MetricFormItem: FC<MetricFormItemPropsType> = ({
  title,
  isActive,
  toggleActive,
}) => {
  return (
    <div
      className={`font-medium text-lg border-2 ${
        isActive ? "bg-primary" : ""
      } rounded-full cursor-pointer py-3 px-8`}
      style={{
        color: isActive ? "#fff" : "rgba(255,255,255,.6)",
        borderColor: isActive ? "#246BFD" : "rgba(255,255,255,.3)",
      }}
      onClick={toggleActive}
    >
      {title}
    </div>
  );
};
