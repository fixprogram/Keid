import Icon from "@/shared/ui/Icon";
import Link from "next/link";

type Props = {
  link: string;
  title: string;
  completed: string;
};

export default function CompletedSubtask({ link, title, completed }: Props) {
  return (
    <Link href={link}>
      <div className="border-[1px] border-deactive p-5 flex gap-2 rounded-xl ">
        <Icon name="completed" width={40} height={40} />

        <div className="flex gap-2">
          <b className="text-lg text-deactive font-semibold">{title}</b>
          <p className="text-smm font-medium text-green ml-auto">{completed}</p>
        </div>
      </div>
    </Link>
  );
}
