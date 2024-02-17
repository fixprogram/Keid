import { Project as ProjectType } from "@prisma/client";

export type Project = Pick<ProjectType, "title" | "style" | "metrics">;

export type RepeatsOptionType = "Once" | "Everyday";
