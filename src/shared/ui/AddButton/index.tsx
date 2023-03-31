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
      className="w-10 h-10 bg-primary rounded-full flex justify-center items-center	shadow-addBtn"
      onClick={() => handleClick()}
    >
      <Icon name="plus" height={10} width={10} color={"#fff"} />
    </button>
  );
}
