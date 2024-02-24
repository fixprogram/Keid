"use client";

import { HabitCard } from "@/entities/habit";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { TasksBlock } from "@/shared/components/TasksBlock";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect, useState } from "react";

export function Details() {
  const searchParams = useSearchParams();

  const entity = searchParams.get("entity");
  const ids = searchParams.get("ids");

  const [data, setData] = useState([]);

  useLayoutEffect(() => {
    (async () => {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_NEXTAUTH_URL
        }/api/statistics?entity=${entity}&ids=${encodeURIComponent(
          JSON.stringify(ids)
        )}`
      );

      const { data } = await res.json();

      setData(data);
    })();
  }, [entity, ids]);

  if (!data?.length) {
    return null;
  }

  return (
    <section className="mt-8">
      {entity === "Task" ? <TasksBlock tasks={data} /> : null}
      {entity === "Habit" ? (
        <>
          <h2 className="font-poppins font-bold text-xl text-white mt-5">
            Habits
          </h2>

          <div className="flex align-center mt-5 gap-4 flex-wrap">
            {data.map((item: any) => {
              return <HabitCard key={item.id} {...item} />;
            })}
          </div>
        </>
      ) : null}
    </section>
  );
}
