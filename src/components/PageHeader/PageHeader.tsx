import Icon from "../Icon";

interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  return (
    <div className="flex items-center justify-between">
      <button type="button">
        <Icon name="back" height={27} width={27} />
      </button>

      <h2 className="font-semibold text-xl text-white font-poppins">{title}</h2>

      <button type="button">
        <Icon name="add" height={50} width={50} />
      </button>
    </div>
  );
}
