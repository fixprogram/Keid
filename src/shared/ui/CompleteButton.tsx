import { FC } from "react";
import Icon from "./Icon";

interface CompleteButtonPropsType {
  onClick: VoidFunction;
  isLoading: boolean;
}

export const CompleteButton: FC<CompleteButtonPropsType> = ({
  onClick,
  isLoading,
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={isLoading}
      style={{ opacity: isLoading ? ".5" : "1" }}
    >
      <Icon name="short-complete" width={40} height={40} />
    </button>
  );
};
