export enum CardType {
  "Task" = "Task",
  "Project" = "Project",
  "Habit" = "Habit",
}

export type Card = {
  type: CardType;
  amount: number;
};
