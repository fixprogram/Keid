import Icon from "@/shared/ui/Icon";
import Link from "next/link";

type Props = {
  link: string;
  title: string;
  completed: string;
};

export const CompletedSubtask = ({ link, title, completed }: Props) => {
  return (
    <Link href={link}>
      <div className="border-[1px] border-deactive p-2 flex items-center gap-2 rounded-xl ">
        <Icon name="completed" width={40} height={40} />

        <div
          className="flex flex-grow items-center gap-2 pr-3"
          style={{ width: "calc(100% - 64px)" }}
        >
          <b
            className="text-lg flex-grow text-deactive font-bold"
            style={{ overflowX: "hidden" }}
          >
            {title}
          </b>
          <p className="text-smm font-medium text-green ml-auto">{completed}</p>
        </div>
      </div>
    </Link>
  );
};
