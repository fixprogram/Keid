import Link from "next/link";
import { useState } from "react";
import Icon from "../Icon";

interface Props {
  topic: string;
  items: [];
}

export default function Accordion({ topic, items = [] }: Props) {
  const [isOpened, setOpened] = useState(true);

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
              <Link href={"#"}>
                <div className="bg-background2 p-5 flex gap-5 rounded-xl ">
                  <div className="w-[40px] h-[40px] rounded-full bg-background1"></div>

                  <div>
                    <b className="text-lg text-white font-semibold">
                      {item.title}
                    </b>
                    <p className="text-smm font-medium">{item.deadline}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
