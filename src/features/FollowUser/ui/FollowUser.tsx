import { FC, useCallback, useState } from "react";
import { useToggleFollowingUser } from "../model/useToggleFollowingUser";

interface FollowUserPropsType {
  userId: string;
  id: string;
  initialValue: boolean;
}

export const FollowUser: FC<FollowUserPropsType> = ({
  userId,
  id,
  initialValue,
}) => {
  const [isFollowing, setFollowing] = useState<boolean>(initialValue);

  const toggleFollow = useToggleFollowingUser(userId, id);

  const handleToggleFollow = useCallback(() => {
    setFollowing((prevState) => !prevState);

    toggleFollow();
  }, [toggleFollow]);

  return (
    <button
      type={"button"}
      className={`${
        isFollowing ? "bg-deactive" : "bg-primary"
      } w-full h-12 flex items-center justify-center gap-3 rounded-full mt-[40px] shadow-button`}
      onClick={() => handleToggleFollow()}
    >
      <b className="text-white">{isFollowing ? "Unfollow" : "Follow"}</b>
    </button>
  );
};
