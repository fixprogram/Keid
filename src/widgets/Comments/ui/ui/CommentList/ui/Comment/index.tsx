import { CommentType } from "@/widgets/Comments/config/types";
import { getDateString } from "@/shared/lib/utils/getDateString";
import Icon from "@/shared/ui/Icon";
// import { useDeleteComment } from "@/templates/TaskPage/hooks/useDeleteComment";
import Image from "next/image";
import { FC } from "react";

type CommentPropsType = CommentType & {
  onDelete: (time: string) => void;
};

export const Comment: FC<CommentPropsType> = ({
  userImg,
  userName,
  time,
  content,
  serviceContent,
  onDelete,
}) => {
  const image = userImg ? (
    <Image src={userImg} alt={userName} width={40} height={40} />
  ) : (
    <Icon name="avatar" width={40} height={40} />
  );

  // const handleDeleteComment = useDeleteComment();

  return (
    <div>
      <div className="flex gap-4">
        <div className="w-10">{image}</div>

        <div>
          <div className="flex gap-1">
            <b className="font-bold text-sm text-white block">{userName}</b>
            <p className="text-sm text-deactive">
              {serviceContent ? serviceContent : null}
            </p>
          </div>
          <span
            className="text-sm text-deactive block"
            style={{ marginTop: -5, lineHeight: "20px" }}
          >
            {getDateString(new Date(+time), false)}
          </span>
        </div>

        <button className="ml-auto" onClick={() => onDelete(time)}>
          <Icon name="delete" width={16} height={16} />
        </button>
      </div>
      <p className="mt-3 text-white">{content}</p>
    </div>
  );
};
