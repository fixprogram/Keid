import AddButton from "@/shared/ui/AddButton";
import { useHabitFormSubmit } from "@/widgets/Navigation/hooks/useHabitFormSubmit";
import { PopupInputHabitName } from "../PopupInputHabitName";

export default function PopupBody() {
  const handleFormSubmit = useHabitFormSubmit();

  return (
    <section className="px-5 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <PopupInputHabitName />

        <div className="mt-6">
          <span className="font-bold text-deactive uppercase text-xxs">
            Privacy
          </span>
          <p className="text-white">Public</p>
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
