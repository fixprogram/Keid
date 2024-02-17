import Icon from "../Icon";

export default function AddButton({
  type = "button",
  handleClick = () => {},
}: {
  type?: "button" | "submit";
  handleClick?: Function;
}) {
  return (
    <button
      type={type}
      className="w-12 h-12 bg-primary rounded-full flex justify-center items-center	shadow-addBtn"
      onClick={() => handleClick()}
    >
      <Icon name="plus" height={16} width={16} color={"#fff"} />
    </button>
  );
}
