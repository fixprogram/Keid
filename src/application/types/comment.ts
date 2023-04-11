import { Comment } from "@prisma/client";

export type CommentType = Pick<Comment, "content" | "time"> & {
  userName: string;
  userImg?: string;
};
