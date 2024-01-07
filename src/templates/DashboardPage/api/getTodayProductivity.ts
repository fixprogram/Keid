import { getTodayTasks } from "./getTodayTasks";
import { getTodayHabits } from "./getTodayHabits";
import { getTodayChallenges } from "./getTodayChallenges";

export const getTodayProductivity = async (userId: string) => {
  const tasks = await getTodayTasks(userId);
  const habits = await getTodayHabits(userId);
  const challenges = await getTodayChallenges(userId);

  return { tasks, habits, challenges };
};
