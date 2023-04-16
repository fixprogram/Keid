import { links } from "@/shared/config/links";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useUser } from "@/shared/lib/hooks/useUser";
import { useRouter } from "next/router";
import { SyntheticEvent, useCallback } from "react";
import { closePopup } from "../ui/AddSubtaskPopup/store/addSubtaskSlice";

export function useSubtaskFormSubmit() {
  const router = useRouter();
  const user = useUser();
  const dispatch = useAppDispatch();

  const taskId = useAppSelector((state) => state.task.taskId);
  const title = useAppSelector((state) => state.addSubtask.title);
  const deadline = useAppSelector((state) => state.addSubtask.deadline);

  const handleSubtaskFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      if (user) {
        const userId = user.id;

        fetch(links.subtask.add, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            taskId,
            title,
            deadline,
          }),
        })
          .then(async (res) => {
            console.log("Res: ", res);

            const body = await res.json();

            dispatch(closePopup());
            // dispatch add subtask

            if (res.status === 200) {
              router.push(`/tasks/${body.id}`);
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      }
    },
    [user, taskId, title, deadline, dispatch, router]
  );

  return handleSubtaskFormSubmit;
}
