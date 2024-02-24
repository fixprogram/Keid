"use client";

import { Day } from "@/features/Activity/lib";
import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

type StatsType = {
  days: Day[];
  totalPoints: number;
};

interface StatisticsPropsType {
  stats: StatsType;
}

export const Statistics: FC<StatisticsPropsType> = ({ stats }) => {
  const columns = distributeHeightAmongColumns(
    stats.days.map((item) => ({
      title: item.title,
      maxHeight: 0,
      entities: [
        {
          name: "Task",
          items: item.plannedTasks.length,
          completedItems: item.completedTasks.length,
          height: 0,
          plannedItems: item.plannedTasks,
        },
        {
          name: "Habit",
          items: item.plannedHabits.length,
          completedItems: item.completedHabits.length,
          height: 0,
          plannedItems: item.plannedHabits,
        },
      ],
    }))
  );

  return (
    <>
      <Header />

      <section className="mt-8">
        <div className="flex justify-between items-end min-h-[300px]">
          {columns.map((column, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[40px] gap-3"
            >
              {column.entities.map((entity, index) => {
                const bgColor = entity.name === "Task" ? "#A06AF9" : "#EFD88F";
                const progress = entity.completedItems / entity.items;

                return (
                  <div key={`${entity.name}-${index}`} className="w-full">
                    {entity.items ? (
                      <Link
                        className="flex justify-center items-end w-full"
                        style={{
                          backgroundColor: "#262A34",
                          borderRadius: 8,
                          minHeight: 40,
                          height: entity.height,
                          fontSize: "12px",
                        }}
                        href={`/statistics?entity=${
                          entity.name
                        }&ids=${encodeURIComponent(
                          JSON.stringify(entity.plannedItems)
                        )}`}
                      >
                        {progress > 0 ? (
                          <div
                            className="w-full flex justify-center items-center"
                            style={{
                              backgroundColor: bgColor,
                              height: Math.max(entity.height * progress, 40),
                              borderRadius: 8,
                            }}
                          >
                            {entity.completedItems}/{entity.items}
                          </div>
                        ) : (
                          <div
                            className="flex justify-center items-center"
                            style={{
                              height: entity.height,
                              color: "#5E6272",
                            }}
                          >
                            {entity.completedItems}/{entity.items}
                          </div>
                        )}
                      </Link>
                    ) : null}
                  </div>
                );
              })}

              <span className="mt-4" style={{ color: "#5E6272" }}>
                {column.title}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

function Header() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <button type="button" onClick={() => router.back()}>
        <Icon name="back" height={27} width={27} />
      </button>
      <h2 className="font-bold text-xl text-white font-poppins">Statistics</h2>
      <div style={{ width: 27, height: 27 }} />
    </div>
  );
}

interface Entity {
  name: string;
  items: number;
  completedItems: number;
  height: number;
  plannedItems: string[];
}

interface Column {
  title: string;
  entities: Entity[];
  maxHeight: number;
}

function calculateEntityHeight(entity: Entity): number {
  // Calculate the height of the entity, ensuring a minimum of 40 pixels
  return entity.items > 0 ? Math.max(entity.items * 30, 40) : 0;
}

function calculateColumnHeight(column: Column): number {
  // Calculate the total height of the column based on the entities it contains
  return column.entities.reduce(
    (totalHeight, entity) => totalHeight + calculateEntityHeight(entity),
    0
  );
}

function distributeHeightAmongColumns(columns: Column[]): Column[] {
  // Calculate the total height available for all columns
  const maxBlockHeight = 240;

  // Distribute available height among columns, ensuring each column does not exceed 240 pixels
  const totalColumnHeight = columns.reduce(
    (total, column) => total + calculateColumnHeight(column),
    0
  );
  const scale = Math.min(1, (maxBlockHeight * 7) / totalColumnHeight);

  columns.forEach((column) => {
    const columnHeight = calculateColumnHeight(column) * scale;

    // Distribute the height among entities in the column
    let remainingHeight = columnHeight;
    column.entities.forEach((entity) => {
      const height = calculateEntityHeight(entity) * scale;
      entity.height = height;
      remainingHeight -= height;
    });

    // Assign the remaining height to the last entity in the column if any
    if (column.entities.length > 0) {
      column.entities[column.entities.length - 1].height += remainingHeight;
    }
  });

  return columns;
}
