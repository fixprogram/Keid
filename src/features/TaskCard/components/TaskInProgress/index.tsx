import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";

type Props = {
  link: string;
  title: string;
  deadline: string;
  style: string;
  progress: number;
};

export default function TaskInProgress({
  link,
  title,
  deadline,
  style,
  progress,
}: Props) {
  const taskStyle = projectStyles[style as keyof ProjectStyleType];
  return (
    <Link href={link}>
      <div className="bg-background2 p-5 flex gap-5 rounded-xl ">
        <RoundProgressBar progress={progress} />

        <div>
          <b className="text-lg text-white font-semibold">{title}</b>
          <p
            className="text-smm font-medium"
            style={{ color: taskStyle.background }}
          >
            {deadline}
          </p>
        </div>
      </div>
    </Link>
  );
}
