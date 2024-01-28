import { addReflection } from "@/server/actions";
import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import AddButton from "@/shared/ui/AddButton";
import { Button } from "@/shared/ui/Button";
import { SubmitButton } from "@/shared/ui/SubmitButton";
import { Reflection as ReflectionType } from "@prisma/client";
import { FC, useState } from "react";

interface ReflectionPropsType {
  data?: ReflectionType;
}

export const Reflection: FC<ReflectionPropsType> = ({ data }) => {
  // const [mood, setMood] = useState(0)

  if (!data) {
    return (
      <div className="mt-8 w-full">
        <PopupWithOverlay
          btn={<Button>{"Add reflection"}</Button>}
          positioned="Bottom"
        >
          <form
            action={addReflection}
            onSubmit={() => console.log("submitted")}
          >
            <label className="text-white">Mood</label>
            <input type="range" name="mood" min={0} max={100} />

            <label className="text-white">Note</label>
            <textarea style={{ margin: "24px 0" }} name="note" />

            <SubmitButton>{"Save"}</SubmitButton>
          </form>
        </PopupWithOverlay>
      </div>
    );
  }

  return data.note;
};
