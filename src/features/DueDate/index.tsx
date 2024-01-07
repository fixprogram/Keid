import Icon from "@/shared/ui/Icon";

type Props = {
  date: string;
  onClick?: Function;
  dateColor?: string;
  circleColor?: string;
};

export default function DueDate({
  date,
  onClick = () => {},
  dateColor = "",
  circleColor = "",
}: Props) {
  return (
    <div className="flex gap-3 cursor-pointer" onClick={() => onClick()}>
      <div
        className={`rounded-full flex items-center justify-center w-12 h-12 `}
        style={{ backgroundColor: circleColor ? circleColor : "#A5F59C" }}
      >
        <Icon name="calendar" width={24} height={24} />
      </div>
      <div className="text-left">
        <p className="text-deactive font-medium text-sm">Due Date</p>
        <b
          className={`font-semibold`}
          style={{ color: dateColor ? dateColor : "#A5F59C" }}
        >
          {date}
        </b>
      </div>
    </div>
  );
}
