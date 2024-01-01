import { TaskCard } from "@/entities/task/ui/TaskCard";
import { TaskType } from "@/shared/config/types";
import { useState } from "react";
import Icon from "../../shared/ui/Icon";

interface Props {
  topic: string;
  items: TaskType[];
}

export default function Accordion({ topic, items = [] }: Props) {
  const [isOpened, setOpened] = useState(true);

  // console.log("items: ", items);

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="flex gap-3"
          onClick={() => setOpened(!isOpened)}
        >
          <Icon name="arrow-down" width={16} height={16} />

          <span className="text-xxs text-deactive font-bold tracking-wide">
            {topic.toUpperCase()} ({items.length})
          </span>
        </button>

        <button type="button">
          <Icon name="plus" width={10} height={10} color="#5E6272" />
        </button>
      </div>

      {items.length > 0 && isOpened ? (
        <ul className="mt-6 flex flex-col gap-4">
          {items.map((item) => (
            <li key={item.id}>
              <TaskCard {...item} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
