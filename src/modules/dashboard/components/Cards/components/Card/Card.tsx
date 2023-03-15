import Icon from "@/components/Icon";
import Image from "next/image";
import Link from "next/link";

interface Props {
  config: {
    icon: string;
    to: string;
    title: string;
    color: string;
  };
  amount: number;
}

export default function Card({ config, amount }: Props) {
  const { icon, to, title, color } = config;
  return (
    <Link
      href={to}
      className="p-2 pr-6 flex items-center bg-background2 rounded-2xl"
    >
      <Image src={icon} alt={title} />

      <b className="text-lg text-white font-bold ml-4">{title}</b>

      <span className="text-lg font-bold ml-auto mr-[21px]" style={{ color }}>
        {amount}
      </span>

      <div className="rotate-[270deg]">
        <Icon name="arrow-down" width={16} height={16} />
      </div>
    </Link>
  );
}
