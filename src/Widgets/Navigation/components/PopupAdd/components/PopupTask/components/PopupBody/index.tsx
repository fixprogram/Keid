import AddButton from "@/shared/ui/AddButton";
import { useTaskFormSubmit } from "@/widgets/Navigation/hooks/useTaskFormSubmit";
import InputTaskName from "./components/InputTaskName";
import SelectProject from "./components/SelectProject";
import TaskDeadline from "./components/TaskDeadline";

export default function PopupBody() {
  const handleFormSubmit = useTaskFormSubmit();

  return (
    <section className="px-5 pb-16 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <SelectProject />

        <InputTaskName />

        <TaskDeadline />

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}