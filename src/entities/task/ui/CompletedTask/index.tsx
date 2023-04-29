import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC } from "react";

type CompletedTaskPropsType = {
  link: string;
  title: string;
  isExpired: boolean;
  completed: string;
};

export const CompletedTask: FC<CompletedTaskPropsType> = ({
  link,
  title,
  isExpired,
  completed,
}) => {
  return (
    <Link href={link}>
      <div className="border-[1px] border-deactive p-5 flex gap-5 rounded-xl">
        <div className="min-w-[40px]">
          <Icon name="completed" width={40} height={40} />
        </div>

        <div>
          <b className="text-lg text-white font-semibold">{title}</b>
          <p
            className={`text-smm font-medium ${
              isExpired ? "text-expired" : "text-green"
            }`}
          >
            {completed}
          </p>
        </div>
      </div>
    </Link>
  );
};
