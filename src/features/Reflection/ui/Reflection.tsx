import { Button } from "@/shared/ui/Button";
import { Reflection as ReflectionType } from "@prisma/client";
import { FC, useEffect, useState } from "react";
import { ReflectionSlider } from "./ReflectionSlider";
import { createPortal } from "react-dom";
import { useReflectionStore } from "../model/useReflectionStore";

interface ReflectionPropsType {
  data?: ReflectionType;
}

export const Reflection: FC<ReflectionPropsType> = ({ data }) => {
  const [isOpened, setOpened] = useState(false);

  const setReflection = useReflectionStore((state) => state.setReflection);

  const handleOpen = () => setOpened(true);

  const handleClose = () => setOpened(false);

  useEffect(() => {
    if (data) {
      setReflection(data);
    }
  }, [data, setReflection]);

  // if (!data) {
  //   return (
  //     <div className="mt-8 w-full">
  //       <Button onClick={handleOpen}></Button>

  //     </div>
  //   );
  // }

  return (
    <section className="text-white flex flex-col gap-3 mt-8">
      {data ? (
        <>
          <p>Mood: {data.mood}</p>
          <p>Worryings: {data.worryings}</p>
          <p>Summary: {data.summary}</p>
          <Button onClick={handleOpen}>Edit</Button>
        </>
      ) : (
        <Button onClick={handleOpen}>Add reflection</Button>
      )}

      {isOpened
        ? createPortal(
            <ReflectionSlider onClose={handleClose} />,
            document.body
          )
        : null}
    </section>
  );
};
