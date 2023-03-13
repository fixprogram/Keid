import Icon from "../Icon";
import ScreenList from "./ScreenList";

interface Props {
  title: string;
  color: string;
  screens: string[];
}

export default function ProjectHeader({ title, color, screens }: Props) {
  return (
    <section className="flex items-start gap-6">
      <div
        className={`p-2 rounded-xl w-[40px] h-[40px]`}
        style={{ backgroundColor: color }}
      >
        <Icon name="goal" width={24} height={24} />
      </div>

      <div className="grow">
        <h2 className="text-xl text-white font-semibold">{title}</h2>

        <ScreenList screens={screens} />
      </div>

      <button type="button" className="mr-[10px]">
        <Icon name="settings" width={24} height={24} />
      </button>
    </section>
  );
}
