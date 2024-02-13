import { FC } from "react";
import Icon from "./Icon";

interface CompleteButtonPropsType {
  isLoading: boolean;
}

export const CompleteButton: FC<CompleteButtonPropsType> = ({ isLoading }) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      style={{ opacity: isLoading ? ".5" : "1" }}
    >
      <Icon name="short-complete" width={40} height={40} />
    </button>
  );
};
