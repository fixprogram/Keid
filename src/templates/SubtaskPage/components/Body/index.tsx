import { Comments } from "@/features/Comments";
import DueDate from "@/features/DueDate";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useAddComment } from "../../hooks/useAddComment";
import { useDeleteComment } from "../../hooks/useDeleteComment";

export default function TaskBody() {
  const title = useAppSelector((state) => state.subtask.title);
  const deadline = useAppSelector((state) => state.subtask.deadline);
  const parentTaskName = useAppSelector(
    (state) => state.subtask.parentTaskName
  );
  const style = useAppSelector((state) => state.subtask.parentTaskStyle);
  const comments = useAppSelector((state) => state.subtask.comments);

  const handleAddComment = useAddComment();
  const handleDeleteComment = useDeleteComment();

  const parentTaskStyle = projectStyles[style as keyof ProjectStyleType];

  if (!parentTaskStyle) {
    return null;
  }

  return (
    <section className="flex flex-col grow">
      <b
        className="mt-8 font-semibold font-lg block"
        style={{ color: parentTaskStyle.background }}
      >
        {parentTaskName}
      </b>

      <h2 className="text-xxl text-poppins text-white mt-2 font-semibold">
        {title}
      </h2>

      <div className="flex flex-wrap items-end gap-6 mt-6">
        <DueDate
          date={deadline}
          dateColor={parentTaskStyle.background}
          circleColor={"#246BFD"}
        />
      </div>

      <div className="mt-6">
        <p className="text-white text-sm font-medium">Description</p>
        <p className="text-deactive text-sm">
          4,648 curated design resources to energize your creative workflow
        </p>
      </div>

      <div className="mt-auto">
        <Comments
          comments={comments}
          onSubmit={(comment) => handleAddComment(comment)}
          onDelete={handleDeleteComment}
        />
      </div>
    </section>
  );
}
