import Icon from "@/shared/ui/Icon";
import Link from "next/link";

type Props = {
  link: string;
  title: string;
  completed: string;
};

export default function CompletedTask({ link, title, completed }: Props) {
  return (
    <Link href={link}>
      <div className="border-[1px] border-deactive p-5 flex gap-5 rounded-xl ">
        <Icon name="completed" width={40} height={40} />

        <div>
          <b className="text-lg text-white font-semibold">{title}</b>
          <p className="text-smm font-medium text-green">{completed}</p>
        </div>
      </div>
    </Link>
  );
}
