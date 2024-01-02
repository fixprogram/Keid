import { links } from "@/shared/config/links";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useNavigationStore } from "../model/useNavigationStore";
import { usePopupStore } from "../model/usePopupStore";

type MutationChallengeType = {
  userId: string;
  title: string;
  style: string;
  deadline: number;
};

export function useChallengeFormSubmit() {
  const router = useRouter();

  const [userId, closePopupAdd] = useNavigationStore(
    (state) => [state.userId, state.closePopupAdd],
    shallow
  );

  const data = usePopupStore(
    (state) => ({
      title: state.title,
      style: state.style,
      deadline: state.deadline,
      repeats: state.repeats,
    }),
    shallow
  );

  console.log("data: ", data);

  const resetTask = usePopupStore((state) => state.reset);

  const mutation = useMutation({
    mutationKey: ["challenges"],
    mutationFn: (newChallenge: MutationChallengeType) =>
      axios.post(links.challenge.add, newChallenge),
    onSuccess: (data) => {
      resetTask();
      closePopupAdd();

      router.push(`/challenges/${data.data.id}`);
    },
  });

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      mutation.mutate({
        userId,
        ...data,
      });
    },
    [userId, data, mutation]
  );

  return handleFormSubmit;
}
