import { Comments } from "@/features/Comments";
import ProjectInfo from "@/features/ProjectInfo";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useAddComment } from "../../hooks/useAddComment";
import { useDeleteComment } from "../../hooks/useDeleteComment";
import SubtaskList from "./ui/SubtaskList";
import { TaskDeadline } from "./ui/TaskDeadline";
import { TaskTitle } from "./ui/TaskTitle";

export default function TaskBody() {
  const title = useAppSelector((state) => state.task.title);
  const projectTitle = useAppSelector((state) => state.task.projectTitle);
  const projectStyle = useAppSelector((state) => state.task.projectStyle);
  const comments = useAppSelector((state) => state.task.comments);
  const handleAddComment = useAddComment();
  const handleDeleteComment = useDeleteComment();

  const parentProjectStyle =
    projectStyles[projectStyle as keyof ProjectStyleType];

  if (!parentProjectStyle) {
    return null;
  }

  return (
    <section className="flex flex-col grow">
      {/* <h2 className="text-xxl text-poppins text-white mt-8 font-semibold">
        {title}
      </h2> */}

      <TaskTitle initialTitle={title} />

      <div className="flex flex-wrap items-end gap-6 mt-6">
        <div className="flex gap-4">
          <ProjectInfo
            backgroundColor={parentProjectStyle.background}
            title={projectTitle}
            category={"Category"}
          />
        </div>

        <TaskDeadline />
      </div>

      <div className="mt-6">
        <p className="text-white text-sm font-medium">Description</p>
        <p className="text-deactive text-sm">
          4,648 curated design resources to energize your creative workflow
        </p>
      </div>

      <SubtaskList />

      <div className="mt-auto">
        <Comments
          comments={comments}
          onSubmit={handleAddComment}
          onDelete={handleDeleteComment}
        />
      </div>
    </section>
  );
}
