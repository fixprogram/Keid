import { links } from "@/shared/config/links";
import { useDashboardStore } from "@/templates/DashboardPage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

export const useArchiveHabit = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dateType = useDashboardStore((state) => state.dateType);
  const queryClient = useQueryClient();

  const id = pathname?.split("/").at(-1);

  const mutation = useMutation({
    mutationKey: [`habit`, id],
    mutationFn: () => axios.post(links.habit.archive, { itemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries([`habits`]);
      queryClient.invalidateQueries([`habit`, id]);

      queryClient.invalidateQueries(["dashboard", "overview", dateType]);

      router.back();
    },
  });

  const handleArchiveHabit = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  return handleArchiveHabit;
};
