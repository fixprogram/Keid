import { links } from "@/shared/config/links";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useCallback } from "react";
import { shallow } from "zustand/shallow";
import { useNavigationStore } from "./useNavigationStore";
import { usePopupStore } from "./usePopupStore";
import { useDashboardStore } from "@/templates/DashboardPage";

type MutationChallengeType = {
  userId: string;
  title: string;
  style: string;
  deadline: string;
  members: string[];
  points: number;
};

export function useChallengeFormSubmit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const dateType = useDashboardStore((state) => state.dateType);

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
      members: state.members,
      points: state.points,
    }),
    shallow
  );

  const resetTask = usePopupStore((state) => state.reset);
  // TODO: Дефолтный дедлайн не вызывает функцию подсчета повторений. Поэтому устанавливаем ее повторно. Пока костыль.
  const setDeadline = usePopupStore((state) => state.setDeadline);

  setDeadline(data.deadline);
  //////////

  const mutation = useMutation({
    mutationKey: ["challenges"],
    mutationFn: (newChallenge: MutationChallengeType) =>
      axios.post(links.challenge.add, newChallenge),
    onSuccess: (data) => {
      resetTask();
      closePopupAdd();

      queryClient.invalidateQueries(["dashboard", "overview", dateType]);
      queryClient.invalidateQueries(["dashboard", "productivity", dateType]);

      router.push(`/challenges/${data.data.id}`);
    },
  });

  const handleFormSubmit = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();

      mutation.mutate({
        userId,
        ...data,
        deadline: (data.deadline as Date).toJSON(),
      });
    },
    [userId, data, mutation]
  );

  return handleFormSubmit;
}
