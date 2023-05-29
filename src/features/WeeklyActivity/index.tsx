import { FC } from "react";

interface WeeklyActivityPropsType {
  data: [];
}

export const WeeklyActivity: FC<WeeklyActivityPropsType> = ({ data }) => {
  return <ul className="flex flex-col gap-4 mt-6"></ul>;
};
