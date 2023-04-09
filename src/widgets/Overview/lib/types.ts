export type CardType = "Task" | "Project" | "Habit";

export type Card = {
  type: CardType;
  amount: number;
};
