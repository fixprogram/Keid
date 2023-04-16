import Icon from "@/shared/ui/Icon";

type Props = {
  type?: "button" | "submit" | "reset";
  iconName?: string;
  text: string;
  onClick?: () => void;
};

export default function PrimaryButton({
  type = "button",
  iconName,
  text = "",
  onClick,
  ...props
}: Props) {
  const icon = iconName ? (
    <Icon name={iconName} width={16} height={16} />
  ) : null;

  return (
    <button
      type={type}
      className="bg-primary w-full h-12 flex items-center justify-center gap-3 rounded-full shadow-button"
      onClick={onClick}
      {...props}
    >
      {icon}
      <b className="text-white">{text}</b>
    </button>
  );
}
