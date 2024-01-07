"use client";

import { Comments } from "@/features/Comments";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TodoTitle } from "@/features/TodoTitle";
import { Description } from "@/features/Description";
import { TodoHeader } from "@/widgets/TodoHeader/ui/TodoHeader";
import { TodoPoints } from "@/features/TodoPoints";

async function getData(id: string) {
  const res = await fetch(`/api/habits/${id}`);
  const data = await res.json();

  return data;
}

interface TaskPropType {
  id: string;
}

export default function Habit({ id }: TaskPropType) {
  const { data } = useQuery({
    queryKey: ["habit", id],
    queryFn: () => getData(id),
  });

  const { title, style, comments, streak, points } = data;

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <TodoHeader style={style} progress={streak} todoType="habit" />

      <section className="flex flex-col grow">
        <div className="mt-8">
          <TodoTitle initialTitle={title} todoType={"habit"} />
        </div>

        <div className="flex flex-wrap items-end gap-6 mt-6">
          <TodoPoints initialPoints={points} todoType="habit" />
        </div>

        <Description itemType="habit" initialValue="description" />

        <div className="mt-auto">
          <Comments comments={comments} itemType="habit" />
        </div>
      </section>
    </Layout>
  );
}
