import Card from "../Card";
import type { Card as CardType } from "../../config/types";
import { CARDS_CONFIG } from "../../config/config";

interface Props {
  cards: CardType[];
}

export default function Cards({ cards }: Props) {
  if (cards.length === 0) {
    return null;
  }

  return (
    <ul className="mt-8 flex flex-col gap-4">
      {cards.map((card) => (
        <li key={card.type}>
          <Card config={CARDS_CONFIG[card.type]} amount={card.amount} />
        </li>
      ))}
    </ul>
  );
}
