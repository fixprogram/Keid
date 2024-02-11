import { addMetric } from "@/server/actions";
import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { Button } from "@/shared/ui/Button";
import InputText from "@/shared/ui/InputText";
import { SubmitButton } from "@/shared/ui/SubmitButton";
import { usePathname } from "next/navigation";
import { FC } from "react";

export const AddProjectMetrics: FC = () => {
  const projectId = usePathname().split("/").at(-1);

  if (!projectId) {
    return <div>No project id found</div>;
  }

  const addProjectMetric = addMetric.bind(null, projectId);

  return (
    <PopupWithOverlay btn={<Button>Add metrics</Button>} positioned="Bottom">
      <form action={addProjectMetric} className="flex flex-col gap-6 pt-6">
        <InputText type="text" placeholder="Title..." name="title" required />

        <InputText
          type="text"
          placeholder="Current value..."
          name="currentValue"
          required
        />

        <InputText type="text" placeholder="Goal value..." name="goalValue" />

        <SubmitButton>Save</SubmitButton>
      </form>
    </PopupWithOverlay>
  );
};
