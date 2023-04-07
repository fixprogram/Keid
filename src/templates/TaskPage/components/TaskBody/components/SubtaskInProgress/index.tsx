import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import Link from "next/link";

type Props = {
  link: string;
  title: string;
  deadline: string;
  style: string;
};

export default function SubtaskInProgress({
  link,
  title,
  deadline,
  style,
}: Props) {
  const taskStyle = projectStyles[style as keyof ProjectStyleType];
  return (
    <Link href={link}>
      <div className="bg-background2 p-2 flex items-center gap-2 rounded-xl ">
        <div className="w-6 h-6 rounded-full border-2 border-deactive m-2"></div>

        <div className="flex flex-grow items-center gap-2 mr-3">
          <b className="text-lg flex-grow text-white font-semibold">{title}</b>
          <p
            className="text-smm font-medium ml-auto"
            style={{ color: taskStyle.background }}
          >
            {deadline}
          </p>
        </div>
      </div>
    </Link>
  );
}